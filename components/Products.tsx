import React from 'react';
import products from '../data/products.json';
import { useShop, addItem, removeItem, formatCurrencyString } from 'use-shopping-cart';

const Products = () => {
  const { addItem: addToCart, removeItem: removeFromCart } = useShop();

  return (
    <section className="products">
      {products.map((product) => (
        <div key={product.sku} className="product">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </p>
          <button
            className="cart-style-background"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
          <button
            className="cart-style-background"
            onClick={() => removeFromCart(product.sku)}
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
};

export default Products;
