
import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../atoms/cartAtom.ts';
import { Link } from 'react-router-dom';
import { customerAtom } from '../atoms/state.ts';
import removeIcon from '../assets/Removecarticon.png'
import { papersAtom } from '../atoms/paperAtom.ts';

const Cart: React.FC = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [customer] = useAtom(customerAtom);
  const [papers] = useAtom(papersAtom);

  const totalAmount = cart.reduce((total, entry) => {
    return total + entry.price * entry.quantity;
  }, 0);

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(entry => entry.productId !== productId));
  };

  const emptyCart = () => {
    setCart([]); 
  };

  const checkStockAvailability = (): boolean => {
    for (let entry of cart) {
      const product = papers.find(paper => paper.id === entry.productId);
      if (product && entry.quantity > product.stock) {
        alert(`The quantity for ${entry.productName} exceeds available stock. Please adjust your order.`);
        return false;
      }
    }
    return true;
  };


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
              <p>Product Name: {entry.productName}</p>
              <p>Price per item: ${entry.price}</p>
              <p>Quantity: {entry.quantity}</p>
              <button onClick={() => removeFromCart(entry.productId)}><img src={removeIcon} alt="Add to Cart" className="cart-remove" /></button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      <p>Logged in as: {customer.name}</p> 
      <button onClick={emptyCart} disabled={cart.length === 0}>Empty Cart</button>
      <Link to="/checkout">
        <button onClick={(e) => {
          if (!checkStockAvailability()) {
            e.preventDefault();
          }
        }}>
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default Cart;
