import React, { Component } from "react";
import {
  MDBListGroup,
} from "mdbreact";

import base from '../base'
import withAuthentication from '../hoc/withAuthentication'
import NotifCard from './NotifCard'

class Notifications extends Component {

  state = {
    notifications: [],
  }

  componentWillReceiveProps() {
    if (this.props.user && this.props.user.id) {
      base.listenTo('notifications', {
        context: this,
        asArray: true,
        queries: {
          orderByChild: 'toId',
          equalTo: this.props.user.id
        },
        then(notifications) {
          this.fetchNotifications(notifications);
        }
      })
    }
  }

  fetchNotifications(notifications) {
    if (notifications && notifications.length > 0) {
      let notifs = [];
      notifications.forEach((c) => {
        const id = c.id;
        const currentId = parseInt(this.props.match.params.id);
        debugger
        if (currentId === id) {
          debugger
          c.active = true;
          c.seen = true;
          base.update(`notifications/${id}`, {
            data: c
          });
        } else {
          if (c.seen === false) {
            c.active = true;
          } else {
            c.active = false;
          }
        }
        notifs.push(c);
      })
      this.setState({ notifications: notifs });
    }
  }

  render() {
    return (
      <MDBListGroup className="list-unstyled pl-3 pr-3">
        {
          this.state.notifications.map((notification) => (
            <NotifCard
              key={notification.id}
              notification={notification}
            />
          ))
        }
      </MDBListGroup>
    );
  }
}



const WrappedNotifications = withAuthentication(Notifications)
export default WrappedNotifications;