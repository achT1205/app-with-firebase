import React, { Component } from 'react';
import { Container } from 'mdbreact';
import Datatable from '../../components/Datatable';

// Firebase
import base from '../../base';
import createHistory from 'history/createBrowserHistory';
const history = createHistory({ forceRefresh: true });

class ManagePage extends Component {
  state = {
    announcements: {}
  }

  componentDidMount() {
    base.syncState('/announcements', {
      context: this,
      state: 'announcements'
    });
  }

  handleEdit = (id) => {
    history.push(`/edit/${id}`);
  }

  handleDelete = (id) => {
    let announcements = this.state.announcements;
    announcements[id] = null;
    this.setState({announcements : announcements})
  }

  render() {
    return (
      <Container>
        <Datatable
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          announcements={this.state.announcements} />
      </Container>
    )
  }
}

export default ManagePage