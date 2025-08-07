import { supabase } from '../../lib/supabase';
import stripe from '../../lib/stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, payment_method_id } = req.body;

  try {
    // Get the user from Supabase
    const { data: { user }, error: userError } = await supabase.auth.getUser(
      req.headers.authorization?.split(' ')[1]
    );

    if (userError || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Create a customer in Stripe
    const customer = await stripe.customers.create({
      email,
      payment_method: payment_method_id,
      invoice_settings: {
        default_payment_method: payment_method_id,
      },
    });

    // Return the customer and user_id
    res.status(200).json({
      customer,
      user_id: user.id,
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: error.message });
  }
}