// Import necessary modules and components
import { NextPage } from 'next';
import { Elements } from '@stripe/react-stripe-js';

// Import utility function for getting Stripe instance
import getStripe from '../utils/get-stripejs';

// Import custom Layout component
import Layout from '../components/Layout';

// Import custom ElementsForm component
import ElementsForm from '../components/ElementsForm';

// Define the DonatePage component as a NextPage
const DonatePage: NextPage = () => {
  // Declare a variable for the Stripe promise, initialized by the getStripe utility function
  const stripePromise = getStripe();

  // Conditional rendering: if stripePromise is not available, render an error message; otherwise, render the page
  if (!stripePromise) {
    return <div>Error loading Stripe</div>;
  }

  // Return the JSX for the DonatePage component
  return (
    <Layout title="Donate with Elements | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Donate with Elements</h1>
        <p>Donate to our project ð</p>
        {/* Wrap the ElementsForm component with the Elements component, passing the Stripe instance as a prop */}
        <Elements stripe={getStripe()}>
          <ElementsForm />
        </Elements>
      </div>
    </Layout>
  );
};

// Export the DonatePage component as the default export
export default DonatePage;
