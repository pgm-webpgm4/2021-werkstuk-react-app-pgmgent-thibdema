import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import {ContentLoader, ProductCard, Pagination} from '../components';

const GET_CATEGORY_PRODUCTS = gql`
  query getCategoryProducts($category: String!) {
    getCategoryProducts(category: $category) {
      id,title,description, images{url,alt}, price
    }
  }
`;

const Category = () => {
  let { category } = useParams();
  const [page, setPage] = useState(1);
  const itemsperpage = 9;
  const {loading, errors, data} = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: {category: category}
  });

  if(loading) return(<ContentLoader />);
  if(!!errors) console.log(errors);

  return(
    <div className="category">
      <div className="container row">
        {(data && data.getCategoryProducts.length > 0) ? 
          data.getCategoryProducts.slice(((page-1)*itemsperpage), (page*itemsperpage)).map((e, key) => <div key={key} className="col-lg-4 col-md-6 col-12"><ProductCard {...e} /></div> )
          :
          <p className="col-12">No products yet.</p>
        }
      </div>
      {(data && data.getCategoryProducts.length > 0) && <Pagination page={page} setPage={setPage} itemsperpage={itemsperpage} totalitems={data.getCategoryProducts.length} />}
    </div>
  );
};

export default Category;