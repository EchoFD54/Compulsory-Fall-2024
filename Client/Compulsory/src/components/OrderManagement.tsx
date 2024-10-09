import React, { useState, useEffect } from 'react';
import { Customer } from '../atoms/state';
import { Order } from '../atoms/orderAtom';
import '../styles/ManageOrders.css'

const AdminOrderManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusUpdates, setStatusUpdates] = useState<{ [key: number]: string }>({});
  const [deliveryDateUpdates, setDeliveryDateUpdates] = useState<{ [key: number]: string }>({});
  const [newStatus, setNewStatus] = useState<string>("");
 

  // Fetch all customes 
  useEffect(() => {
    fetch('https://localhost:7246/api/customer')
      .then(response => response.json())
      .then(data => {
        setCustomers(data.$values || []);
      })
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  // Fetch orders for customer
  const fetchOrders = (customerId: number) => {
    fetch(`https://localhost:7246/api/order/customers/${customerId}`)
      .then(response => response.json())
      .then(data => {
        setOrders(data.$values || []);
        setSelectedCustomer(customers.find(c => c.id === customerId) || null);
      })
      .catch(error => console.error('Error fetching orders:', error));
  };

  const handleDeliveryDateChange = (orderId: number, deliveryDate: string) => {
    setDeliveryDateUpdates({ ...deliveryDateUpdates, [orderId]: deliveryDate });
  };

  const handleStatusSubmission = async (orderId: number) => {
    const status = statusUpdates[orderId] || newStatus;
    try {
      const response = await fetch(`https://localhost:7246/api/order/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to change order status');
      }
      console.log('Order status updated successfully');
      fetchOrders(selectedCustomer!.id);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
  };
  

  const handleDeliveryDateSubmission = async (orderId: number) => {
    const deliveryDate = deliveryDateUpdates[orderId]; 
    try {
      const response = await fetch(`https://localhost:7246/api/order/${orderId}/deliverydate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: deliveryDate }),  
      });
  
      if (!response.ok) {
        throw new Error('Failed to change order delivery date');
      }
      console.log('Delivery date updated successfully');
      fetchOrders(selectedCustomer!.id);
    } catch (error) {
      console.error('Error updating delivery date', error);
      alert('Failed to update delivery date.');
    }
  };
  

  return (
    <div className='manage-orders-wrapper'>
      <div className='costumer-container'>
      <h2>Admin Order Management</h2>

      <div>
        <h3>Customers</h3>
        <ul>
          {customers.map(customer => (
            <li key={customer.id}>
              <button onClick={() => fetchOrders(customer.id)}>
                {customer.name} ({customer.email})
              </button>
            </li>
          ))}
        </ul>
      </div>
      </div>

      {selectedCustomer && (
        <div className='order-list'>
          <h3>Orders for {selectedCustomer.name}</h3>
          {orders.length === 0 ? (
            <p>No orders found for this customer.</p>
          ) : (
            <ul>
              {orders.map(order => (
                <li key={order.id}>
                  <p>Order ID: {order.id}</p>
                  <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                  <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                  <p>Order Status: 
                    <input
                      type="text"
                      value={statusUpdates[order.id] || order.status}
                      onChange={(e) => setStatusUpdates({ ...statusUpdates, [order.id]: e.target.value })} 
                    />
                    <button onClick={() => handleStatusSubmission(order.id)}>Update Status</button>
                  </p>
                  <p>Delivery Date: 
                    <input
                      type="date"
                      value={deliveryDateUpdates[order.id] || order.deliveryDate?.substring(0, 10) || ''}
                      onChange={(e) => handleDeliveryDateChange(order.id, e.target.value)}
                    />
                    <button onClick={() => handleDeliveryDateSubmission(order.id)}>Update Delivery Date</button>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrderManagement;
