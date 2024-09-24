import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { papersAtom } from '../atoms/paperAtom';
import { Paper } from '../types/paper';

const PaperList: React.FC = () => {
    const [papers, setPapers] = useAtom(papersAtom);

    // Fetch papers from the API
    useEffect(() => {
        const fetchPapers = async () => {
            try {
                console.log('Fetching papers...');
                const response = await fetch('https://localhost:7246/api/paper');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: Paper[] = await response.json();
                console.log('Papers fetched:', data);
                setPapers(data);
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };

        fetchPapers();
    }, [setPapers]);

    return (
        <div>
            <h1>Paper List</h1>
    {papers.length === 0 ? (
        <p>No papers available</p>
    ) : (
        <ul>
            {papers.map((paper) => (
                <li key={paper.id}>
                    <h3>{paper.name}</h3>
                    <p>{paper.discontinued}</p>
                    <p>Stock: ${paper.stock}</p>
                    <p>Price: ${paper.price}</p>
                    <p>OrderEntries: {paper.orderEntries ? paper.orderEntries.join(', ') : 'No order entries available'}</p>
                    <p>Properties: {paper.properties ? paper.properties.join(', ') : 'No properties available'}</p>
                </li>
            ))}
        </ul>
    )}
        </div>
    );
};

export default PaperList;
