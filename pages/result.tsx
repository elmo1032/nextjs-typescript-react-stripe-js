import { NextPage } from 'next';
import { use, Router } from 'next/router';

// Import custom components
import Layout from '../components/Layout';
import PrintObject from '../components/PrintObject';
import Cart from '../components/Cart';
import ClearCart from '../components/ClearCart';

// Import utility functions
import { fetchGetJSON } from '../utils/api-helpers';
import useSWR from 'swr';

const ResultPage: NextPage = () => {
  const router = useRouter(); // Use the Router object from Next.js to access query parameters

  // Fetch CheckoutSession data from the API based on the session_id query parameter
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  // Display an error message if there was an error fetching the data
  if (error) return <div>failed to load</div>;

  return (
    <Layout
      title="Checkout Payment Result | Next.js + TypeScript Example" // Set the page title
    >
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? 'loading...'} /> {/* Display the CheckoutSession data */}
        <Cart>
          <ClearCart /> {/* Clear the cart */}
        </Cart>
      </div>
    </Layout>
  );
};

export default ResultPage;
