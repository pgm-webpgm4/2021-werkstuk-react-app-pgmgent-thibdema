import React, {useState, useEffect} from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Redirect, Link } from 'react-router-dom';

import * as Routes from '../routes';

const LOGIN = gql`
  query login($email: String, $password: String) {
    login(user: { email: $email, password: $password }) {
      userId, token, admin
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirecter, setRedirecter] = useState('');
  const [login, {loading, data, error}] = useLazyQuery(LOGIN);


  useEffect(() => {  
    if(!!data) {
      window.localStorage.setItem('token', data.login.token);
      window.localStorage.setItem('userId', data.login.userId);
      window.localStorage.setItem('admin', data.login.admin);
      setRedirecter(Routes.Home);
    }
  }, [data, loading, error]);

  return(
    <div className="login container d-flex justify-content-center">
      {(!!redirecter) ? <Redirect to={redirecter} /> : '' }
      <form className="col-md-6 col-12" onSubmit={(e) => { 
          e.preventDefault();
          login({ variables: { email: email, password: password } });
        }}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input className="form-control" id="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input placeholder="Password" className="form-control" id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {(error) && <p style={{color: 'red'}}>{error.message}</p>}
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-primary" type="submit">Login</button>
          <Link to={Routes.ForgotPassword}>Forgot password ?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;