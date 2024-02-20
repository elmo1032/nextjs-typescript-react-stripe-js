import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe;


import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripeInstancePromise: Promise<Stripe | null>;

/**
 * This function returns a promise that resolves to a single instance of Stripe.
 * This is a singleton pattern to ensure that only one instance of Stripe is created.
 */
const getStripeInstance = () => {
  if (!stripeInstancePromise) {
    stripeInstancePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripeInstancePromise;
};

export default getStripeInstance;
