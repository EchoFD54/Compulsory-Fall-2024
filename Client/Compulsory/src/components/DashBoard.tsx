import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { customerAtom } from '../atoms/state';
import { Link } from 'react-router-dom';

interface OrderEntry {
  id: number;
  quantity: number;
  product: { name: string; price: number };
}

interface Order {
  id: number;
  orderDate: string;
  status: string;
  totalAmount: number;
  orderEntries: OrderEntry[];
}

const Dashboard: React.FC = () => {
  const [customer] = useAtom(customerAtom);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (customer) {
      fetch(`https://localhost:7246/api/order/customers/${customer.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fetched orders:', data); // Log the fetched data
          // Adjust this part to account for the API's actual data structure
          if (data && Array.isArray(data.$values)) {
            setOrders(data.$values); // Use $values if the orders are inside this property
          } else {
            setOrders([]); // If no valid orders, set an empty array
          }
        })
        .catch((error) => console.error('Error fetching orders:', error));
    }
  }, [customer]);

  

  if (!customer) {
    return <div>Please log in first.</div>;
  }

  return (
    <div>
      <div>
        <h2>Welcome, {customer.name}</h2>
        <p>Email: {customer.email}</p>
        <p>Address: {customer.address}</p>
        <p>Phone: {customer.phone}</p>
      </div>

      <div>
        <Link to="/manage-products">
          <button>Create / Manage Products</button>
        </Link>
      </div>

      <div>
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div>
            <ul>
  {orders.map((order) => (
    <li key={order.id}>
      <div>
        <strong>Order #{order.id}</strong>
      </div>
      <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
      <p>Status: {order.status || 'Unknown'}</p>
      <p>Total: ${order.totalAmount || '0.00'}</p>
      <h4>Order Entries:</h4>
      <ul>
        {order.orderEntries && order.orderEntries.length > 0 ? (
          order.orderEntries.map((entry) => (
            <li key={entry.id}>
              {entry.quantity}x {entry.product?.name || 'Unknown Product'} @ ${entry.product?.price || '0.00'}
            </li>
          ))
        ) : (
          <li>No order entries available</li>
        )}
      </ul>
    </li>
  ))}
</ul>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Dashboard;
