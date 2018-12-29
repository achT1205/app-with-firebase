import React, { Component, Fragment } from 'react'
import DetailsDesktop from '../../components/DetailsDesktop'
// Firebase
import base from '../../base'

class DetailsPage extends Component {
    state = {
        announcement: {},
        announcements: {}
    }

    componentDidMount() {
        base.syncState('/announcements', {
            context: this,
            state: 'announcements'
        });
    }

    componentDidUpdate() {
        if (this.state.announcements && this.props.match.params.id && !this.state.announcement.id) {
            let announcement = this.state.announcements[this.props.match.params.id];
            if (announcement && announcement.id)
                this.setState({ announcement: announcement })
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.announcement.id && <DetailsDesktop announcement={this.state.announcement} />}
            </Fragment>
        )
    }
}
export default DetailsPage