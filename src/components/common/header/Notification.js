import React, { Component, Fragment } from 'react'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Fa
} from "mdbreact";
import withAuthentication from '../../../hoc/withAuthentication'
import NotifItem from './NotifItem'
import base from '../../../base'
import './index.css'

class Notification extends Component {
    state = {
        notifications: [],
    }

    componentWillReceiveProps() {
        if (this.props.user && this.props.user.id)
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

    fetchNotifications(notifications) {
        if (notifications && notifications.length > 0) {
            let notifs = [];
            notifications.forEach((c) => {
                if (c.seen === false) {
                    c.active = true;
                } else {
                    c.active = false;
                }
                notifs.push(c);
            })
            this.setState({ notifications: notifs });
        }
    }

    render() {
        return (
            <Fragment>
                <Dropdown>
                    <DropdownToggle className="dopdown-toggle" nav>
                        <span className="waves-effect waves-light d-flex align-items-center">
                            <Fa icon="bell" className="ml-1 mt-2" />
                            {this.state.notifications.length > 0 &&
                                <span className="notif-label" color="danger" > {this.state.notifications.length} </span>
                            }
                        </span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-default">
                        {this.state.notifications && this.state.notifications.length > 0 &&
                            this.state.notifications.map((notification) => (
                                <DropdownItem href={`/notifications/${notification.id}`} key={notification.id} >
                                    <NotifItem
                                        notification={notification}
                                    />
                                </DropdownItem>
                            ))
                        }
                    </DropdownMenu>
                </Dropdown>
            </Fragment>
        )
    }
}
const WrappedNotification = withAuthentication(Notification);
export default WrappedNotification