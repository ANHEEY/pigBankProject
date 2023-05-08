import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ search, onSearchChange }) {
  const handleChange = (event) => {
    const newSearch = event.target.value;
    onSearchChange(newSearch);
  };

  return (
    <TextField
      value={search}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  );
}

export default SearchBar;