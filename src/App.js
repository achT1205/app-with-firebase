import React, { Component } from "react";
import {
  Footer,
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
      users: {},
      collapseID: "",
      modal: false,
      uid: null,
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
      modal: !this.state.modal
    });
  }


  componentDidMount() {
    base.syncState('/users', {
      context: this,
      state: 'users'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.handleAuth({ user })
      }
    });
  }

  handleAuth = async authData => {
    let user = await this.state.users[authData.user.uid]
    if (!user || !user.id) {
      let res = authData.user.displayName.split(" ");
      user = {
        id: authData.user.uid,
        photoURL: authData.user.photoURL,
        phone: authData.user.phoneNumber,
        lastName: res[0],
        firstName: res[1],
        displayName: authData.user.displayName,
        emailVerified: authData.user.emailVerified,
        email: authData.user.email,
        createAt: DateTime.local().setLocale('en-gb').toLocaleString(),
        lastUpdate: ""
      };
      await base.post(`/users/${authData.user.uid}`, {
        data: user
      })

    }

    this.setState({
      uid: authData.user.uid,
      currentUser: user || authData.user,
      isConnected: authData.user.uid ? true : false,
      modal: false
    });
  }

  authenticate = (provider) => {
    let authProvider = null;
    if (provider === 'facebook') {
      authProvider = new firebase.auth.FacebookAuthProvider()
    }
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.handleAuth)
  }

  logout = async () => {
    console.log('Logout')
    await firebase.auth().signOut()
    this.setState({
      uid: null,
      currentUser: null
    })
  }

  render() {
    return (
      <Router>
        <div className="flyout">
          <Header
            handleChange={this.handleChange}
            signIn={this.toggle}
            logout={this.logout}
            user={this.state.currentUser}
          />
          <main style={{ marginTop: "4rem" }}>
            <SignInModal
              modal={this.state.modal}
              toggle={this.toggle}
              authenticate={this.authenticate}
            />
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