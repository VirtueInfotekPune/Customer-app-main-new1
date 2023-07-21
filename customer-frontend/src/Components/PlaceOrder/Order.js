import React, { useEffect, useState } from 'react';
import './Order.css';
import axios from 'axios';
import { useLocation,Link } from 'react-router-dom';

const Order = () => {
  const location = useLocation();
  const totalPrice = location.state ? location.state.totalPrice : 0;

  const [orderDetails, setOrderDetails] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash on delivery');

  const isPlaceOrderDisabled = totalPrice === 0;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('API_URL');
        setOrderDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderDetails();
  }, []);

  // Function to handle the input change for delivery address
  const handleDeliveryAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  // Function to handle the selection of payment method
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  // Function to handle placing the order and saving to local storage
  const handlePlaceOrder = () => {
    // Save the order details to local storage and display in console
    const orderData = {
      totalPrice: totalPrice,
      deliveryAddress: deliveryAddress,
      paymentMethod: selectedPaymentMethod // Add the selected payment method to order data
      // Add other order data as needed
    };

    // Store the order data in local storage
    localStorage.setItem('order', JSON.stringify(orderData));

    // Display the order data in the console
    console.log('Order Data:', orderData);

    // Perform any other actions you want when placing the order
    // For example, you can redirect to a confirmation page or perform an API call to submit the order to the server.
  };

  return (
    <div className="order-main">
      <div className="order-head">
        <h1>Checkout</h1>
      </div>
      <div className="payment">
        <label className="green-text">Payment Mode:</label>
        <select onChange={handlePaymentMethodChange}>
          <option value="Cash on delivery">Cash on delivery</option>
          {/* Add other payment options if needed */}
        </select>
      </div>

      {/* Add the delivery address section */}
      <div className="delivery-address">
        <label className="green-text">Delivery Address:</label>
        <input type="text" value={deliveryAddress} onChange={handleDeliveryAddressChange} />
      </div>

      <div className="delivery">
        <span className="green-text">Deliver to:</span>
        <span>Nagpur, Maharashtra</span>
      </div>
      <div className="total">
        <span className="green-text">Total:</span>
        <span>{totalPrice}Rs</span>
      </div>
      <div className="button-main">
        {/* Call the handlePlaceOrder function when the button is clicked */}
        <button className="order-button" onClick={handlePlaceOrder} disabled={isPlaceOrderDisabled}>
          Place Order
        </button>

        <button><Link to="/home" className="continue-shoping">Continue Shoping</Link></button>
      </div>
      {orderDetails && (
        <div className="order-details">
          
          <h2>Order Details:</h2>
          {/* Display order details */}
        </div>
      )}
    </div>
  );
};

export default Order;
