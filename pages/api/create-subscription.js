import { supabaseServer } from '../../lib/supabase';
import stripe from '../../lib/stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the user from the session
    const { user } = await supabaseServer.auth.getUser();
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get or create Stripe customer
    let customer;
    const { data: subscriptionData } = await supabaseServer
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    if (subscriptionData?.stripe_customer_id) {
      // Existing customer
      customer = await stripe.customers.retrieve(subscriptionData.stripe_customer_id);
    } else {
      // New customer
      customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });
    }

    // Create the subscription with a 7-day trial
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: process.env.STRIPE_PRICE_ID, // You need to set this environment variable
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      trial_period_days: 7,
      expand: ['latest_invoice.payment_intent'],
    });

    // Save subscription to Supabase
    const { error } = await supabaseServer
      .from('user_subscriptions')
      .upsert({
        id: subscription.id,
        user_id: user.id,
        stripe_customer_id: customer.id,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        trial_end: new Date(subscription.trial_end * 1000),
        current_period_end: new Date(subscription.current_period_end * 1000),
      });

    if (error) {
      console.error('Error saving subscription to Supabase:', error);
    }

    // Return the client secret for payment
    res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: error.message });
  }
}