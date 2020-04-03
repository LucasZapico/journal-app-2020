import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

import Navigation from './components/Navigation';
import Landing from './components/Landing';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import {
  useSelectedEntryValue,
  useAuthValue,
  useFirebaseValue,
  FirebaseContext,
} from './context/';
import FeatureBar from './components/FeatureBar';
import ListEntries from './components/ListEntries';
import SignInPage from './components/SignIn';

const App = () => {
  const { currentUser, setCurrentUser } = useAuthValue();
  const firebase = useFirebaseValue(FirebaseContext);
  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      user ? setCurrentUser(user) : setCurrentUser(null);
    });
  });
  return (
    <Router>
      {/* <Navigation authUser={currentUser} /> */}

      <div className="app-wrap">
        {currentUser ? (
          <>
            <Sidebar />
            <Route
              path={ROUTES.ALL_ENTRIES}
              component={ListEntries}
            />
            <Route exact path={ROUTES.HOME} component={Home} />
          </>
        ) : (
          <>
            <Route path={ROUTES.LANDING} component={Landing} />
            <Route
              exact
              path={ROUTES.SIGN_IN}
              component={SignInPage}
            />
          </>
        )}
      </div>
    </Router>
  );
};
export default App;
