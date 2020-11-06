import React, {} from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import * as Routes from './routes';
import * as Pages from './pages';

import './app.scss';

console.log('');

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect from="/home" to={Routes.Home} />
          <Route path={Routes.AdminDeleteProduct}>
            <Pages.AdminDeleteProduct />
          </Route>
          <Route path={Routes.AdminEditProduct}>
            <Pages.AdminEditProduct />
          </Route>
          <Route path={Routes.AdminAddProduct}>
            <Pages.AdminAddProduct />
         </Route>
          <Route path={Routes.AdminRegister}>
            <Pages.AdminRegister />
          </Route>
          <Route path={Routes.AdminLogin}>
            <Pages.AdminLogin />
          </Route>
          <Route path={Routes.Audience}>
            <Pages.Audience />
          </Route>
          <Route path={Routes.Allcategories}>
            <Pages.Categories />
          </Route>
          <Route path={Routes.Category}>
            <Pages.Category />
          </Route>
          <Route path={Routes.AllProducts}>
            <Pages.AllProducts />
          </Route>
          <Route path={Routes.Product}>
            <Pages.Product />
          </Route>
          <Route path={Routes.Error}>
            <Pages.Error />
          </Route>
          <Route path={Routes.Home}>
            <Pages.Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;