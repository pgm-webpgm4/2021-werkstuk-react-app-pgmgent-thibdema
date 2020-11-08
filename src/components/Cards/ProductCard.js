import React from 'react';
import {Link} from 'react-router-dom';

import {BGImage} from '../';

const ProductCard = ({id, title, description, images, price}) => {

  return(
    <div className="productcard card w-100">
      {(images[0]) ? <BGImage url={images[0].url} height="20rem" /> : ''}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <Link to={`/product/${id}`} className="btn btn-primary">Go to product</Link>
      </div>
    </div>
  );
};

export default ProductCard;