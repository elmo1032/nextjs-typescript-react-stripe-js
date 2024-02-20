import { NextApiRequest, NextApiResponse } from 'next';
import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config';
import { formatAmountForStripe } from '../../../utils/stripe-helpers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
});

interface BodyParams {
  amount: number;
}

interface PaymentIntentCreateParams extends Stripe.PaymentIntentCreateParams {
  amount: number;
  currency: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { amount }: BodyParams = req.body;

    // Validate the amount that was passed from the client.
    if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
      throw new Error('Invalid amount.');
    }

    // Create PaymentIntent from body params.
    const params: PaymentIntentCreateParams = {
      payment_method_types: ['card'],
      amount: formatAmountForStripe(amount, CURRENCY),
      currency: CURRENCY,
    };

    const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
      params
    );

    res.status(200).json(paymentIntent);
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
