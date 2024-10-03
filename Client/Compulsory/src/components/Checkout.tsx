// components/Checkout.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../atoms/cartAtom.ts';
import { customerAtom } from '../atoms/state';

const Checkout: React.FC = () => {
  const [cart] = useAtom(cartAtom);
  const [customer] = useAtom(customerAtom);

  const handleCheckout = () => {
    const orderData = {
        customerId: customer?.id,
      orderEntries: cart.map(entry => ({
        productId: entry.productId,
        quantity: entry.quantity
      }))
    };

    fetch('https://localhost:7246/api/order', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Order placed:', data);
        
      })
      .catch(error => console.error('Error placing order:', error));
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <h3>Your Order:</h3>
          <ul>
            {cart.map(entry => (
              <li key={entry.productId}>
                <p>Product ID: {entry.productId}</p>
                <p>Quantity: {entry.quantity}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
