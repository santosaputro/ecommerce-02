import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import UserApi from '../../api/users/services';

import { Container, Form, Button, Image } from 'react-bootstrap';
import TopNavigator from '../../components/top-navigator';
import FormValidation from '../../utils/form-validation';

const Register = () => {
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
    const { email, password, rePassword } = form;
    const newErrors = {};
    // email errors
    if (!email || email === '') newErrors.email = 'Cannot be blank!';
    else if (!FormValidation.email(email)) newErrors.email = 'Invalid email';
    // password errors
    if (!password || password === '') newErrors.password = 'Cannot be blank!';
    // rePassword errors
    if (!rePassword || rePassword === '') newErrors.rePassword = 'Cannot be blank!';
    else if (rePassword !== password) newErrors.rePassword = "Password doesn't match";

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

  const saveUser = async body => {
    const res = await UserApi.add({ body });
    if (res.status === 200) history.replace('/');
  };

  const handleRegister = async event => {
    event.preventDefault();
    const isValid = formValidation();

    if (!isValid) return;
    const { email, password } = form;

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const { user } = userCredential;
        saveUser({
          credential: {
            providerId: user.providerId,
            signInMethod: 'email',
          },
          displayName: email.split('@')[0],
          email,
          emailVerified: false,
          phoneNumber: null,
          photoURL: null,
          providerId: user.providerId,
          uid: user.uid,
        });
      })
      .catch(error => {
        const { message: msg } = error;
        if (msg.search('weak-password') > 0) {
          const stringMsg = msg.split(': ')[1].split(' (')[0];
          const finalMsg = stringMsg.substr(0, 1).toUpperCase + stringMsg.substr(1);
          setErrors({ password: finalMsg });
        } else if (msg.search('email-already-in-use') > 0) {
          setErrors({ email: 'Email already in use' });
        }
      });
  };

  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="bg-primary" style={{ height: '100vh' }}>
      <TopNavigator />
      <Container className="bg-primary">
        <Image src={require('../../assets/images/undraw_Designer_re_5v95.svg').default} fluid />
      </Container>
      <div
        className="top-rounded border bg-white w-100"
        style={{ position: 'absolute', bottom: 0 }}
      >
        <Container className="py-5">
          <Form className="px-4" onSubmit={event => handleRegister(event)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                onChange={e => setField('email', e.target.value)}
                placeholder="Enter email"
                className="rounded-pill"
                autoComplete="off"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                onChange={e => setField('password', e.target.value)}
                placeholder="Password"
                className="rounded-pill"
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRePassword">
              <Form.Control
                type="password"
                onChange={e => setField('rePassword', e.target.value)}
                placeholder="Retype Password"
                className="rounded-pill"
                isInvalid={!!errors.rePassword}
              />
              <Form.Control.Feedback type="invalid">{errors.rePassword}</Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid gap-2 pt-4">
              <Button variant="primary" className="rounded-pill" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default Register;
