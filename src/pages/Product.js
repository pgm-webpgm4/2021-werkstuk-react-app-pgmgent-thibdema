import React from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  let {id} = useParams();
  return(
    <div className="product">
      Product {id}
    </div>
  );
};

export default Product;