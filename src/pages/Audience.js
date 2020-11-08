import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import {ProductCard} from '../components';

const GET_AUDIENCE_PRODUCTS = gql`
  query getAudienceProducts($audience: String!) {
    getAudienceProducts(audience: $audience) {
      id,title,description, images{url,alt}, price
    }
  }
`;

const Audience = () => {
  let { audience } = useParams();
  const {loading, errors, data} = useQuery(GET_AUDIENCE_PRODUCTS, {
    variables: {audience: audience}
  });

  if(loading) return(<p>Loading ... </p>);
  if(!!errors) console.log(errors);

  return(
    <div className="audience container row">
      {(data && data.getAudienceProducts.length > 0) ? 
        data.getAudienceProducts.map((e, key) => <div key={key} className="col-md-4 col-12"><ProductCard {...e} /></div> )
        :
        <p className="col-12">No products yet.</p>
      }
    </div>
  );
};

export default Audience;