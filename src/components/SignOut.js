import React from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import {
  useFirebaseValue,
  FirebaseContext,
  FirebaseProvider,
} from '../context';

const SignOutButton = () => {
  const firebase = useFirebaseValue(FirebaseContext);
  let history = useHistory();
  const signOut = () => {
    firebase.doSignOut();

    history.push(ROUTES.LANDING);
  };
  return (
    <button
      className="btn btn--secondary"
      type="button"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
