import React, { useState } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Fetch the cart items from localStorage and initialize state
  const initialCartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const [cartItems, setCartItems] = useState(initialCartItems);
  

  // Function to remove an item from the cart
  const removeItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  // Calculate the total price of cards
  const totalPrice = cartItems.reduce((total, item) => total + item.productprice, 0);

  return (
    <div>
      <h1 className="Cart-head">Cart Collection</h1>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div>
          {Array(Math.ceil(cartItems.length / 3))
            .fill(null)
            .map((_, rowIndex) => (
              <div className="cart-row" key={rowIndex}>
                {cartItems.slice(rowIndex * 3, rowIndex * 3 + 3).map((item, index) => (
                  <div className="cart-item" key={index}>
                    <img src={item.image} alt={item.productname} className="cart-item-image" />
                    <div className="cart-item-details">
                      <p>{item.productname}</p>
                      <p>{item.id}</p>
                      <p>Price: {item.productprice}</p>
                      <p>Brand: {item.brand}</p>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeItem(index + rowIndex * 3)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
      <div className="total-count">Total Cards: {cartItems.length}</div>
      <div className="total-price">Total Price: {totalPrice}Rs</div>
      <button className="place-order">
        <Link to="/placeorder" state={{ cartItems, totalPrice }}>Continue</Link>
      </button>
    </div>
  );
};

export default Cart;





