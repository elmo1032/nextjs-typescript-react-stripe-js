import React from 'react';

// Importing products from a local JSON file
import products from '../data/products.json';

// Importing custom hooks from the 'use-shopping-cart' package
import { useShop, pingCart, formatCurrencyString } from 'use-shopping-cart';

// The 'Products' component displays a list of products with add/remove buttons
const Products = () => {
  // Using the 'useShoppingCart' hook to access the 'addItem' and 'removeItem' functions
  const { addItem, removeItem } = useShoppingCart();

  // The returned JSX displays a list of products using the 'map' method
  return (
    <section className="products">
      {products.map((product) => (
        <div key={product.sku} className="product">
          {/* Displaying the product image */}
          <img src={product.image} alt={product.name} />
          {/* Displaying the product name */}
          <h2>{product.name}</h2>
          {/* Displaying the product price in the correct currency format */}
          <p className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </p>
          {/* Adding the product to the cart when the 'Add to cart' button is clicked */}
          <button
            className="cart-style-background"
            onClick={() => addItem(product)}
          >
            Add to cart
          </button>
          {/* Removing the product from the cart when the 'Remove' button is clicked */}
          <button
            className="cart-style-background"
            onClick={() => removeItem(product.sku)}
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
};

// Exporting the 'Products' component for use in other parts of the application
export default Products;
