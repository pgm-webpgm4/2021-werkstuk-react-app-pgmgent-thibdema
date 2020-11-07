import React, {useState, useEffect} from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

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
  const [login, {loading, errors, data}] = useLazyQuery(LOGIN);


  useEffect(() => {
    if (loading) return(<p>Loading ...</p>);
    if (errors) console.log(errors);
  
    if(!!data) {
      window.localStorage.setItem('token', data.login.token);
      window.localStorage.setItem('userId', data.login.userId);
      window.localStorage.setItem('admin', data.login.admin);
      setRedirecter(Routes.Home);
    }
  }, [data]);

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
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;