import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-03-02',
});

interface CheckoutSession extends Stripe.Checkout.Session {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckoutSession | ErrorResponse>
) {
  const id = req.query.id as string;

  try {
    if (!id.startsWith('cs_')) {
      throw new Error('Incorrect CheckoutSession ID.');
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(id, {
      expand: ['payment_intent'],
    });

    res.status(200).json(checkoutSession);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}

interface ErrorResponse {
  statusCode: number;
  message: string;
}
