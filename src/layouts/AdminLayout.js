import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import { Footer, Header, ContentLoader } from '../components';
import * as Routes from '../routes';
import { useError } from '../hooks';

const CHECK_ADMIN = gql`
  query checkAdmin($id: ID) {
    checkAdmin(id: $id) {
      admin
    }
  }
`;

const AdminLayout = ({children}) => {
  const [handleGqlError] = useError();
  const userId = localStorage.getItem('userId');
  const {loading, errors, data} = useQuery(CHECK_ADMIN, {
    onError: handleGqlError,
    variables: {id: userId}
  });

  if(loading) return(<ContentLoader />);
  if(!!errors) console.log(errors);

  if(data) {
    if(userId == null || data.checkAdmin.admin !== true || data.checkAdmin == null) {
      localStorage.setItem('admin', false);
      return (<Redirect to={Routes.Login} />);
    }
  }

  return(
    <Fragment>
      {!!data && !errors && 
        <Fragment>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Fragment>
      }
    </Fragment>
  );
};

export default AdminLayout;