import React, { Component, Fragment } from 'react'
import DetailsDesktop from '../../components/DetailsDesktop'
import withAuthentication from '../../hoc/withAuthentication'

import { toast, ToastContainer } from "mdbreact";
// Firebase
import base from '../../base'
import firebase from 'firebase/app'
import 'firebase/auth'
import createHistory from 'history/createBrowserHistory';
const history = createHistory({ forceRefresh: true });

class DetailsPage extends Component {
    state = {
        announcement: {},
        user: {},
        relateds: [],
        chats: [],
        formValues: {
            name: "",
            email: "",
            subject: "",
            message: ""
        }
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

    onSendingEmailm = () => {
        if (!this.state.formValues.message) {
            toast.error("You must write a message to continue :(", {
                position: "top-right",
                autoClose: 5000,
                closeButton: true,
            });
            return
        }
        const id = Date.now()/1000|0;
        let notif = {
            id: id,
            subject: this.state.formValues.subject,
            email: this.state.formValues.email,
            author: this.state.formValues.name,
            avatar: this.props.user && this.props.user.photoURL ? this.props.user.photoURL : 'http://placehold.it/50x50',
            createAt: Date.now()/1000|0,
            message: this.state.formValues.message,
            seen: false,
            toEmail: this.state.announcement.owner.email,
            toId: this.state.announcement.ownerId,
            type: "email",
            announcementId: this.state.announcement.id,
            announcementTitle: this.state.announcement.title
        }
        base.post(`/notifications/${id}`, {
            data: notif,
        });

        let formValues = this.state.formValues;
        formValues.message = ''
        this.setState(formValues)

        toast.success("Your email has been sent succefuly !", {
            position: "top-right",
            autoClose: 5000,
            closeButton: true,
        });
    }

    handleInputChange = (event) => {
        const field = event.target.name;
        let formValues = this.state.formValues;
        formValues[field] = event.target.value;
        this.setState({ formValues: Object.assign({}, formValues) });
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
                        limitToLast: 7
                    },
                    then(data) {
                        let index = data.findIndex(c => c.id === parseInt(this.props.match.params.id))
                        let announcements = data.splice(index,1);
                        this.setState({ relateds: announcements })
                    }
                });
            }
        }
    }

    componentWillReceiveProps() {
        if (this.props.user && this.props.user.id) {
            let formValues = this.state.formValues;
            formValues.name = this.props.user.displayName;
            formValues.email = this.props.user.email;
            formValues.subject = "I am very interested in your ad";

        }
    }

    render() {
        return (
            <Fragment>
                {this.state.announcement && this.state.announcement.id &&
                    <DetailsDesktop
                        onSendingEmailm={this.onSendingEmailm}
                        handleInputChange={this.handleInputChange}
                        formValues={this.state.formValues}
                        announcement={this.state.announcement}
                        user={this.state.user}
                        relateds={this.state.relateds}
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