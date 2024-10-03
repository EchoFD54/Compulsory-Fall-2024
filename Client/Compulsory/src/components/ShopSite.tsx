import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../atoms/cartAtom.ts';
import { Paper } from '../types/paper';
import Cart from './Cart.tsx';

const ProductList: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [cart, setCart] = useAtom(cartAtom);
  

  useEffect(() => {
    fetch('https://localhost:7246/api/paper') 
      .then((response) => response.json())
      .then((data) => {
        setPapers(data.$values || []); 
      })
      .catch((error) => console.error('Error fetching papers:', error));
  }, []);

  const addToCart = (productId: number) => {
    const existingEntry = cart.find(entry => entry.productId === productId);
    if (existingEntry) {  
      setCart(cart.map(entry => 
        entry.productId === productId ? { ...existingEntry, quantity: existingEntry.quantity + 1 } : entry
      ));
    } else {
      setCart([...cart, { productId, quantity: 1 }]);
    }
  };

  return (
    <div>
      <h2>Available Papers</h2>
      <ul>
        {papers.map(paper => (
          <li key={paper.id}>
            <h4>{paper.name}</h4>
            <p>Price: ${paper.price.toFixed(2)}</p>
            <p>Stock: {paper.stock}</p>
            <button onClick={() => addToCart(paper.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <div className="cart-container">
        <Cart />
      </div>
    </div>
  );
};

export default ProductList;
