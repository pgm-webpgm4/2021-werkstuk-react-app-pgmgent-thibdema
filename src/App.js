import React, {} from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import * as Routes from './routes';
import * as Pages from './pages';
import { BasicLayout, AdminLayout } from './layouts';
import { RouteWithLayout } from './utilities';

import './app.scss';

const App = () => {
  return (
    <div className="App">
      <Router basename="/">
        <Switch>
          <RouteWithLayout exact path={Routes.AdminDeleteProduct} layout={ AdminLayout } component={ Pages.AdminDeleteProduct }/>
          <RouteWithLayout exact path={Routes.AdminEditProduct} layout={ AdminLayout } component={ Pages.AdminEditProduct }/>
          <RouteWithLayout exact path={Routes.AdminAddProduct} layout={ AdminLayout } component={ Pages.AdminAddProduct }/>
          <RouteWithLayout path={Routes.AdminPanel} layout={ AdminLayout } component={ Pages.AdminPanel }/>

          <RouteWithLayout exact path={Routes.Register} layout={ BasicLayout } component={ Pages.Register }/>
          <RouteWithLayout exact path={Routes.Login} layout={ BasicLayout } component={ Pages.Login }/>
          <RouteWithLayout exact path={Routes.Logout} layout={ BasicLayout } component={ Pages.Logout }/>
          <RouteWithLayout exact path={Routes.Audience} layout={ BasicLayout } component={ Pages.Audience }/>
          <RouteWithLayout exact path={Routes.Allcategories} layout={ BasicLayout } component={ Pages.Categories }/>
          <RouteWithLayout exact path={Routes.Category} layout={ BasicLayout } component={ Pages.Category }/>
          <RouteWithLayout exact path={Routes.AllProducts} layout={ BasicLayout } component={ Pages.AllProducts }/>
          <RouteWithLayout exact path={Routes.Product} layout={ BasicLayout } component={ Pages.Product }/>
          <RouteWithLayout exact path={Routes.Basket} layout={ BasicLayout } component={ Pages.Basket }/>
          <RouteWithLayout exact path={Routes.Search} layout={ BasicLayout } component={ Pages.Search }/>
          <RouteWithLayout exact path={Routes.Faq} layout={ BasicLayout } component={ Pages.Faq }/>
          <RouteWithLayout exact path={Routes.Error} layout={ BasicLayout } component={ Pages.Error }/>
          <RouteWithLayout exact path={Routes.Home} layout={ BasicLayout } component={ Pages.Home }/>

          <Redirect exact from="/" to={Routes.Home} />
          <Redirect from="*" to={Routes.Error} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;