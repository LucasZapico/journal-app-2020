import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const Navigation = () => {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.ALL_ENTRIES}>All Entries</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
