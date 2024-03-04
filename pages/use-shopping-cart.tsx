import { NextPage } from 'next'; // Importing NextPage type from Next.js

// Importing custom components
import Layout from '../components/Layout';
import Cart from '../components/Cart';
import CartSummary from '../components/CartSummary';
import Products from '../components/Products';

const DonatePage: NextPage = () => {
  // Defining the functional component for the DonatePage
  return (
    <Layout title="Shopping Cart | Next.js + TypeScript Example">
      {/* Rendering the Layout component with a given title */}
      <div className="page-container">
        {/* Adding a class to the container div for styling purposes */}
        <h1>Shopping Cart</h1> {/* Setting the main heading of the page */}
        <p>
          Powered by the{' '}
          <a href="https://use-shopping-cart.netlify.app/">
            use-shopping-cart
          </a>{' '}
          React hooks library. {/* Providing information about the cart functionality */}
        </p>
        <Cart>
          {/* Rendering the Cart component */}
          <CartSummary /> {/* Rendering the CartSummary component within the Cart component */}
          <Products /> {/* Rendering the Products component within the Cart component */}
        </Cart>
      </div>
    </Layout>
  );
};

// Exporting the DonatePage component as the default export
export default DonatePage;
