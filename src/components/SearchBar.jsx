import React from 'react'
import { useState } from 'react'

const SearchBar = () => {
    const [searchItem, setSearchItem] = useState('')

    const handleInputChange = (e) => { 
      const searchTerm = e.target.value;
      setSearchItem(searchTerm)
    }
  
    return (
      <div>      
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder='Search for fraagrance'
        />
      </div>
    )
}

export default SearchBar