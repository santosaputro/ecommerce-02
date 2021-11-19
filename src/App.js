import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import Home from "./pages/Home";
import Secret from "./pages/protected/Secret";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./configs/firebaseConfig";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "./redux/slice/authSlice";

import ProtectedRoute from "./utils/ProtectedRoutes";

function App() {
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const user = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.refreshToken));
      } else {
        dispatch(saveUser(undefined));
      }
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
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            ""
          )}
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/reset">Reset password</Link>
          </li>
          {user ? (
            <li>
              <Link to="/protected">Protected page</Link>
            </li>
          ) : (
            ""
          )}
          {user ? (
            <li>
              <Link
                to="#"
                onClick={() => {
                  signOut(auth)
                    .then((res) => {
                      console.log("user signed out", res);
                    })
                    .catch((error) => {
                      console.log("error", error);
                    });
                }}
              >
                Log out
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>

      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/reset">
          <Reset />
        </Route>

        <ProtectedRoute exact path="/protected" component={Secret} />

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
