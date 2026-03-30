import React, { createContext, useState, useEffect } from 'react';

export const PharmacieContext = createContext(null);

export const PharmacieProvider = ({ children }) => {
  const [pharmacieData, setPharmacieData] = useState(() => {
    const saved = localStorage.getItem('mypharma_data');
    return saved ? JSON.parse(saved) : null;
  });

  const [isLogged, setIsLogged] = useState(() => {
    return !!localStorage.getItem('mypharma_logged');
  });

  useEffect(() => {
    if (pharmacieData) {
      localStorage.setItem('mypharma_data', JSON.stringify(pharmacieData));
    }
  }, [pharmacieData]);

  const login = (email, password) => {
    // Mock login logic
    if (pharmacieData && pharmacieData.email === email && pharmacieData.password === password) {
      setIsLogged(true);
      localStorage.setItem('mypharma_logged', 'true');
      return true;
    }
    return false;
  };

  const forceLogin = () => {
    setIsLogged(true);
    localStorage.setItem('mypharma_logged', 'true');
  };

  const logout = () => {
    setIsLogged(false);
    localStorage.removeItem('mypharma_logged');
  };

  const updateData = (newData) => {
    setPharmacieData(prev => ({ ...prev, ...newData }));
  };

  return (
    <PharmacieContext.Provider value={{
      pharmacieData,
      isLogged,
      login,
      forceLogin,
      logout,
      updateData
    }}>
      {children}
    </PharmacieContext.Provider>
  );
};
