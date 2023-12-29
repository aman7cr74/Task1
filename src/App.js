import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://s3.amazonaws.com/open-to-cors/assignment.json'
        );

        console.log('API Response:', response.data); 

        if (response.data && response.data.products) {
          const productsArray = Object.values(response.data.products);

          const sortedProducts = productsArray.sort(
            (a, b) => b.popularity - a.popularity
          );

          setProducts(sortedProducts);
        } else {
          console.error('Invalid data structure in the API response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Product List</h1>
      <table style={{ margin: 'auto', borderCollapse: 'collapse', width: '80%' }}>
        <thead>
          <tr>
            <th style={tableHeader}>Serial No</th>
            <th style={tableHeader}>Title</th>
            <th style={tableHeader}>Price</th>
            <th style={tableHeader}>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.title}>
              <td style={tableCell}>{index + 1}</td>
              <td style={tableCell}>{product.title}</td>
              <td style={tableCell}>{product.price}</td>
              <td style={tableCell}>{product.popularity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeader = {
  borderBottom: '2px solid #ddd',
  padding: '10px',
  textAlign: 'center',
};

const tableCell = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'center',
};

export default App;
