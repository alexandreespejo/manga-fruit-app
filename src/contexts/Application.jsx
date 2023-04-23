import React, { createContext, useState } from 'react'

const ApplicationContext = createContext()

function ApplicationProvider({ children }) {
  const [searchData, setSearchData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedManga, setSelectedManga] = useState({})

  const startLoad = () => setIsLoading(true)
  const endLoad = () => setIsLoading(false)

  return (
    <ApplicationContext.Provider
      value={{ searchData, setSearchData, isLoading, startLoad, endLoad, selectedManga, setSelectedManga }}>
      {children}
    </ApplicationContext.Provider>
  )
}

export { ApplicationContext, ApplicationProvider }
