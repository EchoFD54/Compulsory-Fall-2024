import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../atoms/cartAtom.ts';
import { customerAtom } from '../atoms/state.ts';
import { Paper } from '../types/paper';
import Cart from './Cart.tsx';
import '../styles/Shopsite.css'
import { papersAtom } from '../atoms/paperAtom.ts';


const ProductList: React.FC = () => {
  const [papers, setPapers] = useAtom(papersAtom);
  const [properties, setProperties] = useState<any[]>([]); 
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>([]);
  const [cart, setCart] = useAtom(cartAtom);
  const [customer] = useAtom(customerAtom);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name'); 

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch('https://localhost:7246/api/paper');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data && Array.isArray(data.$values)) {
          const availablePapers = data.$values
            .filter((paper: Paper) => !paper.discontinued)
            .map((paper: any) => ({
              ...paper,
              propertyNames: paper.propertyNames ? paper.propertyNames.$values : [] 
            }));
          
          setPapers(availablePapers);
          setFilteredPapers(availablePapers); 
        } else {
          console.error('Fetched data does not have $values as an array:', data);
        }
      } catch (error) {
        console.error('Error fetching papers:', error);
      }
    };
  
    fetchPapers();
  }, []);
  

  useEffect(() => {
    let results = papers.filter(paper =>
      paper.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    results.sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'price') {
        return a.price - b.price;
      }
      return 0;
    });

    setFilteredPapers(results);
  }, [searchTerm, sortOption, papers]);

  const addToCart = (productId: number) => {
    if (!customer) { 
      alert("You need to log in to add items to your cart.");
      return;
    }

    const product = filteredPapers.find(paper => paper.id === productId);
    if (!product) return;

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
    <div className="shopsite-wrapper">
      <div>
      <h2>Available Papers</h2>
      
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
        
      </div>
    <div className="shopsite-list">
      <ul>
        {filteredPapers.map(paper => (
          <li key={paper.id}>
            <h4>{paper.name}</h4>
            <p>Price: ${paper.price.toFixed(2)}</p>
            {paper.stock <= 0 ? (
              <p style={{ color: 'red' }}>Out of Stock</p>
            ) : (
              <p>Stock: {paper.stock}</p>
            )}

            <h4>Properties:</h4>
              {paper.propertyNames && paper.propertyNames.length > 0 ? (
            <div className='shopsite-properties-list'>
               {paper.propertyNames.map((propertyName: string, index: number) => (
                <li key={index}>{propertyName}</li>
                 ))}
            </div>
                   ) : (
               <p>No properties assigned.</p>
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
    </div>
    <div className="shopsite-cart">
        <Cart />
      </div>
    </div>
  );
};

export default ProductList;
