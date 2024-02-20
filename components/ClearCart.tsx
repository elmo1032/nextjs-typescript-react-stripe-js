// Import the `useEffect` hook from the 'react' library
import { useEffect } from 'react';

// Import the `useShoppingCart` hook from the 'use-shopping-cart' library,
// and destructure the `clearCart` function from it
import { u, seShoppingCart } from 'use-shopping-cart';
const { clearCart } = seShoppingCart();

// Define the `ClearCart` functional component
export default function ClearCart() {
  // Destructure the `clearCart` function from the `useShoppingCart` hook
  const { clearCart } = useShoppingCart();

  // Use the `useEffect` hook to call the `clearCart` function when the component mounts
  useEffect(() => clearCart(), [clearCart]);

  // Return a paragraph element with the text "Cart cleared."
  return <p>Cart cleared.</p>;
}
