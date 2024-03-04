import { NextPage } from 'next';
import Layout from '../components/Layout'; // Importing the layout component
import CheckoutForm from '../components/CheckoutForm'; // Importing the checkout form component

const DonatePage: NextPage = () => { // Defining the DonatePage functional component
  return (
    <Layout title="Donate with Checkout | Next.js + TypeScript Example"> // Using the Layout component with a given title
      <div className="page-container">
        <h1>Donate with Checkout</h1> {/* Page heading */}
        <p>Donate to our project, ð</p> {/* Description to encourage users to donate */}
        <CheckoutForm /> {/* Rendering the CheckoutForm component */}
      </div>
    </Layout>
  );
};

export default DonatePage; // Exporting the DonatePage component for use in other files

