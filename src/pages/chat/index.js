import React, { Component, Fragment } from 'react'
import Chat from '../../components/Chat'
import { Container } from 'mdbreact'
import withAuthentication from '../../hoc/withAuthentication'

class ChatPage extends Component {
 
  render() {
    return (
      <Container>
        { this.props.user && this.props.user.id &&
          <Chat user={this.props.user} {...this.props} />
        }
      </Container>
    )
  }
}

const WrappedChatPage = withAuthentication(ChatPage)
export default WrappedChatPage