// Import required libraries and components
import React, { useState } from 'react';
import CustomDonationInput from '../components/CustomDonationInput';
import StripeTestCards from '../components/StripeTestCards';
import PrintObject from '../components/PrintObject';
import { fetchPostJSON } from '../utils/api-helpers';
import { formatAmountForDisplay } from '../utils/stripe-helpers';
import * as config from '../config';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Define card options for Stripe CardElement
const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      iconColor: '#6772e5',
      color: '#6772e5',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#6772e5',
      },
    },
    invalid: {
      iconColor: '#ef2961',
      color: '#ef2961',
    },
  },
};

// Define the main ElementsForm component
const ElementsForm = () => {
  // Initialize state variables
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
    cardholderName: '',
  });
  const [payment, setPayment] = useState({ status: 'initial' });
  const [errorMessage, setErrorMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  // Define the PaymentStatus component
  const PaymentStatus = ({ status }: { status: string }) => {
    // Handle different payment statuses
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return <h2>Processing...</h2>;

      case 'requires_action':
        return <h2>Authenticating...</h2>;

      case 'succeeded':
        return <h2>Payment Succeeded ð¥³</h2>;

      case 'error':
        return (
          <>
            <h2>Error ð­</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        );

      default:
        return null;
    }
  };

  // Handle input change events
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Abort if form isn't valid
    if (!e.currentTarget.reportValidity()) return;
    setPayment({ status: 'processing' });

    // Create a PaymentIntent with the specified amount
    const response = await fetchPostJSON('/api/payment_intents', {
      amount: input.customDonation,
    });
    setPayment(response);

    if (response.statusCode === 500) {
      setPayment({ status: 'error' });
      setErrorMessage(response.message);
      return;
    }

    // Get a reference to the mounted CardElement
    const cardElement = elements!.getElement(CardElement);

    // Use the card element with other Stripe.js APIs
    const { error, paymentIntent } = await stripe!.confirmCardPayment(
      response.client_secret,
      {
        payment_method: {
          card: cardElement!,
          billing_details: { name: input.cardholderName },
        },
      }
    );

    if (error) {
      setPayment({ status: 'error' });
      setErrorMessage(error.message ?? 'An unknown error occurred');
    } else if (paymentIntent) {
      setPayment(paymentIntent);
    }
  };

  // Render the component
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CustomDonationInput
          className="elements-style"
          name="customDonation"
          value={input.customDonation}
          min={config.MIN_AMOUNT}
          max={config.MAX_AMOUNT}
          step={config.AMOUNT_STEP}
          currency={config.CURRENCY}
          onChange={handleInputChange}
        />
        <StripeTestCards />
        <fieldset className="elements-style">
          <legend>Your payment details:</legend>
          <input
            placeholder="Cardholder name"
            className="elements-style"
            type="Text"
            name="cardholderName"
            onChange={handleInputChange}
            required
          />
          <div className="FormRow elements-style">
            <CardElement
              options={CARD_OPTIONS}
              onChange={(e) => {
                if (e.error) {
                  setPayment({ status: 'error' });
                  setErrorMessage(
                    e.error.message ?? 'An unknown error occurred'
                  );
                }
              }}
            />
          </div>
        </fieldset>
        <button
          className="elements-style-background"
          type="submit"
          disabled={
            !['initial', 'succeeded', 'error'].includes(payment.status) ||
            !stripe
          }
        >
          Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
        </button>
      </form>
      <PaymentStatus status={payment.status} />
      <PrintObject content={payment} />
    
