import Stripe from 'stripe';

// Check if Stripe secret key is available
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('Stripe secret key is missing. Please check your environment variables.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default stripe;