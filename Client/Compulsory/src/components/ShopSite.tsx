import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../atoms/cartAtom.ts';
import { customerAtom } from '../atoms/state.ts';
import { Paper } from '../types/paper';
import Cart from './Cart.tsx';

const ProductList: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [cart, setCart] = useAtom(cartAtom);
  const [customer] = useAtom(customerAtom);
  

  useEffect(() => {
    fetch('https://localhost:7246/api/paper') 
      .then((response) => response.json())
      .then((data) => {
        const availablePapers = data.$values?.filter((paper: Paper) => !paper.discontinued) || [];
        setPapers(availablePapers); 
      })
      .catch((error) => console.error('Error fetching papers:', error));
  }, []);

  const addToCart = (productId: number) => {
    if (!customer) { 
      alert("You need to log in to add items to your cart.");
      return;
    }

    const product = papers.find(paper => paper.id ===productId);
    if(!product) return;

    const existingEntry = cart.find(entry => entry.productId === productId);
    
    if (existingEntry) {  
      setCart(cart.map(entry => 
        entry.productId === productId ? { ...existingEntry, quantity: existingEntry.quantity + 1 } : entry
      ));
    } else {
      setCart([...cart, {
        productId, quantity: 1,
        productName: product.name,
        price: product.price
      }]);
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
            {paper.stock <= 0 ? (
              <p style={{ color: 'red' }}>Out of Stock</p>
            ) : (
              <p>Stock: {paper.stock}</p>
            )}
            <button 
              onClick={() => addToCart(paper.id)} 
              disabled={paper.stock <= 0}
            >
              Add to Cart
            </button>
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
