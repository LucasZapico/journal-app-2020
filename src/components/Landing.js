import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing grid page">
      <div className="hero ">
        <img
          className="hero--img"
          src="img/landing-page.png"
          alt="hero flat mount graphic"
        ></img>
        <div className="margin--top__l margin--left__m width--75 hero-copy">
          <h1 className="type-color--display">Meet Mark'ie</h1>
          <h3>A syntax focused Markdown journal</h3>
          <Link exact to="/sign-in">
            <button>Sign In</button>
          </Link>
        </div>
      </div>
      <section className="bg-color-sec padding--top__l">
        <div className="width--66">
          <h3 className="type-color--display__alt">
            About this project
          </h3>
          <p>
            A markdown and syntax workflow focused journal app build
            with React hooks and Firebase.
          </p>
          <h5 className="type-color--display__alt">
            A Note from the Developer/Product Designer
          </h5>
          <p>
            This note is put forward in the vain hope that this
            project will be measured in the vein that is was built.
            Though in essence this is practice project, I try and
            "practice how I play", and that means within a scope try
            and deliver a complete product.
          </p>
        </div>
      </section>
      <section>
        <div className="width--66">
          <div>
            <h3>The Challenge</h3>
            <p>
              At a 10,000 km heigh level, this project attempts to
              facilitate the content creation process and dynamic
              organizing.
            </p>
            <h5>Fundemental Premises</h5>
            <p>
              1. We assume the methods which a use will want to order
              content is a dynamic process and therefore the process
              to order content should be too.
            </p>

            <p></p>
          </div>
        </div>
      </section>
      <div className="bg-color-a2 ">
        <img
          className="display-char--img"
          src="img/order-lady-mountain.png"
          alt="order lady"
        ></img>
      </div>
      <section className="bg-color-a2">
        <div>
          <h3>Features</h3>

          <div className="flex-container flex--justify__space-between">
            <div className="padding--right">
              <h5>Define Categories Via Syntax</h5>
              <p>
                Use <code>__c__Some Category__c__</code> to apply
                categories to a entry.
              </p>
            </div>
            <div className="padding--hor">
              <h5>Auto Save Changes</h5>
              <p>Changes are saved as you write.</p>
            </div>
            <div className="padding--left">
              <h5>Find Entries Easily</h5>
              <p>
                Search for entries via logical operators on categories
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
