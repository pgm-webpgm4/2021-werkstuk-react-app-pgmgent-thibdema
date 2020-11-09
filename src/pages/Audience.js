import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import {ContentLoader, Pagination, ProductCard} from '../components';

const GET_AUDIENCE_PRODUCTS = gql`
  query getAudienceProducts($audience: String!) {
    getAudienceProducts(audience: $audience) {
      id,title,description, images{url,alt}, price
    }
  }
`;

const Audience = () => {
  let { audience } = useParams();
  const [page, setPage] = useState(1);
  const itemsperpage = 9;
  const {loading, errors, data} = useQuery(GET_AUDIENCE_PRODUCTS, {
    variables: {audience: audience}
  });

  if(loading) return(<ContentLoader />);
  if(!!errors) console.log(errors);

  return(
    <div className="audience">
      <div className="container row">
        {(data && data.getAudienceProducts.length > 0) ? 
          data.getAudienceProducts.slice(((page-1)*itemsperpage), (page*itemsperpage)).map((e, key) => <div key={key} className="col-md-4 col-12"><ProductCard {...e} /></div> )
          :
          <p className="col-12">No products yet.</p>
        }
      </div>
      {(data && data.getAudienceProducts.length > 0) && <Pagination page={page} setPage={setPage} itemsperpage={itemsperpage} totalitems={data.getAudienceProducts.length} />}
    </div>
  );
};

export default Audience;