import React, { Component } from "react";
import {
  Footer, toast, ToastContainer
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { withNamespaces } from 'react-i18next';
import Routes from "./Routes";
import Header from './components/common/header';
import SignInModal from './components/modals/SignIn';
import firebase from 'firebase/app'
import 'firebase/auth'
import base, { firebaseApp } from './base'
import { DateTime } from "luxon";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInMode: 1,
      passwordIndicator: '',
      credential: {
        email: "",
        password: "",
        act: false
      },
      users: {},
      collapseID: "",
      modal: false,
      currentUser: null,
      isConnected: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (lng) => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      signInModal: 1
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        base.fetch(`users/${user.uid}`, {
          context: this,
          then(data) {
            if (data && data.id) {
              this.setState(
                {
                  currentUser: data,
                  isConnected: user.uid ? true : false,
                  modal: false
                })
            } else {
              if (["facebook.com", "google.com"].includes(user.providerData[0].providerId)) {
                this.handleAuth({ user })
              }
              else {
                let currentUser = {
                  id: user.uid,
                  email: user.email,
                  photoURL: 'http://placehold.it/50x50',
                  phone: "",
                  displayName: "",
                  emailVerified: false,
                  createAt: DateTime.local().setLocale('en-gb').toLocaleString(),
                  lastUpdate: "",
                  isConnected: true
                }
                this.setState({
                  currentUser: currentUser,
                  isConnected: user.uid ? true : false,
                  modal: false
                });
              }
            }
          }
        });
      }
    });
  }

  handleAuth = async authData => {

    let user = {
      id: authData.user.uid,
      photoURL: authData.user.photoURL ? authData.user.photoURL : 'http://placehold.it/50x50',
      phone: authData.user.phoneNumber,
      displayName: authData.user.displayName,
      emailVerified: authData.user.emailVerified,
      email: authData.user.email,
      createAt: DateTime.local().setLocale('en-gb').toLocaleString(),
      lastUpdate: "",
      isConnected: true
    };
    await base.post(`/users/${authData.user.uid}`, {
      data: user
    })
    this.setState({
      currentUser: user,
      isConnected: authData.user.uid ? true : false,
      modal: false,
      SignInModal: 1
    });
  }

  authenticate = (provider) => {
    let authProvider = null;
    if (["facebook", "google"].includes(provider)) {
      if (provider === 'facebook') {
        authProvider = new firebase.auth.FacebookAuthProvider()
      }
      if (provider === 'google') {
        authProvider = new firebase.auth.GoogleAuthProvider()
      }
      firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.handleAuth)
    }
    else {
      const { email, password } = this.state.credential;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              let currentUser = {
                id: user.uid,
                email: user.email,
                photoURL: 'http://placehold.it/50x50',
                phone: "",
                displayName: "",
                emailVerified: user.emailVerified,
                createAt: DateTime.local().setLocale('en-gb').toLocaleString(),
                lastUpdate: "",
                isConnected: true
              }
              base.post(`/users/${currentUser.id}`, {
                data: currentUser
              })
              this.setState({
                currentUser: currentUser,
                isConnected: user.uid ? true : false,
                modal: false, 
                SignInModal: 1
              });
            }
          });
        })
        .catch((error) => {
          let errorMessage = error.message;
          this.renderErrorToast(errorMessage);
        });
    }

  }

  logout = async () => {
    await firebase.auth().signOut();
    let user = this.state.currentUser;
    user.isConnected = false;
    base.update(`/users/${user.id}`, {
      data: user
    })
    this.setState({
      currentUser: null,
      signInMode: 1,
      currentUser: user
    })
    window.location.reload();
  }

  handleCredentialChange = (event) => {
    let credential = this.state.credential;
    const field = event.target.name;
    credential[field] = event.target.value;
    let passwordIndicator = '';
    if (field === 'password') {
      var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      if (event.target.value) {
        if (strongRegex.test(event.target.value)) {
          passwordIndicator = 'success';
        } else if (mediumRegex.test(event.target.value)) {
          passwordIndicator = 'warning';
        }
        else {
          passwordIndicator = 'danger';
        }
      }
      else {
        passwordIndicator = '';
      }
    }

    this.setState({ credential, passwordIndicator: passwordIndicator })
  }

  handleCredentialCheck = () => {
    let credential = this.state.credential;
    credential.act = !this.state.credential.act;
    this.setState({ credential })
  }

  buildValidationMessage = (type) => {
    if (type === "email") { return <h5>This email is not valid</h5>; }
    else {
      return <div>
        <h5>The password must follow the rules bellow : </h5>
        <ul>
          <li>The string must contain at least 1 lowercase alphabetical character.</li>
          <li>The string must contain at least 1 uppercase alphabetical character.</li>
          <li>The string must contain at least 1 numeric character.</li>
          <li>The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict.</li>
          <li>The string must be eight characters or longer.</li>
        </ul>
      </div>;
    }
  }

  isCredentialValid = () => {
    let message = null;
    var emailRegex = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    if (!this.state.credential.act) { message = <h5>You have to accept the terms to continue !</h5> }
    else
      if (!emailRegex.test(this.state.credential.email)) {
        message = this.buildValidationMessage("email");
      } else {
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if (!mediumRegex.test(this.state.credential.password)) {
          message = this.buildValidationMessage("password");
        }
      }
    if (message) {
      this.renderErrorToast(message);
      return false
    }
    return true;
  }

  renderErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      closeButton: true,
    });
  }

  renderSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      closeButton: true,
    });
  }

  renderInfoToast = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 5000,
      closeButton: true,
    });
  }

  reset = () => {
    let emailRegex = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    if (!emailRegex.test(this.state.credential.email)) {
      let message = this.buildValidationMessage("email");
      this.renderErrorToast(message);
    } else {
      let auth = firebase.auth();
      auth.sendPasswordResetEmail(this.state.credential.email).then(() => {
        this.renderInfoToast("An email has been sent to your Email !")
      }).catch((error) => {
        this.renderErrorToast(error.message);
      });
    }

  }

  register = () => {
    if (this.isCredentialValid()) {
      const { email, password } = this.state.credential;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.renderSuccessToast("You are now registered :)");
          this.setState({ SignInModal: 1 });
        })
        .catch((error) => {
          var errorMessage = error.message;
          this.renderErrorToast(errorMessage);
        });
    }
  }

  switchMode = (mode) => {
    this.setState({ signInMode: mode });
  }

  render() {
    return (
      <Router>
        <div className="flyout">
          <Header
            handleChange={this.handleChange}
            signIn={this.toggle}
            logout={this.logout}
            currentUser={this.state.currentUser}
          />
          <main style={{ marginTop: "4rem" }}>
            <SignInModal
              modal={this.state.modal}
              toggle={this.toggle}
              authenticate={this.authenticate}
              credential={this.state.credential}
              handleCredentialChange={this.handleCredentialChange}
              handleCredentialCheck={this.handleCredentialCheck}
              register={this.register}
              reset={this.reset}
              switchMode={this.switchMode}
              signInMode={this.state.signInMode}
              passwordIndicator={this.state.passwordIndicator}
            />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              closeButton={false}
              newestOnTop={false}
              rtl={false}>
            </ToastContainer>
            <Routes user={this.state.currentUser} />
          </main>

          <Footer color="indigo">
            <p className="footer-copyright mb-0 py-3 text-center">
              <a href="/"> letsdeal.com </a>
            </p>
          </Footer>
        </div>
      </Router>
    );
  }
}
export default withNamespaces('translation')(App);