 import { useState } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { supabase } from '../lib/supabase';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      
      setShowPayment(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-purple-800">Start Your 7-Day Free Trial</h1>
        
        {!showPayment ? (
          <form onSubmit={handleCreateAccount}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && <div className="mb-4 text-red-500">{error}</div>}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Start your 7-day free trial. Cancel anytime.</p>
              <p className="mt-2">After 7 days, you'll be charged $49/month.</p>
            </div>
          </form>
        ) : (
          <div>
            <p className="mb-6 text-gray-600">Account created! Please enter your payment details to start your free trial.</p>
            <Elements stripe={stripePromise}>
              <CheckoutForm email={email} />
            </Elements>
          </div>
        )}
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/login" className="text-purple-600 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
}
