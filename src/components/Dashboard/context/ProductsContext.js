import React, { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL; // Ensure this is set in your environment variables
    fetch(`${backendUrl}/api/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(setProducts)
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const contextValue = {
    products,
    setProducts,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
