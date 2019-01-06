import React, { Component, Fragment } from 'react'
import Profile from '../../components/Profile'
import { Container } from 'mdbreact'
import withAuthentication from '../../hoc/withAuthentication'
import base from '../../base'

class Account extends Component {
  state = {
    user: {}
  }
  componentDidMount() {
    const {  match } = this.props;
    if (match.params.id) {
        base.syncState(`users/${match.params.id}`, {
            context: this,
            state: 'user'
        });
    }
  }
  render() {
    return (
      <Container>
        <Profile user={this.state.user.id ? this.state.user : this.props.user} />
      </Container>
    )
  }
}

const WrappedAccount = withAuthentication(Account)
export default WrappedAccount