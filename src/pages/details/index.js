import React, { Component, Fragment } from 'react'
import DetailsDesktop from '../../components/DetailsDesktop'
// Firebase
import base from '../../base'
import createHistory from 'history/createBrowserHistory';
const history = createHistory({ forceRefresh: true });

class DetailsPage extends Component {
    state = {
        announcement: {},
        user: {},
        relateds: [], 
        chats:[]
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

    redirectToProfile=()=>{
        history.push(`/users/${this.state.announcement.ownerId}`);
    }

    redirectToChat=()=>{
        history.push(`/chats/${this.state.announcement.ownerId}`);
    }

    onSendingEmailm = () => {

    }

    render() {
        let relateds = [];
        if (this.state.announcement.ownerId) {
            base.fetch(`announcements`, {
                context: this,
                asArray: true,
                queries: {
                    orderByChild: 'ownerId',
                    equalTo: this.state.announcement.ownerId,
                    limitToLast: 3
                },
                then(data) {
                    relateds = data;
                }
            });
        }
        return (
            <Fragment>
                {this.state.announcement && this.state.announcement.id &&
                    <DetailsDesktop
                        onSendingEmailm={this.onSendingEmailm}
                        announcement={this.state.announcement}
                        user={this.state.user}
                        relateds={relateds}
                        redirectToProfile ={this.redirectToProfile}
                        redirectToChat={this.redirectToChat}
                    />}
            </Fragment>
        )
    }
}
export default DetailsPage