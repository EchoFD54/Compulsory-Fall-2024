import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { customerAtom } from '../atoms/state';
import { Link } from 'react-router-dom';
import { Order } from '../atoms/orderAtom';
import '../styles/Dashboard.css'

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
          console.log('Fetched orders:', data);
  
          if (data && Array.isArray(data.$values)) {
            // If data is correctly formatted
            const ordersWithEntries = data.$values.map((order: { orderEntries: { $values: any; }; }) => ({
              ...order,
              orderEntries: order.orderEntries?.$values || [] 
            }));
            setOrders(ordersWithEntries);
          } else {
            setOrders([]);
          }
        })
        .catch((error) => console.error('Error fetching orders:', error));
    }
  }, [customer]);

  

  if (!customer) {
    return <div>Please log in first.</div>;
  }

  return (
    <div className="dashboard-wrapper">
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {customer.name}</h2>
        <p>Email: {customer.email}</p>
        <p>Address: {customer.address}</p>
        <p>Phone: {customer.phone}</p>
      </div>
        <div className="dashboard-buttons">
        <Link to="/shopsite">
            <button>Buy Products</button>
          </Link>
          <Link to="/manage-products">
            <button>Create / Manage Products</button>
          </Link>

          <Link to="/manage-orders">
            <button>Manage Orders</button>
          </Link>
        </div>
    </div>
    <div className="orders-list">
          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order.id}>
                  <div>
                    <strong>Order #{order.id}</strong>
                  </div>
                  <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                  <p>Status: {order.status || 'Unknown'}</p>
                  <p>Total: ${order.totalAmount.toFixed(2)}</p>
                  <p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                  <h4>Products:</h4>
                  <ul>
                    {order.orderEntries?.map((entry) => (
                      <li key={entry.id}>
                        {entry.quantity}x {entry.productName || 'Unknown Product'} each at ${entry.productPrice.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
    </div>
  );
};

export default Dashboard;
