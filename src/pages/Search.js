import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import {ContentLoader, ProductCard, Pagination} from '../components';

const GET_SEARCH_RESULTS = gql`
  query search($search: String!) {
    search(search: $search) {
      id,title,description, images{url,alt}, price
    }
  }
`;

const Search = () => {
  let {search} = useParams();
  const [page, setPage] = useState(1);
  const itemsperpage = 9;
  const {loading, errors, data} = useQuery(GET_SEARCH_RESULTS, {
    variables: {search: search}
  });

  if(loading) return(<ContentLoader />);
  if(!!errors) console.log(errors);

  return(
    <div className="search container row">
      <p className="col-12">You searched for: {search}</p>
        {(data && data.search.length > 0) ? 
          data.search.slice(((page-1)*itemsperpage), (page*itemsperpage)).map((e, key) => <div key={key} className="col-lg-4 col-md-6 col-12"><ProductCard {...e} /></div>)
          :
          <p className="col-12">No products found.</p>
        }
      {(data && data.search.length > 0) && <Pagination page={page} setPage={setPage} itemsperpage={itemsperpage} totalitems={data.search.length} />}
    </div>
  );
};

export default Search;