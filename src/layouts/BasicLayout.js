import React, { Fragment } from 'react';
import { Footer, Header, NewProduct } from '../components';

const BasicLayout = ({children}) => {
  return(
    <Fragment>
      <NewProduct />
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </Fragment>
  );
};

export default BasicLayout;