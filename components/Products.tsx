import React from 'react';
import products from '../data/products.json'; // Import the products data
import { useShop, addItem, removeItem, formatCurrencyString } from 'use-shopping-cart'; // Import the useShop hook and other necessary functions from the shopping cart library

const Products = () => {
  // Extract the addItem and removeItem functions from the useShop hook
  const { addItem: addToCart, removeItem: removeFromCart } = useShop();

  return (
    <section className="products">
      {products.map((product) => ( // Iterate through each product in the products data
        <div key={product.sku} className="product">
          <img src={product.image} alt={product.name} /> {/* Display the product's image */}
          <h2>{product.name}</h2> {/* Display the product's name */}
          <p className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </p> {/* Display the product's price in the correct currency format */}
          <button
            className="cart-style-background"
            onClick={() => addToCart(product)} // Add the product to the cart when the button is clicked
          >
            Add to cart
          </button>
          <button
            className="cart-style-background"
            onClick={() => removeFromCart(product.sku)} // Remove the product from the cart when the button is clicked
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
};

export default Products;
