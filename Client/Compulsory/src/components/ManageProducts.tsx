import React, { useState, useEffect } from 'react';
import PaperList from './paperList';
import '../styles/ManageProducts.css'; 

const ManageProducts: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discontinued, setDiscontinued] = useState(false);
  
  const [propertyName, setPropertyName] = useState(''); 
  const [properties, setProperties] = useState<any[]>([]); 

  const handleSubmitPaper = async (event: React.FormEvent) => {
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

  const handleSubmitProperty = async (event: React.FormEvent) => {
    event.preventDefault();

    const newProperty = {
      propertyName,
    };

    try {
      const response = await fetch('https://localhost:7246/api/property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProperty),
      });

      if (!response.ok) {
        throw new Error('Failed to create property');
      }

      setPropertyName('');
      alert('Property created successfully!');
      fetchProperties(); 
    } catch (error) {
      console.error('Error creating property:', error);
      alert('Failed to create property.');
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await fetch('https://localhost:7246/api/property');
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();
      setProperties(data.$values || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="manage-products-wrapper">
    <div className="manage-products-container">
      <div className="paper-list-container">
        <PaperList />
      </div>

      
    </div>
    <div className="form-container">
        <h2>Create Paper</h2>
        <form onSubmit={handleSubmitPaper}>
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

        <h2>Create Property</h2>
        <form onSubmit={handleSubmitProperty}>
          <div>
            <label htmlFor="propertyName">Property Name:</label>
            <input
              type="text"
              id="propertyName"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Property</button>
        </form>

        <h2>Available Properties</h2>
        <div className='properties-list'>
        <ul>
          {properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            properties.map((property) => (
              <li key={property.id}>
                {property.propertyName}
              </li>
            ))
          )}
        </ul>
      </div>
      </div>
    </div>
  );
};

export default ManageProducts;
