import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import UserApi from '../../api/users/services';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const saveUser = async body => {
    const res = await UserApi.add({ body });
    console.log(res);
    if (res.status === 200) window.location.href = '/';
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const { user } = userCredential;
        saveUser({
          credential: {
            accessToken: user.accessToken,
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

        setEmail('');
        setPassword('');
      })
      .catch(error => {
        const { code, message } = error;
        console.log('An error has occured: ', code, message);
      });
  };

  return (
    <div>
      <h1>Register</h1>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
