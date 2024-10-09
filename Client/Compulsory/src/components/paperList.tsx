import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { papersAtom } from "../atoms/paperAtom";

const PaperList: React.FC = () => {
    const [papers, setPapers] = useAtom(papersAtom);
    const [restockAmount, setRestockAmount] = useState<number>(0);
    const [properties, setProperties] = useState<any[]>([]); 
    const [selectedProperty, setSelectedProperty] = useState<{[key: number]: number}>({}); 

    // Fetch papers 
    useEffect(() => {
        const fetchPapers = async () => {
            try {
                console.log('Fetching papers...');
                const response = await fetch('https://localhost:7246/api/paper');
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                console.log('Fetched raw paper data:', data); 
    
                if (data && Array.isArray(data.$values)) {
                    setPapers(data.$values.map((paper: any) => ({
                        ...paper,
                        propertyNames: paper.propertyNames ? paper.propertyNames.$values : [] 
                    })));
                } else {
                    console.error('Fetched data does not have $values as an array:', data);
                }
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };
    
        fetchPapers();
        fetchProperties();
    }, [setPapers]);
    

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

    const handleAssignProperty = async (paperId: number) => {
        const propertyId = selectedProperty[paperId];

        if (!propertyId) {
            alert('Please select a property');
            return;
        }

        try {
            const response = await fetch(`https://localhost:7246/api/property/assignProperty`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paperId, propertyId }),
            });

            if (!response.ok) {
                throw new Error('Failed to assign property');
            }

            alert('Property assigned successfully!');
        } catch (error) {
            console.error('Error assigning property:', error);
            alert('Failed to assign property.');
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
                            <h3>Name: {paper.name}</h3>
                            <p>Discontinued: {paper.discontinued ? 'Yes' : 'No'}</p>
                            <p>Stock: {paper.stock}</p>
                            <p>Price: ${paper.price}</p>

                            {/* Display Property Names */}
                            <h4>Properties:</h4>
                            {paper.propertyNames && paper.propertyNames.length > 0 ? (
                                <ul>
                                    {paper.propertyNames.map((propertyName: string, index: number) => (
                                        <li key={index}>{propertyName}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No properties assigned.</p>
                            )}

                            {/* Property Assignment */}
                            <div>
                                <h4>Assign Property</h4>
                                <select
                                    value={selectedProperty[paper.id] || ''}
                                    onChange={(e) => setSelectedProperty({ ...selectedProperty, [paper.id]: Number(e.target.value) })}
                                >
                                    <option value="">Select Property</option>
                                    {properties.map((property) => (
                                        <option key={property.id} value={property.id}>
                                            {property.propertyName}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => handleAssignProperty(paper.id)}>Assign Property</button>
                            </div>

                            {/* Discontinue/Reactivate button */}
                            <div>
                                <button onClick={() => toggleDiscontinue(paper.id, paper.discontinued)}>
                                    {paper.discontinued ? 'Reactivate' : 'Discontinue'}
                                </button>
                            </div>

                            {/* Restock input and button */}
                            <div>
                                <input
                                    type="number"
                                    placeholder="Restock amount"
                                    value={restockAmount}
                                    onChange={(e) => setRestockAmount(Number(e.target.value))}
                                />
                                <button onClick={() => handleRestock(paper.id, restockAmount)} disabled={paper.discontinued}>
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
