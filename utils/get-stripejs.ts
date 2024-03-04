import { Stripe, loadStripe } from '@stripe/stripe-js';

// Declare a variable to hold the Stripe instance promise
let stripePromise: Promise<Stripe | null>;

/**
 * This function returns a promise that resolves to a Stripe instance.
 * It uses a singleton pattern to ensure that only one instance of Stripe is created.
 * If the Stripe instance promise has not been initialized, it will be created with the
 * publishable key from the environment variable NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
 */
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe;


import { Stripe, loadStripe } from '@stripe/stripe-js';

// Declare a variable to hold the Stripe instance promise
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
