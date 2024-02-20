import { buffer } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-03-02',
});

// Retrieve the webhook secret from the environment variable
const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Configure the API to disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize CORS middleware
const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

// Define the webhook handler
const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      // Construct the event using the raw body and signature
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Log the success and event ID
    console.log('👍 Success:', event.id);

    // Handle the different event types
    if (event.type === 'payment_intent.succeeded') {
      handlePaymentIntentSucceeded(event);
    } else if (event.type === 'payment_intent.payment_failed') {
      handlePaymentIntentFailed(event);
    } else if (event.type === 'charge.succeeded') {
      handleChargeSucceeded(event);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Send a response to acknowledge receipt of the event
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

// Define helper functions to handle the different event types
const handlePaymentIntentSucceeded = (event: Stripe.Event) => {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
};

const handlePaymentIntentFailed = (event: Stripe.Event) => {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  console.log(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`);
};

const handleChargeSucceeded = (event: Stripe.Event) => {
  const charge = event.data.object as Stripe.Charge;
  console.log(`💳 Charge id: ${charge.id}`);
};

// Export the webhook handler with CORS enabled
export default cors(webhookHandler as any);

