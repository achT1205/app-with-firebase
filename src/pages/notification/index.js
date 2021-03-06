import React, { Component } from 'react'
import Notifications from '../../components/notifications'
import { Container } from 'mdbreact'
import withAuthentication from '../../hoc/withAuthentication';
class NotificationPage extends Component {
  state = {

  }

  render() {
    return (
      <Container>
        {this.props.user && this.props.user.id &&
          <Notifications {...this.props} />
        }
      </Container>
    )
  }
}

const WrappedNotificationPage = withAuthentication(NotificationPage)
export default WrappedNotificationPage