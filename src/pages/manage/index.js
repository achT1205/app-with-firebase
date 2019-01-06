import React, { Component } from 'react';
import { Container } from 'mdbreact';
import Datatable from '../../components/Datatable';
import DeleteConfirmation from '../../components/modals/DeleteConfirmation';
import withAuthentication from '../../hoc/withAuthentication'

// Firebase
import base from '../../base';
import createHistory from 'history/createBrowserHistory';
const history = createHistory({ forceRefresh: true });

class ManagePage extends Component {
  state = {
    modal: false,
    announcements: [],
    currentId: '',
    currentIndex: 0
  }

  componentDidUpdate(nextProps) {
    if (this.props.user && this.props.user.id && nextProps !== this.props) {
      this.fetchData(this.props.user.id);
    }
  }

  fetchData = (userId) => {
    base.fetch(`announcements/`, {
      context: this,
      asArray: true,
      queries: {
        orderByChild: 'ownerId',
        equalTo :userId
      },
      then(data) {
        if (data) {
          this.setState({ announcements: data });
        }
      }
    });
  }

  handleEdit = (id) => {
    history.push(`/edit/${id}`);
  }

  handleDelete = (id, index) => {
    this.setState({ currentId: id, currentIndex: index });
    this.toggle();
  }

  deleteConfirmed = () => {
    let announcements = this.state.announcements;
    base
      .remove(`announcements/${this.state.currentId}`)
      .then(() => {
        if (this.state.currentIndex > -1) {
          announcements.splice(this.state.currentIndex, 1);
          this.setState({ announcements });
        }
      })
      .catch(error => {
      });

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
        {this.state.announcements.length > 0 &&
          <Datatable
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
            announcements={this.state.announcements} />
        }
        {this.state.announcements.length === 0 &&
          <div>
            not item yet
          </div>
        }
        <DeleteConfirmation
          toggle={this.toggle}
          modal={this.state.modal}
          deleteConfirmed={this.deleteConfirmed}
        />
      </Container>
    )
  }
}

const WrappedManagePage = withAuthentication(ManagePage);
export default WrappedManagePage