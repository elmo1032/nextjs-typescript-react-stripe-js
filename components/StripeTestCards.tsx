import React from "react";

const testCardsLink = "https://stripe.com/docs/testing#cards";
const cardNumber = "4242 4242 4242 4242";

const StripeTestCards = () => {
  return (
    <div className="test-card-notice">
      Use any of the{" "}
      <a href={testCardsLink} target="_blank" rel="noopener noreferrer">
        Stripe test cards
      </a>{" "}
      for this demo, e.g.{" "}
      <div className="card-number">{cardNumber}</div>.
    </div>
  );
};

export default StripeTestCards;
