import React, { Fragment } from "react";
import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Fragment>
      <nav className={styles.brandNavbar}>
        <div width="252">
          <img
            alt="brand-logo"
            className={styles.brandLogo}
            width="252"
            src="https://svgshare.com/i/ErM.svg"
          />
        </div>
        <div className={styles.Links}>
          <Link className={styles.routerLinks} to="/">
            Home
          </Link>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;