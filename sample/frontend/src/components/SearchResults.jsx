// src/components/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = ({ items }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query');

  useEffect(() => {
    if (query) {
      const results = items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(results);
    }
  }, [query, items]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {filteredItems.length > 0 ? (
        <ul>
          {filteredItems.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
