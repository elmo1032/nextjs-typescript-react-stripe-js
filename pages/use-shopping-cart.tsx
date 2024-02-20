// Import necessary modules and components
import { NextPage } from 'next';
import Layout from '../components/Layout'; // Import the Layout component

// Import custom components
import Cart from '../components/Cart'; // Import the Cart component
import CartSummary from '../components/CartSummary'; // Import the CartSummary component
import Products from '../components/Products'; // Import the Products component

// Define the DonatePage component
const DonatePage: NextPage = () => {
  // Return the JSX that will be rendered to the page
  return (
    <Layout // Use the Layout component to wrap the page content
      title="Shopping Cart | Next.js + TypeScript Example"
    >
      <div className="page-container"> {/* Add a container to hold the page content */}
        <h1>Shopping Cart</h1> {/* Display a heading for the shopping cart */}
        <p>
          Powered by the{' '}
          <a href="https://use-shopping-cart.netlify.app/">use-shopping-cart</a>{' '}
          React hooks library.
        </p> {/* Provide a link to the library that powers the shopping cart */}
        <Cart> {/* Use the Cart component */}
          <CartSummary /> {/* Display the cart summary */}
          <Products /> {/* Display the list of products */}
        </Cart>
      </div>
    </Layout>
  );
};

// Export the DonatePage component for use in other modules
export default DonatePage;
