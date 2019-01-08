import React, { Component, Fragment } from 'react'
import DetailsDesktop from '../../components/DetailsDesktop'
import withAuthentication from '../../hoc/withAuthentication'
import { DateTime } from "luxon";
import { toast, ToastContainer } from "mdbreact";
// Firebase
import base from '../../base'
import 'firebase/auth'
import createHistory from 'history/createBrowserHistory';
const history = createHistory({ forceRefresh: true });

class DetailsPage extends Component {
    state = {
        announcement: {},
        user: {},
        relateds: [],
        chats: []
    }

    componentDidMount() {
        const { location, match } = this.props;
        if (location.search) {
            let strs = location.search.split("=");
            base.syncState(`users/${strs[1]}`, {
                context: this,
                state: 'user'
            });
        }
        if (match.params.id) {
            base.syncState(`announcements/${match.params.id}`, {
                context: this,
                state: 'announcement'
            });
        }
    }

    redirectToProfile = () => {
        history.push(`/users/${this.state.announcement.ownerId}`);
    }

    redirectToChat = () => {
        if (this.props.user && this.props.user.isConnected) {
            base.fetch(`conversations/${this.state.announcement.id}`, {
                context: this,
                then(conversation) {
                    if (conversation && conversation.id) {
                        history.push(`/chats/${conversation.id}`);
                    } else {
                        let newConversation = {
                            id: this.state.announcement.id,
                            senderId: this.props.user.id,
                            recipientId: this.state.user.id,
                            senderName: this.props.user.displayName,
                            recipientName: this.state.user.displayName,
                            senderAvatar: this.props.user.photoURL,
                            recipientAvatar: this.state.user.photoURL,
                            createAt: DateTime.local().setLocale('en-gb').toLocaleString(DateTime.DATETIME_SHORT),
                            toRespond: 0,
                            seen: true,
                            active: false,
                            messages :[
                                 {
                                    id: 0,
                                    conversationId: this.state.announcement.id,
                                    senderId: this.props.user.id,
                                    recipientId: this.state.user.id,
                                    author: this.props.user.displayName,
                                    avatar: this.props.user.photoURL,
                                    createAt: DateTime.local().setLocale('en-gb').toLocaleString(DateTime.DATETIME_SHORT),
                                    message: "init conversation",
                                  }
                            ]
                        }
                        base.post(`/conversations/${this.state.announcement.id}`, {
                            data: newConversation,
                        });

                        history.push(`/chats/${this.state.announcement.id}`)
                    }
                }
            });
        }
        else {
            toast.error("You must sign in to continue :(", {
                position: "top-right",
                autoClose: 5000,
                closeButton: true,
            });
        }
    }

    onSendingEmailm = () => {

    }

    componentDidUpdate() {
        if (this.state.announcement.ownerId && this.state.relateds.length === 0) {
            if (this.state.announcement.ownerId) {
                base.fetch(`announcements`, {
                    context: this,
                    asArray: true,
                    queries: {
                        orderByChild: 'ownerId',
                        equalTo: this.state.announcement.ownerId,
                        limitToLast: 6
                    },
                    then(data) {
                        this.setState({ relateds: data })
                    }
                });
            }
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.announcement && this.state.announcement.id &&
                    <DetailsDesktop
                        onSendingEmailm={this.onSendingEmailm}
                        announcement={this.state.announcement}
                        user={this.state.user}
                        relateds={this.state.relateds}
                        redirectToProfile={this.redirectToProfile}
                        redirectToChat={this.redirectToChat}
                        currentUser={this.props.user}
                    />
                }
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    closeButton={false}
                    newestOnTop={false}
                    rtl={false}>
                </ToastContainer>
            </Fragment>
        )
    }
}
const WrappedDetailsPage = withAuthentication(DetailsPage)
export default WrappedDetailsPage