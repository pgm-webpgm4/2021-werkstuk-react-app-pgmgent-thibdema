import React, { Fragment } from 'react';
import { Footer, Header } from '../components';

const BasicLayout = ({children}) => {
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

export default BasicLayout;