import stripe from '../../lib/stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customer_id, payment_method_id } = req.body;

  try {
    // Create a subscription with a 7-day trial
    const subscription = await stripe.subscriptions.create({
      customer: customer_id,
      items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Vibe Coding Basics - Monthly',
              description: 'Full access to Vibe Coding Basics curriculum',
            },
            unit_amount: 4900, // $49.00
            recurring: {
              interval: 'month',
            },
          },
        },
      ],
      trial_period_days: 7,
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    res.status(200).json({
      subscription,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: error.message });
  }
}