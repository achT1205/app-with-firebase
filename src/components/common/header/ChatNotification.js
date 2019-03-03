import React, { Component, Fragment } from 'react'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Fa,
    MDBBadge
} from "mdbreact";
import withAuthentication from '../../../hoc/withAuthentication'
import NotificationItem from './NotificationItem'
import base from '../../../base'



class ChatNotification extends Component {
    state = {
        conversations: [],
        count: 0
    }

    componentWillReceiveProps() {
        if (this.props.user && this.props.user.id) {
            base.listenTo('conversations', {
                context: this,
                asArray: true,
                queries: {
                    orderByChild: `messages/?recipientId=${this.props.user.id}`,
                },
                then(conversations) {
                    this.fetchConversations(conversations);
                }
            })
        }
    }

    

    fetchConversations(conversations) {
        if (conversations && conversations.length > 0) {
            let cvs = [];
            let count = 0;
            conversations.forEach((c) => {
                if ((c.recipientId === this.props.user.id || c.senderId === this.props.user.id) && c.messages && c.messages.length > 1) {
                    let lastMessage = c.messages[c.messages.length - 1];
                    if (lastMessage.recipientId === this.props.user.id && c.toRespond > 0 && c.seen === false) {
                        count++;
                        c.active = true;
                    } else {
                        c.active = false;
                    }
                    cvs.push(c);
                }
            });
            this.setState({ conversations: cvs.sort(c => c.updatedAt), count: count });
        }
    }

    render() {
        return (
            <Fragment>
                <Dropdown>
                    <DropdownToggle className="dopdown-toggle" nav>
                        <span className="waves-effect waves-light d-flex align-items-center">
                            <Fa icon="envelope" className="ml-1 mt-2" />
                            {this.state.count > 0 &&
                                <MDBBadge color="danger" className="notif-label">
                                    {this.state.count}
                                </MDBBadge>
                            }
                        </span>
                    </DropdownToggle>
                    {this.state.conversations && this.state.conversations.length > 0 &&
                        <DropdownMenu className="dropdown-default notif-container">
                            {
                                this.state.conversations.map((conversation) => (
                                    <DropdownItem key={conversation.id} >
                                        <NotificationItem
                                            conversation={conversation}
                                            selectConversation={this.selectConversation}
                                            user={this.props.user} />
                                    </DropdownItem>
                                ))
                            }
                        </DropdownMenu>
                    }
                </Dropdown>
            </Fragment>
        )
    }
}
const WrappedChatNotification = withAuthentication(ChatNotification);
export default WrappedChatNotification