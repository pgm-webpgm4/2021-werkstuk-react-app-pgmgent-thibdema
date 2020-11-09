import React, { Fragment } from 'react';
import {Link, NavLink} from 'react-router-dom';

import * as Routes from '../../routes';
import SearchBar from './searchBar';

const Header = () => {
  
  return(
    <header className="header animate__animated animate__fadeInDown">
      <div className="row1">
        <div className="container row">
          <div className="col-md-4 col-12">
            <Link to={Routes.Faq}><span>Hulp</span> en klantenservice</Link>
          </div>
          <div className="col-md-4 col-12 text-center">
            <Link to={Routes.Faq}><span>Gratis</span> verzending en retour</Link>
          </div>
          <div className="col-md-4 col-12 text-right">
            <Link to={Routes.Faq}><span>21 dagen</span> gratis retourrecht</Link>
          </div>
        </div>
      </div>
      <div className="row2">
        <div className="container row">
          <nav className="header__audience col-md-4 col-12">
            <Link to="/audience/Men">Men</Link>
            <Link to="/audience/Women">Women</Link>
            <Link to="/audience/Kids">Kids</Link>
          </nav>
          <Link to={Routes.Home} className="logo col-md-4 col-12">Clothing Store</Link>
          <div className="header__icons text-right col-md-4 col-12">
            <NavLink to={Routes.Basket} activeClassName="selected">Winkelmand</NavLink>
            {(JSON.parse(localStorage.getItem('admin')) === true) &&
              <NavLink to={Routes.AdminPanel} activeClassName="selected">Admin</NavLink> 
            }
            {(!localStorage.token) ?
              <Fragment>
                <NavLink to={Routes.Login} activeClassName="selected">login</NavLink>
                <NavLink to={Routes.Register} activeClassName="selected">register</NavLink>
              </Fragment>
              :
              <Link to={Routes.Logout}>Logout</Link>
            }
          </div>
        </div>
      </div>
      <div className="row3">
        <div className="container row">
          <nav className="header__categories col-md-8 col-12">
            <NavLink to="/category/Tshirts" activeClassName="selected">T-shirts</NavLink>
            <NavLink to="/category/Shirts" activeClassName="selected">Shirts</NavLink>
            <NavLink to="/category/Sweaters" activeClassName="selected">Sweaters</NavLink>
            <NavLink to="/category/Pants" activeClassName="selected">Pants</NavLink>
            <NavLink to="/category/Underpants" activeClassName="selected">Underpants</NavLink>
            <NavLink to="/category/Socks" activeClassName="selected">Socks</NavLink>
            <NavLink to="/category/Bags" activeClassName="selected">Bags</NavLink>
            <NavLink to="/category/Shoes" activeClassName="selected">Shoes</NavLink>
            <NavLink to="/category/Hats" activeClassName="selected">Hats</NavLink>
          </nav>
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;