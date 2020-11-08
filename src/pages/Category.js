import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import {ProductCard} from '../components';

const GET_CATEGORY_PRODUCTS = gql`
  query getCategoryProducts($category: String!) {
    getCategoryProducts(category: $category) {
      id,title,description, images{url,alt}, price
    }
  }
`;

const Category = () => {
  let { category } = useParams();
  const {loading, errors, data} = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: {category: category}
  });

  if(loading) return(<p>Loading ... </p>);
  if(!!errors) console.log(errors);

  return(
    <div className="category container row">
      {(data.getCategoryProducts.length > 0) ? 
        data.getCategoryProducts.map((e, key) => <div key={key} className="col-md-4 col-12"><ProductCard {...e} /></div> )
        :
        <p className="col-12">No products yet.</p>
      }
    </div>
  );
};

export default Category;