import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe'; // Importing the Stripe library

// Creating a new Stripe instance with the secret key and API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-03-02',
});

// Defining the CheckoutSession interface to extend Stripe's Checkout.Session
interface CheckoutSession extends Stripe.Checkout.Session {}

// The main API handler function
export default async function handler(
  req: NextApiRequest, // NextApiRequest object representing the incoming request
  res: NextApiResponse<CheckoutSession | ErrorResponse> // NextApiResponse object to send the response
) {
  const id = req.query.id as string; // Extracting the ID from the request query

  try {
    // Validating the ID format
    if (!id.startsWith('cs_')) {
      throw new Error('Incorrect CheckoutSession ID.');
    }

    // Retrieving the CheckoutSession with the provided ID and expanding the payment intent
    const checkoutSession = await stripe.checkout.sessions.retrieve(id, {
      expand: ['payment_intent'],
    });

    // Sending the CheckoutSession as a JSON response
    res.status(200).json(checkoutSession);
  } catch (error) {
    // Sending an error response in case of any exceptions
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}

// Defining the ErrorResponse interface
interface ErrorResponse {
  statusCode: number;
  message: string;
}

