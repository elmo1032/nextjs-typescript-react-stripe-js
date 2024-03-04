// Import necessary modules and types from 'react' and 'use-shopping-cart'
import React, { ReactNode } from 'react';
import { CartProvider } from 'use-shopping-cart';

// Import getStripe utility function for working with Stripe payments
import getStripe from '../utils/get-stripe';

// Import configuration object for setting up the application's currency
import * as config from '../config';

const Cart = ({ children }: { children: ReactNode }) => (
  <CartProvider // Create a CartProvider to manage the shopping cart state
    mode="checkout-session" // Set the mode to 'checkout-session'
    stripe={getStripe()} // Inject the Stripe instance created by the 'getStripe' utility function
    currency={config.CURRENCY} // Set the currency based on the configuration object
  >
    <>{children}</> {/* Render the children passed to the Cart component */}
  </CartProvider>
);

// Export the Cart component for use in other parts of the application
export default Cart;
