import React, {useState, useEffect} from 'react';
import { gql, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import * as Routes from '../routes';
import { ContentLoader } from '../components';
import { useError } from '../hooks';

const REGISTER = gql`
  mutation register($email: String!, $password: String!) {
    register(user: { email: $email, password: $password }) {
      id
    }
  }
`;

const Register = () => {
  const [handleGqlError] = useError();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { loading, error, data }] = useMutation(REGISTER, {
    onError: handleGqlError
  });
  const [redirecter, setRedirecter] = useState('');

  useEffect(() => {
    if (loading) return(<ContentLoader />);
    if (error) console.log(error.message);
    if(data) {
      setRedirecter(Routes.Login);
    }
  }, [data ,loading, error]);

  return(
    <div className="register container d-flex justify-content-center">
      {(!!redirecter) ? <Redirect to={redirecter} /> : '' }
      <form className="col-md-6 col-12" onSubmit={(e) => { 
          e.preventDefault();
          register({ variables: { email: email, password: password } });
        }}>
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input className="form-control" id="email" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" id="password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
        </div>
        {(error) && <p style={{color: 'red'}}>{error.message}</p>}
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;