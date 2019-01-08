import React, { Component, Fragment } from 'react'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Fa
} from "mdbreact";
import withAuthentication from '../../../hoc/withAuthentication'
import NotificationItem from './NotificationItem'
import base from '../../../base'

class ChatNotification extends Component {
    state = {
        conversations: [],
    }

    componentWillReceiveProps() {
        if (this.props.user && this.props.user.id)
            base.listenTo('conversations', {
                context: this,
                asArray: true,
                queries: {
                    orderByChild: 'recipientId',
                    equalTo: this.props.user.id
                },
                then(conversations) {
                    this.fetchConversations(conversations);
                }
            })
    }

    fetchConversations(conversations) {
        if (conversations && conversations.length > 0) {
            let cvs = [];
            conversations.forEach((c) => {
                if (c.messages && c.messages.length > 1) {
                    if (c.toRespond > 0 && c.seen === false) {
                        c.active = true;
                    } else {
                        c.active = false;
                    }
                    cvs.push(c);
                }
            })
            this.setState({ conversations: cvs });
        }
    }
    selectConversation = (id) => {
    }

    render() {
        return (
            <Fragment>
                <Dropdown>
                    <DropdownToggle className="dopdown-toggle" nav>
                        <span className="waves-effect waves-light d-flex align-items-center">
                            <Fa icon="envelope" className="ml-1 mt-2" />
                            {this.state.conversations.length > 0 &&
                                <span className="notif-label" color="danger" > {this.state.conversations.length} </span>
                            }
                        </span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-default">
                        {this.state.conversations && this.state.conversations.length > 0 &&
                            this.state.conversations.map((conversation) => (
                                <DropdownItem href={`chats/${conversation.id}`} key={conversation.id} >
                                    <NotificationItem
                                        conversation={conversation}
                                        selectConversation={this.selectConversation}
                                        user={this.props.user} />
                                </DropdownItem>
                            ))
                        }
                    </DropdownMenu>
                </Dropdown>
            </Fragment>
        )
    }
}
const WrappedChatNotification = withAuthentication(ChatNotification);
export default WrappedChatNotification