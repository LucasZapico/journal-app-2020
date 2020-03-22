import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

import Navigation from './components/Navigation';
import Landing from './components/Landing';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import { useSelectedEntryValue } from './context/';
import FeatureBar from './components/FeatureBar';
import ListEntries from './components/ListEntries';

const App = () => {
  return (
    <Router>
      {/* <Navigation authUser={currentUser} /> */}
      <div id="app-wrap">
        <Sidebar />
        <FeatureBar />
        <Route path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.ALL_ENTRIES} component={ListEntries} />
        <Route exact path={ROUTES.HOME} component={Home} />
      </div>
    </Router>
  );
};
export default App;
