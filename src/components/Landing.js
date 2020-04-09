import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing grid page">
      <div className="hero ">
        <div className="margin--top__l margin--left__m width--75 hero-copy">
          <h1 className="type-color--display">Meet Mark'ie</h1>
          <h3>A syntax focused Markdown journal</h3>
          <Link exact to="/sign-in">
            <button>Sign In</button>
          </Link>
        </div>
        <img
          className="hero--img"
          src="img/landing-page.png"
          alt="hero flat mount graphic"
        ></img>
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
      <section className="padding--vert__l">
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

      <section className="bg-color-a2 ">
        <div>
          <h3>Features</h3>

          <div className="card-group margin--top__m ">
            <div className="padding--right card bg-color-sec">
              <h5 className="type-color--display__alt">
                Define Categories Via Syntax
              </h5>
              <p>
                Use <code>__c__Some Category__c__</code> to apply
                categories to a entry.
              </p>
            </div>
            <div className="padding--hor  card bg-color-sec  ">
              <h5 className="type-color--display__alt">
                Auto Save Changes
              </h5>
              <p>Changes are saved as you write.</p>
            </div>
            <div className="padding--left  card bg-color-sec">
              <h5 className="type-color--display__alt">
                Find Entries Easily
              </h5>
              <p>
                Search for entries via logical operators on
                categories.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-color-a2 padding--top__l">
        <img
          className="display-char--img padding--top__m"
          src="img/order-lady-mountain-v1.2.svg"
          alt="order lady"
        ></img>
      </div>
      <footer className="padding--all__l flex-container">
        <div>
          <h5>Cheers</h5>
          <p>
            Thanks for checking out this little app. Mark'ie was built
            A to Z by Lucas Zapico. This includes the comical art
            direction on this landing page. Enjoy!
          </p>
        </div>
        <div>
          <h5>Contact</h5>
          <div className="margin--vert">
            <a href="https://lucaszapico.space/">The Portfolio</a>
          </div>
          <div className="margin--vert">
            <a href="https://www.linkedin.com/in/lucasmmzapico/">
              The LinkedIn
            </a>
          </div>
          <div className="margin--vert">
            <a href="https://github.com/LucasZapico">The Github</a>
          </div>
          <div className="margin--vert">
            <a href="https://codepen.io/LucasZapico">The Codepen</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
