import React, { Component, Fragment } from 'react'
import Profile from '../../components/Profile'
import { Container } from 'mdbreact'
import withAuthentication from '../../hoc/withAuthentication'

import base from '../../base';

class Account extends Component {
  state = {

  }

  render() {
    return (
      <Container>
        <Profile user={this.props.user} />
      </Container>
    )
  }
}

const WrappedAccount = withAuthentication(Account)
export default WrappedAccount