import React, { useState } from 'react';
import { useFirebaseValue, FirebaseContext } from '../context';
import { Link, useHistory } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

import * as ROUTES from '../constants/routes';

const SignInPage = () => {
  return (
    <div className="margin--top__l flex-container flex--justify__center flex-align__center ">
      <div className="sign-in  padding--all__l">
        <h2>Sign In</h2>
        <div className="neu-pos padding-md">
          <SignInForm />
          <p>
            To checkout the app sign in using <br></br>
            <strong>
              email: luc.testing.prime@protonmail.com
            </strong>{' '}
            <br></br>
            <strong>password: test1234</strong>{' '}
          </p>
          <SocialLogins />
        </div>
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
    <form onSubmit={onSubmit} className=" margin--top__m">
      <input
        className="input "
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

      <button type="submit" className="btn btn__100w margin--top__m">
        Sign In
      </button>
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
    <div className="margin--top__l">
      <h4>Social Logins</h4>
      <button
        onClick={socialSignOn}
        role="button"
        className="btn btn__100w margin--top__m"
      >
        Sign In with Google <FaGoogle />
      </button>
    </div>
  );
};

export default SignInPage;

export { SignInForm, SocialLogins };
