import React from "react";
import { useHistory } from "react-router";

import "../styles/pages/Features.css";
import Layout from "../modules/layouts/Layout";

function Features() {
  const history = useHistory();

  return (
    <Layout title="Features | NEOX">
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <section className="topCard">
          <div>
            <h3>NEOX FEATURES</h3>
            <h1>One platform for collaboration</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
              doloremque sint, nostrum pariatur laudantium atque blanditiis.
              Voluptatum ea quia excepturi!
            </p>
            <div>
              <button
                className="GetStarted__button"
                onClick={() => {
                  history.replace("/");
                }}
              >
                Get started
              </button>
            </div>
          </div>
          <div className="topCard__Creator">
            <div className="topCard__Creator_quote">
              <q>
                <em>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Maxime hic impedit laudantium quae expedita libero quod
                  laboriosam ipsam magni corporis!
                </em>
              </q>
              <em>
                <mark>Founder of NEOX</mark>
              </em>
            </div>
            <img src="./irere.jpg" alt="NEOX" />
          </div>
        </section>
        <section>
          <div>
            <h2>Learn more with your preferences</h2>
            <p>
              Stay on the same page and study, track your learning faster by
              bringing all of your people into one place.
            </p>
            <div className="features__cards">
              <div className="feature__card">
                <b>Tracking</b>
                <p>
                  Track your learning progress and see how you are doing. also
                  see how your friends are doing. and can get an overviews of
                  your progress.
                </p>
              </div>
              <div className="feature__card">
                <b>Languages</b>
                <p>
                  Choose your language and you'll be able to see what you're
                  learning in your native language.
                </p>
              </div>
              <div className="feature__card">
                <b>Forum</b>
                <p>
                  Discuss your learning with other people and get help from
                  experts.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div>
            <h2>For any topic of interest</h2>
            <p>
              Wiomi is a platform for you to learn anything you want. You can
              choose from a wide range of topics and languages.
            </p>
            <div className="features__cards">
              <div className="feature__card">
                <b>Follow topics</b>
                <p>
                  Follow topics you want to learn and you'll be able to see what
                  you're learning in your native language.
                </p>
              </div>
              <div className="feature__card">
                <b>Topic news</b>
                <p>
                  Get updates on the latest news and articles about the topics
                  you follow.
                </p>
              </div>
              <div className="feature__card">
                <b>Public and Private topics</b>
                <p>
                  Create public and private topics to share your knowledge with
                  others.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <hr style={{ color: "#f4ede4" }} />
          <footer>
            <div></div>
            <div style={{ fontSize: "15px", textAlign: "center" }}>
              &copy; <span id="year"></span> NEOX Inc, All rights reserved.
              Various trademarks held by their respective owners.
            </div>
          </footer>
        </section>
      </div>
    </Layout>
  );
}

export default Features;
