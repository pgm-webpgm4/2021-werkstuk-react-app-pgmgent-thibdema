import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';

import {BGImage} from '..';

const ProductCard = ({id, title, description, images, price}) => {
  const [redirecter, setRedirecter] = useState();
  const url = `/product/${id}`;
  return(
    <div onClick={() => setRedirecter(url)} className="productcard card w-100">
      {(!!redirecter) && <Redirect to={redirecter} />}
      <BGImage url={(!!images[0]) ? images[0].url : ''} height="20rem" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <Link to={url} className="btn btn-primary">Go to product</Link>
      </div>
    </div>
  );
};

export default ProductCard;