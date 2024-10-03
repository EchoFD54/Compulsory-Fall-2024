// components/Cart.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../atoms/cartAtom.ts';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const [cart] = useAtom(cartAtom);

  const totalAmount = cart.reduce((total, entry) => {
    const price = 0; 
    return total + price * entry.quantity;
  }, 0);

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
              <p>Quantity: {entry.quantity}</p>
              {/* Display product name and price if available */}
            </li>
          ))}
        </ul>
      )}
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
