import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link, useHistory } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useSelector } from 'react-redux';

import { Container, Form, Button, Image } from 'react-bootstrap';
import TopNavigator from '../../components/top-navigator';

import FormValidation from '../../utils/form-validation';

const Login = () => {
  const auth = getAuth();
  const user = useSelector(state => state.auth.userInfo);
  const history = useHistory();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });
    if (!!errors[field]) setErrors({ ...errors, [field]: null });
  };

  const findFormErrors = () => {
    const { email, password } = form;
    const newErrors = {};
    if (!email || email === '') newErrors.email = 'Cannot be blank!';
    else if (!FormValidation.email(email)) newErrors.email = 'Invalid email!';
    if (!password || password === '') newErrors.password = 'Cannot be blank!';

    return newErrors;
  };

  const formValidation = () => {
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleLogin = event => {
    event.preventDefault();
    const isValid = formValidation();
    if (!isValid) return;

    const { email, password } = form;
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        if (userCredential) history.replace('/');
      })
      .catch(error => {
        const { message: msg } = error;
        if (msg.search('user-not-found') > 0) setErrors({ email: 'Email not registered!' });
        else if (msg.search('wrong-password'))
          setErrors({ email: ' ', password: 'Wrong email or password!' });
        else if (msg.search('too-many-requests'))
          setErrors({ email: ' ', password: 'Too many requests, please try later' });
      });
  };

  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="bg-primary" style={{ height: '100vh' }}>
      <TopNavigator />
      <Container className="bg-primary">
        <Image src={require('../../assets/images/undraw_Working_late_re_0c3y.svg').default} fluid />
      </Container>
      <div
        className="top-rounded border bg-white w-100"
        style={{ position: 'absolute', bottom: 0 }}
      >
        <Container className="py-5">
          <Form className="px-4" onSubmit={e => handleLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter email"
                className="rounded-pill"
                autoComplete="off"
                onChange={e => setField('email', e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                className="rounded-pill"
                onChange={e => setField('password', e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <div className="pt-4">
              <Button variant="primary" className="rounded-pill w-100 mb-3" type="submit">
                Login
              </Button>
              <Link to="/register">
                <Button variant="outline-primary" className="rounded-pill w-100" type="button">
                  Register
                </Button>
              </Link>
            </div>
          </Form>
          <div className="text-center pt-4">or</div>
          <div className="d-grid gap-2 pt-4 px-4">
            <Button
              variant="outline-primary"
              className="rounded-pill"
              type="button"
              // onClick={() => loginWithGoogle()}
            >
              SignIn with google
            </Button>
            <Button variant="outline-primary" className="rounded-pill" type="buttom">
              SignIn with facebook
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Login;
