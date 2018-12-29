import React, { Component } from 'react';
import { Container } from 'mdbreact';
import Datatable from '../../components/Datatable';
import DeleteConfirmation from '../../components/modals/DeleteConfirmation';

// Firebase
import base from '../../base';
import createHistory from 'history/createBrowserHistory';
const history = createHistory({ forceRefresh: true });

class ManagePage extends Component {
  state = {
    modal: false,
    announcements: {},
    currentId: ''
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
    this.setState({ currentId: id });
    this.toggle();
  }

  deleteConfirmed = () => {
    let announcements = this.state.announcements;
    announcements[this.state.currentId] = null;
    this.setState({ announcements: announcements })
    this.toggle();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <Container>
        <Datatable
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          announcements={this.state.announcements} />
        <DeleteConfirmation
          toggle={this.toggle}
          modal={this.state.modal}
          deleteConfirmed={this.deleteConfirmed}
        />
      </Container>
    )
  }
}

export default ManagePage