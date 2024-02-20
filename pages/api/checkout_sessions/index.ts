import { NextApiRequest, NextApiResponse } from 'next';
import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config';
import { formatAmountForStripe } from '../../../utils/stripe-helpers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
});

interface CheckoutSessionParams extends Stripe.Checkout.SessionCreateParams {
  amount: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const amount: number = req.body.amount;

    try {
      validateAmount(amount);

      const params: CheckoutSessionParams = {
        amount: formatAmountForStripe(amount, CURRENCY),
        currency: CURRENCY,
        submit_type: 'donate',
        payment_method_types: ['card'],
        line_items: [
          {
            name: 'Custom amount donation',
            amount: formatAmountForStripe(amount, CURRENCY),
            currency: CURRENCY,
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/donate-with-checkout`,
      };

      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

function validateAmount(amount: number) {
  if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
    throw new Error('Invalid amount.');
  }
}
