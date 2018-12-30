import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import base from '../base'


const withAuthentication = WrappedComponent => (
    class HOC extends Component {
        state = {
            user: null,
            users: {}
        }
        componentDidMount() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                  base.fetch(`users/${user.uid}`, {
                    context: this,
                    then(data) {
                      if (data) {
                        this.setState({ user });
                      }
                    }
                  });
                }
              });
        }
        render() {
            return (
                <WrappedComponent
                    user={this.state.user}
                    {...this.props} />
            )
        }
    }

)

export default withAuthentication
