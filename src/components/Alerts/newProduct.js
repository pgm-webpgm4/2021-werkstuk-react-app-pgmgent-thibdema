import React, { Fragment, useState } from 'react';
import {gql, useSubscription} from '@apollo/client';
import {Redirect} from 'react-router-dom';

const NEW_PRODUCT_SUBSCRIPTION = gql`
  subscription productAdded {
    productAdded {
      id,
      title,
      description,
      price,
      images{url, alt}
    }
  }
`;

const NewProduct = () => {
  const [visible, setVisible] = useState('animate__fadeInUp');
  const [redirecter, setRedirecter] = useState();
  const {data} = useSubscription(NEW_PRODUCT_SUBSCRIPTION);

  return(
    <Fragment>
    {!!redirecter && <Redirect to={redirecter} />}
    {
      (!!data) &&
        <div style={{position: 'fixed', bottom: '2rem', right: '2rem',}}>
          <div className={`toast show animate__animated ${visible}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <svg onClick={() => setRedirecter(`/product/${data.productAdded.id}`)} className="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                <rect width="100%" height="100%" fill="#007aff" />
              </svg>
              <strong onClick={() => setRedirecter(`/product/${data.productAdded.id}`)}  className="mr-auto">New product added</strong>
              <small onClick={() => setRedirecter(`/product/${data.productAdded.id}`)}  className="text-muted" style={{marginLeft: '1rem'}}>just now</small>
              <button type="button" onClick={() => setVisible('animate__fadeOutDown')} className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div onClick={() => setRedirecter(`/product/${data.productAdded.id}`)}  className="toast-body">
               {data.productAdded.title}
            </div>
          </div>
        </div>
    }
    </Fragment>
  );
};

export default NewProduct;