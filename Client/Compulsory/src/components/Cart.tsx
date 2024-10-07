
import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../atoms/cartAtom.ts';
import { Link } from 'react-router-dom';
import { customerAtom } from '../atoms/state.ts';

const Cart: React.FC = () => {
  const [cart] = useAtom(cartAtom);
  const [customer] = useAtom(customerAtom);

  const totalAmount = cart.reduce((total, entry) => {
    return total + entry.price * entry.quantity;
  }, 0);


  if (!customer) {
    return <p>Please log in to view your cart and proceed to checkout.</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cart.map(entry => (
            <li key={entry.productId}>
              <p>Product ID: {entry.productId}</p>
              <p>Product Name: {entry.productName}</p>
              <p>Quantity: {entry.quantity}</p>
              {/* Display product name and price if available */}
            </li>
          ))}
        </ul>
      )}
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      <p>Logged in as: {customer.name}</p> 
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
