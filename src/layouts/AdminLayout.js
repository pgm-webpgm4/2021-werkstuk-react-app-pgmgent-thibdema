import React, { Fragment, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import { Footer, Header } from '../components';

const CHECK_ADMIN = gql`
  query checkAdmin($id: ID) {
    checkAdmin(id: $id) {
      admin
    }
  }
`;

const AdminLayout = ({children}) => {
  const userId = localStorage.getItem('userId');
  const {loading, errors, data} = useQuery(CHECK_ADMIN, {
    variables: {id: userId}
  });

  if(loading) return(<p>Loading ...</p>);
  if(!!errors) console.log(errors);

  if(data) {
    if(userId == null || data.checkAdmin.admin !== true || data.checkAdmin == null) {
      localStorage.setItem('admin', false);
      return (<Redirect to="/error/403" />);
    }
  }


  return(
    <Fragment>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </Fragment>
  );
};

export default AdminLayout;