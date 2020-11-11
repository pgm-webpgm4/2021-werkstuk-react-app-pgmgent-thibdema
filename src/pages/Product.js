import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import {BGImage, ContentLoader, ErrorAlert, SuccessAlert} from '../components';
import {Basket} from '../hooks';

const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id,title,description, images{url,alt}, price, color, created_At
    }
  }
`;

const Product = () => {
  let { id } = useParams();
  const [size, setSize] = useState('');
  const [error, setError] = useState();
  const [succes, setSucces] = useState();
  const {loading, errors, data} = useQuery(GET_PRODUCT, {
    variables: {id: id}
  });

  if(loading) return(<ContentLoader />);
  if(!!errors) console.log(errors);

  const AddProduct = () => {
    if(!!size) {
      const basket = new Basket();
      setSucces(basket.AddProduct(data.getProduct, size));
    } else {
      setError(`You didn't select a size.`);
    }
  };

  return(
    <Fragment>
      {(!!error) && <ErrorAlert message={error} /> }
      {(!!succes) && <SuccessAlert message={succes} /> }
      <div className="product container row align-items-start">
        {(!!data.getProduct) ? 
          <Fragment>
            <div className="col-md-6 col-12">
              {
                <BGImage url={(data.getProduct.images.length > 0) ? data.getProduct.images[0].url : ''} height="30rem" />
              }
            </div>
            <div className="col-md-6 col-12" style={{margin: '1rem 0rem'}}>
              {/* If product is added this week it gets a 'New' badge */}
              <h1 className="product__title">{(data.getProduct.title)}{(new Date(data.getProduct.created_At) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) && <span className="badge badge-danger right">New</span>}</h1>
              <p>{(data.getProduct.description)}</p>
              <h2>Colors</h2>
              <div className="d-flex align-items-center flex-wrap">
                {data.getProduct.color.length > 0 && data.getProduct.color.map((e, key) => <div key={key} className="product__color" style={{backgroundColor: `${e}`}}></div>)}
              </div>
              <h1 className="product__price">&euro; {data.getProduct.price.toFixed(2)}</h1>
              <select onChange={(e) => setSize(e.target.value)} value={size} style={{marginBottom: '1rem'}} className="form-control product__form__item" required>
                <option disabled value="">Choose size</option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              <button className="btn-1 product__form__item" onClick={() => AddProduct()}>Add to basket</button>
            </div>
          </Fragment>
          :
          <p className="col-12">Product not found.</p>
        }
      </div>
    </Fragment>
  );
};

export default Product;