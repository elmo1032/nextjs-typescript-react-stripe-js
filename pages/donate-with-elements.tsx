import { NextPage } from 'next';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../utils/get-stripejs';
import Layout from '../components/Layout';
import ElementsForm from '../components/ElementsForm';

const DonatePage: NextPage = () => {
  return (
    <Layout title="Donate with Elements | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Donate with Elements</h1>
        <p>Donate to our project ð</p>
        <Elements stripe={getStripe()}>
          <ElementsForm />
        </Elements>
      </div>
    </Layout>
  );
};

export default DonatePage;


import { NextPage } from 'next';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../utils/get-stripejs';
import Layout from '../components/Layout';
import ElementsForm from '../components/ElementsForm';

const DonatePage: NextPage = () => {
  const stripePromise = getStripe();
  if (!stripePromise) {
    return <div>Error loading Stripe</div>;
  }
  return (
    <Layout title="Donate with Elements | Next
