// src/components/ManageProducts.tsx

import React, { useState } from 'react';
import PaperList from './paperList';

const ManageProducts: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discontinued, setDiscontinued] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newProduct = {
      name,
      price,
      stock,
      discontinued,
    };

    try {
      const response = await fetch('https://localhost:7246/api/paper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      setName('');
      setPrice(0);
      setStock(0);
      setDiscontinued(false);

      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product.');
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <PaperList />
      <h2>Create Paper</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="discontinued">Discontinued:</label>
          <input
            type="checkbox"
            id="discontinued"
            checked={discontinued}
            onChange={(e) => setDiscontinued(e.target.checked)}
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ManageProducts;
