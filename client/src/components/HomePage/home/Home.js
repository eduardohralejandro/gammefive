import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.scss";
import Helmet from "react-helmet";
import { Link as LinkScroll, Element } from "react-scroll";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <div className={styles.homeHeader}>
          <img
            alt="machine-header"
            className={styles.machineImg}
            src="https://svgshare.com/i/Erx.svg"
          />
          <div>
            <header className={styles.homeTitleHeader}>
              <h1 className={styles.text}>Welcome to Gammefive</h1>
              <p>
                gammefive is a personal game side project which allow users to
                play <br /> arcade-brain games. This application is still in
                development. Have fun!{" "}
              </p>
              <LinkScroll
                className={styles.btnHeader}
                to="games"
                spy={true}
                smooth={true}
                duration={1000}
              >
                <button className={styles.btnPlayGameHeader}>
                  Scroll to play
                </button>
              </LinkScroll>
            </header>
          </div>
        </div>
        <Helmet>
          <style>
            {
              "body {  background: url(https://svgshare.com/i/Eox.svg) no-repeat center fixed; background-size: cover; min-height: -webkit-fill-available;"
            }
          </style>
        </Helmet>

        <div className={styles.boxHomeGamelist}>
          <span className={styles.BoxItemsGamelist}>
            <div
              style={{
                backgroundImage:
                  "url(https://i.ibb.co/SvD2BKq/Screenshot-2019-09-08-at-16-34-21.png)"
              }}
              className={styles.gamesHomeList}
            />
            <Link className={styles.routerLinks} to="/start">
              <button className={styles.btnPlayGame}> Start to play </button>
            </Link>
          </span>
          <span>
            <div
              style={{
                backgroundImage: "url(https://i.ibb.co/PZRkBMG/sample.png)"
              }}
              className={styles.gamesHomeList}
            />
            <Link className={styles.routerLinks} to="/spaceinvader">
              <button className={styles.btnPlayGame}>Start to play</button>
            </Link>
          </span>
        </div>
        <Element name="games" />
      </Fragment>
    );
  }
}

export default Home;
