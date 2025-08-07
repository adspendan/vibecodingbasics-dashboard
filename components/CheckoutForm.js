import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

export default function CheckoutForm({ email }) {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    // Create a payment method and confirm the setup intent
    const cardElement = elements.getElement(CardElement);
    
    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    try {
      // Create or get customer in Stripe
      const customerResponse = await fetch('/api/create-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          email,
          payment_method_id: paymentMethod.id,
        }),
      });

      const customerData = await customerResponse.json();

      if (customerData.error) {
        setError(customerData.error);
        setProcessing(false);
        return;
      }

      // Create subscription with 7-day trial
      const subscriptionResponse = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerData.customer.id,
          payment_method_id: paymentMethod.id,
        }),
      });

      const subscriptionData = await subscriptionResponse.json();

      if (subscriptionData.error) {
        setError(subscriptionData.error);
        setProcessing(false);
        return;
      }

      // Update user record in Supabase with subscription info
      const { error: supabaseError } = await supabase
        .from('user_subscriptions')
        .insert([
          {
            user_id: customerData.user_id,
            stripe_customer_id: customerData.customer.id,
            stripe_subscription_id: subscriptionData.subscription.id,
            status: 'trialing',
            trial_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          }
        ]);

      if (supabaseError) {
        setError('Error updating your account. Please contact support.');
        setProcessing(false);
        return;
      }

      setSucceeded(true);
      setProcessing(false);
      
      // Redirect to dashboard after successful signup
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
      
    } catch (err) {
      setError('An unexpected error occurred.');
      setProcessing(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="card-element">Card Details</label>
        <div className="p-3 border border-gray-300 rounded-md">
          <CardElement id="card-element" options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }} />
        </div>
      </div>

      <button
        disabled={processing || succeeded}
        id="submit"
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {processing ? 'Processing...' : 'Start Free Trial'}
      </button>

      {error && <div className="mt-4 text-red-500">{error}</div>}
      
      {succeeded && (
        <div className="mt-4 text-green-500">
          Payment successful! Redirecting to your dashboard...
        </div>
      )}
      
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>You won't be charged for 7 days. Cancel anytime before then.</p>
        <p className="mt-2">After your trial, $49/month will be charged automatically.</p>
      </div>
    </form>
  );
}