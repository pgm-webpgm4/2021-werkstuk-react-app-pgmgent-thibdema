import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [redirecter, setRedirecter] = useState();

  return(
    <form onSubmit={(e) => {
      e.preventDefault();
      setRedirecter(`/search/${searchValue}`);
    }} role="search" className="header__searchbar col-md-4 col-12">
      {(!!redirecter) ? <Redirect to={redirecter} /> : '' }
      <input onChange={(e) => setSearchValue(e.target.value)} type="search" name="search" className="form-control ds-input" id="search" minLength="3" placeholder="Search ..." value={searchValue} autoComplete="off"/>
    </form>
  );
};

export default SearchBar;