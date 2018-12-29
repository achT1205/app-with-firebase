import React, { Component } from 'react'
import { Container } from 'mdbreact'
import Datatable from '../../components/Datatable'

// Firebase
import base from '../../base'

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

  render() {
    return (
      <Container>
        <Datatable announcements ={this.state.announcements} />
      </Container>
    )
  }
}

export default ManagePage