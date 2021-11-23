import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import Home from './pages/Home';
import Secret from './pages/protected/Secret';
import ProtectedRoute from './utils/ProtectedRoutes';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './configs/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { saveUser } from './redux/slice/authSlice';
import UserApi from './api/users/services';

import './assets/styles/styles.scss';

function App() {
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        try {
          UserApi.get({ uid: user.uid }).then(({ status, data }) => {
            if (status === 200)
              return dispatch(saveUser({ ...data, refreshToken: user.refreshToken }));
            return dispatch(saveUser(undefined));
          });
        } catch (error) {
          return dispatch(saveUser(undefined));
        }
      }
      return dispatch(saveUser(undefined));
    });
  }, [auth, dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/protected" component={Secret} />
        <ProtectedRoute exact path="/reset" component={Reset} />
      </Switch>
    </Router>
  );
}

export default App;
