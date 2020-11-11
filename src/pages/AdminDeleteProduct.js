import React, { Fragment, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

import * as Routes from '../routes';
import { ContentLoader, } from '../components';
import { useError } from '../hooks';

const DELETE_PRODUCT = gql`
  mutation deleteProduct($ID: ID!) {
    deleteProduct(id: $ID)
  }
`;

const AdminDeleteProduct = () => {
  const [handleGqlError] = useError();
  const {id} = useParams();
  const [register, { loading, error, data }] = useMutation(DELETE_PRODUCT, {
    onError: handleGqlError
  });

  useEffect(() => {
    if (error) console.log(error.message);

  }, [data, loading, error]);

  if(data) console.log(data);

  return(
    <div className="admindeleteproduct container">
      <h1 className="text-center">
        {(!!data && !error) && data.deleteProduct}
        {(!data && !error) && 'Are you sure you want to delete this product ?'}
        {!!error && error.message}
      </h1>
      {loading && <ContentLoader />}
      <div className="d-flex align-items-center justify-content-center">
        {(!data && !error && !loading) ?
          <Fragment>
            <Link to={Routes.AdminPanel}>
              <button className="btn btn-primary">
                No
              </button>
            </Link>
            <button style={{marginLeft: '1rem'}} onClick={() => register({variables: {ID: id}})} className="btn btn-danger">
              Yes
            </button>
          </Fragment>
          :
          <Link to={Routes.AdminPanel}>
            <button className="btn btn-primary">
              Go back to admin panel
            </button>
          </Link>
        }
      </div>

    </div>
  );
};

export default AdminDeleteProduct;