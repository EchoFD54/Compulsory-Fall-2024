import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../atoms/cartAtom.ts';
import { customerAtom } from '../atoms/state.ts';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Checkout.css'

const Checkout: React.FC = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [customer] = useAtom(customerAtom);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((total, entry) => total + entry.price * entry.quantity, 0);

  const finishOrder = () => {

    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to your cart before completing the order.");
      return;
    }
    if (!customer) {
      alert("Please log in to finish the order.");
      return;
    }
  
    const currentDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(currentDate.getDate() + 7); 
  
    const orderData = {
      customerId: customer.id,
      status: "pending", 
      orderEntries: cart.map(entry => ({
        productId: entry.productId,
        quantity: entry.quantity
      })),
      deliveryDate: deliveryDate.toISOString().split('T')[0] 
    };
  
    fetch('https://localhost:7246/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
      .then(response => {
        if (response.ok) {
          alert("Order placed successfully!");
          setCart([]); 
          navigate('/dashboard'); 
        } else {
          console.error("Failed to place order.");
        }
      })
      .catch(error => console.error('Error creating order:', error));
  };
  
  return (
    <div className='checkout-wrapper'>
      <h2>Checkout</h2>
      <ul>
        {cart.map(entry => (
          <li key={entry.productId}>
            <p>Product Name: {entry.productName}</p>
            <p>Quantity: {entry.quantity}</p>
            <p>Price per Unit: ${entry.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      <Link to="/shopsite">
      <button onClick={finishOrder}>Finish Order</button>
      </Link>
    </div>
  );
};

export default Checkout;
