import { NextApiRequest, NextApiResponse } from 'next';

// Importing the necessary constants and helper functions
import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config';
import { formatAmountForStripe } from '../../../utils/stripe-helpers';

// Importing the Stripe library and initializing it with the secret key
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Configuring the Stripe library with the specified API version
  apiVersion: '2020-03-02',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only processing POST requests
  if (req.method === 'POST') {
    const { amount } = req.body; // Extracting the amount from the request body

    try {
      // Validating the amount
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount.');
      }

      // Creating the PaymentIntent parameters object
      const params: Stripe.PaymentIntentCreateParams = {
        payment_method_types: ['card'],
        amount: formatAmountForStripe(amount, CURRENCY),
        currency: CURRENCY,
      };

      // Creating the PaymentIntent with the Stripe library
      const payment_intent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
        params
      );

      // Returning the PaymentIntent as a JSON response
      res.status(200).json(payment_intent);
    } catch (err) {
      // Returning an error response in case of any errors
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    // Returning a 405 Method Not Allowed error for any requests other than POST
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
