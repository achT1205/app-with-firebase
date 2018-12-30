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
            base.syncState('/users', {
                context: this,
                state: 'users'
            });
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.formateUser({ user })
                }
            });
        }

        formateUser = async authData => {
            let user = await this.state.users[authData.user.uid];
            if (!user || !user.id) {
                let res = authData.user.displayName.split(" ");
                user = {
                    id: authData.user.uid,
                    photoURL: authData.user.photoURL,
                    phone: authData.user.phoneNumber,
                    firstName: res[1],
                    lastName: res[0],
                    displayName: authData.user.displayName,
                    emailVerified: authData.user.emailVerified,
                    email: authData.user.email
                }
            }
            this.setState({ user });
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
