import React, { Component, Fragment } from 'react'
import Notifications from '../../components/notifications'
import { Container } from 'mdbreact'
import withAuthentication from '../../hoc/withAuthentication';
class NotificationPage extends Component {
  state = {

  }

  render() {
    return (
      <Container>
        <Notifications />
      </Container>
    )
  }
}

const WrappedNotificationPage = withAuthentication(NotificationPage)
export default WrappedNotificationPage