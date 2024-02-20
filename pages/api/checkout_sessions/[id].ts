// Import necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize the Stripe object with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Set the API version
  apiVersion: '2020-03-02',
});

// Export the default handler function for the API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the ID from the query string
  const id: string = req.query.id as string;

  try {
    // Validate the Checkout Session ID
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect Checkout Session ID.');
    }

    // Retrieve the Checkout Session object from Stripe
    const checkout_session: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(
      id,
      {
        // Expand the payment intent property
        expand: ['payment_intent'],
      }
    );

    // Return the Checkout Session object as a JSON response
    res.status(200).json(checkout_session);
  } catch (err) {
    // Return an error response with a 500 status code and message
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
