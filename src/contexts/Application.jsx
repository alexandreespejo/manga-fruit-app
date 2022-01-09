import React, { createContext, useEffect, useState } from 'react';

const ApplicationContext = createContext();

function ApplicationProvider({ children }) {
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const startLoad=()=>setIsLoading(true)
  const endLoad=()=>setIsLoading(false)

  return (
    <ApplicationContext.Provider
      value={{ searchData, setSearchData,isLoading,startLoad,endLoad }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export { ApplicationContext, ApplicationProvider };
