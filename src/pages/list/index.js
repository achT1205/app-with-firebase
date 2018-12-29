import React from "react";
import {Container } from 'mdbreact'
import ListRow from '../../components/ListRow'
// Firebase
import base from '../../base'

class ListPage extends React.Component {
    state = {
        announcements: {}
    }

    componentDidMount() {
        base.syncState('/announcements', {
            context: this,
            state: 'announcements'
        });
    }

    render() {
        return (
            <Container>
                {this.state.announcements &&
                   <ListRow announcements={this.state.announcements} />
                }
            </Container>
        )
    }
}

export default ListPage