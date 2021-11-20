import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const user = useSelector(state => state.auth.value);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const { user } = userCredential;
        console.log('Sign in user: ', user);
      })
      .catch(error => {
        const { code, message } = error;
        console.log('An error occured: ', code, message);
      });
  };

  return user ? (
    <Redirect to="/" />
  ) : (
    <div>
      <h1>Login</h1>
      Email:
      <br />
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      Password:
      <br />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;
