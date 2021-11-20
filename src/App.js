import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import Home from './pages/Home';
import Secret from './pages/protected/Secret';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './configs/firebaseConfig';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from './redux/slice/authSlice';
import UserApi from './api/users/services';

import ProtectedRoute from './utils/ProtectedRoutes';

function App() {
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const user = useSelector(state => state.auth.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        try {
          UserApi.get({ uid: user.uid }).then(({ status, data }) => {
            if (status === 200)
              return dispatch(
                saveUser({ ...data, refreshToken: user.refreshToken })
              );
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
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>{' '}
            </>
          ) : (
            ''
          )}

          {user ? (
            <>
              <li>
                <Link to="/protected">Protected page</Link>
              </li>
              <li>
                <Link to="/reset">Reset password</Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => {
                    signOut(auth)
                      .then(res => {
                        console.log('user signed out', res);
                      })
                      .catch(error => {
                        console.log('error', error);
                      });
                  }}
                >
                  Log out
                </Link>
              </li>
            </>
          ) : (
            ''
          )}
        </ul>
      </nav>

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
