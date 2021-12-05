import React, { createContext, useEffect, useState } from 'react';

const ApplicationContext = createContext();

function ApplicationProvider({ children }) {
  const [searchData, setSearchData] = useState([])
  return (
    <ApplicationContext.Provider
      value={{ searchData, setSearchData }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export { ApplicationContext, ApplicationProvider };
