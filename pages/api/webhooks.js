import { supabaseServer } from '../../lib/supabase';
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
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'customer.subscription.updated':
        const subscriptionUpdated = event.data.object;
        await updateSubscription(subscriptionUpdated);
        break;
      case 'customer.subscription.deleted':
        const subscriptionDeleted = event.data.object;
        await updateSubscription(subscriptionDeleted);
        break;
      case 'invoice.payment_succeeded':
        const invoicePaymentSucceeded = event.data.object;
        if (invoicePaymentSucceeded.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoicePaymentSucceeded.subscription);
          await updateSubscription(subscription);
        }
        break;
      case 'invoice.payment_failed':
        const invoicePaymentFailed = event.data.object;
        if (invoicePaymentFailed.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoicePaymentFailed.subscription);
          await updateSubscription(subscription);
        }
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
}

async function updateSubscription(subscription) {
  try {
    const { error } = await supabaseServer
      .from('user_subscriptions')
      .update({
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000),
        trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
        updated_at: new Date(),
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      console.error('Error updating subscription:', error);
    }
  } catch (error) {
    console.error('Error in updateSubscription:', error);
  }
}