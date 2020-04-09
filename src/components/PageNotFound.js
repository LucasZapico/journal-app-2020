import React from 'react';

const PageNotFound = () => {
  return (
    <div className="_404 page">
      <div>
        <h1>404</h1>
        <h3>Whoops, page not found!</h3>
        <a className="margin--top_m" href="./landing">
          Head on Home
        </a>
      </div>
      <div>
        <img
          className="_404--img"
          src="img/order-lady-mountain.png"
          alt="order lady"
        ></img>
      </div>
    </div>
  );
};

export default PageNotFound;
