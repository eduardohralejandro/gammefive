import React, { Component, Fragment } from "react";
import axios from "axios";
import Helmet from "react-helmet";
import styles from "./contact.module.scss";
class Contact extends Component {
  state = {
    name: "",
    message: "",
    email: "",
    alertMessage: "",
    sucessMessage: ""
  };
  sendData = async e => {
    const { name, email, message } = this.state;

    e.preventDefault();

    const data = {
      name,
      email,
      message
    };

    const testEmail = new RegExp(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
    ).test(email);

    if (name.length < 1 || name.length === 1) {
      this.setState({
        alertMessage: "your name must contain at least two characters"
      });
    } else if (!testEmail) {
      this.setState({ alertMessage: "you must write a valid email" });
    } else {
      await axios
        .post("/api/contact", data)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              sucessMessage:
                "Thanks for your message, I will get back to you soon",
              alertMessage: ""
            });
          }
        })
        .catch(error => {
          console.log("important error", error);
        });
    }
  };
  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <Fragment>
        <Helmet>
          <style>
            {
              "body {  background: url(https://svgshare.com/i/Eox.svg) no-repeat center fixed; background-size: cover; min-height: -webkit-fill-available;"
            }
          </style>
        </Helmet>
        <div>
          <form className={styles.formContact} onSubmit={e => this.sendData(e)}>
            <h1>Hey !</h1>
            <h3>Let's talk'</h3>
            <div className={styles.inputs}>
              <input
                onChange={e => this.handleOnChange(e)}
                name="name"
                type="text"
                placeholder="name"
              />
              <input
                onChange={e => this.handleOnChange(e)}
                name="email"
                type="text"
                placeholder="email"
              />
            </div>
            <div className={styles.textArea}>
              <textarea
                onChange={e => this.handleOnChange(e)}
                name="message"
                type="text"
                placeholder="your message..."
              />
              <button
                className={
                  this.state.alertMessage.length > 0
                    ? styles.btnSubmitError
                    : styles.btnSubmit
                }
              >
                Submit
              </button>
              <p>{this.state.alertMessage}</p>
              <p style={{ color: "#680fd3" }}>{this.state.sucessMessage}</p>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default Contact;
