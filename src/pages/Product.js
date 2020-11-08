import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import {BGImage} from '../components';

const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id,title,description, images{url,alt}, price
    }
  }
`;

const Product = () => {
  let { id } = useParams();
  const {loading, errors, data} = useQuery(GET_PRODUCT, {
    variables: {id: id}
  });

  if(loading) return(<p>Loading ... </p>);
  if(!!errors) console.log(errors);

  if(data) console.log(data.getProduct);

  return(
    <div className="product container row align-items-start">
      {(!!data.getProduct) ? 
        <Fragment>
          <div className="col-md-6 col-12">
            {(data.getProduct.images.length > 0) ?
              <BGImage url={data.getProduct.images[0].url} height="30rem" />
              : ''
            }
          </div>
          <div className="col-md-6 col-12" style={{margin: '1rem 0rem'}}>
            <h1>{(data.getProduct.title)}</h1>
            <p>{(data.getProduct.description)}</p>
          </div>
        </Fragment>
        :
        <p className="col-12">Product not found.</p>
      }
    </div>
  );
};

export default Product;