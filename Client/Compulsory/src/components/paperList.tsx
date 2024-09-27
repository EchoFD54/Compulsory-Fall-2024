import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { papersAtom } from "../atoms/paperAtom";

const PaperList: React.FC = () => {
    const [papers, setPapers] = useAtom(papersAtom);
    const [restockAmount, setRestockAmount] = useState<number>(0);

    
    useEffect(() => {
        const fetchPapers = async () => {
            try {
                console.log('Fetching papers...');
                const response = await fetch('https://localhost:7246/api/paper');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Papers fetched:', data);

                
                if (data && Array.isArray(data.$values)) {
                    setPapers(data.$values);
                } else {
                    console.error('Fetched data does not have $values as an array:', data);
                }
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };

        fetchPapers();
    }, [setPapers]);


    const toggleDiscontinue = async (paperId: number, currentStatus: boolean) => {
        const newStatus = !currentStatus; 
        const action = newStatus ? 'discontinue' : 'reactivate'; 

        try {
            const response = await fetch(`https://localhost:7246/api/paper/${paperId}/discontinue`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ discontinued: newStatus }), 
            });

            if (!response.ok) {
                throw new Error(`Failed to ${action} paper`);
            }

            setPapers(papers.map(paper => paper.id === paperId ? { ...paper, discontinued: newStatus } : paper));
        } catch (error) {
            console.error(`Error trying to ${action} paper:`, error);
            alert(`Failed to ${action} paper.`);
        }
    };


    const handleRestock = async (paperId: number, stock: number) => {
        try {
            const response = await fetch(`https://localhost:7246/api/paper/${paperId}/restock`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stock),
            });

            if (!response.ok) {
                throw new Error('Failed to restock paper');
            }
      
            setPapers(papers.map(paper => paper.id === paperId ? { ...paper, stock: paper.stock + stock } : paper));
        } catch (error) {
            console.error('Error restocking paper:', error);
            alert('Failed to restock paper.');
        }
    };

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
                            <p>Discontinued: {paper.discontinued ? 'Yes' : 'No'}</p>
                            <p>Stock: {paper.stock}</p>
                            <p>Price: ${paper.price}</p>
                            <div>
                                {/* Discontinue/Reactivate button */}
                                <button
                                    onClick={() => toggleDiscontinue(paper.id, paper.discontinued)}
                                >
                                    {paper.discontinued ? 'Reactivate' : 'Discontinue'}
                                </button>
                            </div>
                            <div>
                                {/* Restock input and button */}
                                <input
                                    type="number"
                                    placeholder="Restock amount"
                                    value={restockAmount}
                                    onChange={(e) => setRestockAmount(Number(e.target.value))}
                                />
                                <button
                                    onClick={() => handleRestock(paper.id, restockAmount)}
                                    disabled={paper.discontinued} 
                                >
                                    Restock
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PaperList;
