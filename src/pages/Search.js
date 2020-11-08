import React from 'react';
import { useParams } from 'react-router-dom';

const Search = () => {
  let {search} = useParams();

  return(
    <div className="search">
      <p className="col-12">You searched for: {search}</p>
    </div>
  );
};

export default Search;