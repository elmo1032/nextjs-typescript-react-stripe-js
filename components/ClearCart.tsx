import { useEffect } from 'react'; // Importing the useEffect hook from React
import { useShoppingCart } from 'use-shopping-cart'; // Importing the useShoppingCart hook from the use-shopping-cart package

// Defining the ClearCart component
export default function ClearCart() {
  const { clearCart } = useShoppingCart(); // Getting the clearCart function from the useShoppingCart hook

  // Using the useEffect hook to clear the cart when the component mounts
  useEffect(() => {
    clearCart(); // Calling the clearCart function
  }, [clearCart]); // Adding clearCart as a dependency for the useEffect hook

  // Returning a paragraph element indicating that the cart has been cleared
  return <p>Cart cleared.</p>;
}

