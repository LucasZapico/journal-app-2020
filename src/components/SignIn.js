import React, { useState } from 'react';
import { useFirebaseValue, FirebaseContext } from '../context';
import { Link, useHistory } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

import * as ROUTES from '../constants/routes';

const SignInPage = () => {
  return (
    <div className="container">
      <h2>Admin SignIn</h2>
      <div className="neu-pos padding-md">
        <SignInForm />
        <SocialLogins />
      </div>
    </div>
  );
};

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInForm = () => {
  const firebase = useFirebaseValue(FirebaseContext);
  let history = useHistory();
  const [user, setUser] = useState(INITIAL_STATE);

  const onSubmit = event => {
    event.preventDefault();
    console.log('sign in', firebase);

    firebase
      .doSignInWithEmailAndPassword(user.email, user.password)
      .then(authUser => {
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setUser({ error: error });
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('errorcode', errorCode);
        console.log('errorMessage', errorMessage);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="input"
        name="email"
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        type="text"
        placeholder="Email Address"
      />
      <input
        className="input"
        name="password"
        value={user.password}
        onChange={e => setUser({ ...user, password: e.target.value })}
        type="password"
        placeholder="Password"
      />

      <button type="submit">Sign In</button>
      {user.error && <p>{user.error.message}</p>}
    </form>
  );
};

const SocialLogins = () => {
  const firebase = useFirebaseValue(FirebaseContext);
  let history = useHistory();

  const socialSignOn = event => {
    event.preventDefault();
    console.log('signOn ran');
    firebase
      .doSignInWithGoogle()
      .then(authUser => {
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('errorcode', errorCode);
        console.log('errorMessage', errorMessage);
      });
  };

  return (
    <div>
      <h6>Social Logins</h6>
      <button onClick={socialSignOn} role="button">
        Sign In with Google <FaGoogle />
      </button>
    </div>
  );
};

export default SignInPage;

export { SignInForm, SocialLogins };
