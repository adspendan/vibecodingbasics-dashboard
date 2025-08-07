import { supabase } from '../../lib/supabase';
import stripe from '../../lib/stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.updated':
      const subscription = event.data.object;
      
      // Update the subscription status in Supabase
      await supabase
        .from('user_subscriptions')
        .update({
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
        })
        .eq('stripe_subscription_id', subscription.id);
      
      break;
      
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      
      // Update the subscription status in Supabase
      await supabase
        .from('user_subscriptions')
        .update({
          status: 'canceled',
        })
        .eq('stripe_subscription_id', deletedSubscription.id);
      
      break;
      
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      
      // If this is the first invoice after trial, update status
      if (invoice.subscription) {
        await supabase
          .from('user_subscriptions')
          .update({
            status: 'active',
          })
          .eq('stripe_subscription_id', invoice.subscription);
      }
      
      break;
      
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      
      // Update the subscription status in Supabase
      if (failedInvoice.subscription) {
        await supabase
          .from('user_subscriptions')
          .update({
            status: 'past_due',
          })
          .eq('stripe_subscription_id', failedInvoice.subscription);
      }
      
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}