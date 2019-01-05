import React, { Component } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBListGroup,
} from "mdbreact";

class Notifications extends Component {
  render() {
    return (
      <MDBListGroup className="list-unstyled pl-3 pr-3">
        <NotifCard />
        <NotifCard />
        <NotifCard />
        <NotifCard />
      </MDBListGroup>
    );
  }
}

const NotifCard = () => (
  <li className="chat-message d-flex justify-content-between mt-4">
    <MDBCard>
      <MDBCardBody>
        <div>
          <strong className="primary-font">{"Achille TUGLO"}</strong>
          <small className="pull-right text-muted">
            <i className="fa fa-clock-o" /> {"5 min ago"}
          </small>
        </div>
        <hr />
        <p className="mb-0">
          Lorem ipsum dolor sit amet, gggggggggggggggggg ttttttttttt consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </MDBCardBody>
    </MDBCard>
  </li>
);

export default Notifications;