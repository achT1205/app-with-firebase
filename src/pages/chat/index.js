import React, { Component, Fragment } from 'react'
import Chat from '../../components/Chat'
import { Container } from 'mdbreact'
import withAuthentication from '../../hoc/withAuthentication'

class ChatPage extends Component {
  state = {

  }

  render() {
    return (
      <Container>
        <Chat user={this.props.user} />
      </Container>
    )
  }
}

const WrappedChatPage = withAuthentication(ChatPage)
export default WrappedChatPage