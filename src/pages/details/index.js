import React, { Component, Fragment } from 'react'
import DetailsDesktop from '../../components/DetailsDesktop'
// Firebase
import base from '../../base'

class DetailsPage extends Component {
    state = {
        announcement: {},
        users: [],
        user: {}
    }

    componentDidMount() {
        base.syncState(`users/`, {
            context: this,
            state: 'users',
            asArray: true
        });
        if (this.props.match.params.id) {
            base.syncState(`announcements/${this.props.match.params.id}`, {
                context: this,
                state: 'announcement'
            });
        }
    }

    onSendingEmailm = () => {

    }

    render() {
        let owners =[];
        if(this.state.users.length > 0){
            owners = this.state.users.filter(u=>u.id === this.state.announcement.ownerId)
        }
        return (
            <Fragment>
                {this.state.announcement && this.state.announcement.id &&
                    <DetailsDesktop
                        onSendingEmailm={this.onSendingEmailm}
                        announcement={this.state.announcement}
                        user={owners[0]}
                    />}
            </Fragment>
        )
    }
}
export default DetailsPage