import React, { Component } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBListGroup,
  MDBScrollbar
} from "mdbreact";
//import './chat.css';

class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      friends: [
        {
          name: "John Doe",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-8",
          message: "Hello, Are you there?",
          when: "Just now",
          toRespond: 1,
          seen: false,
          active: true
        },
        {
          name: "Danny Smith",
          message: "Lorem ipsum dolor sit",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-1",
          when: "5 min ago",
          toRespond: 0,
          seen: false,
          active: false
        },
        {
          name: "Alex Steward",
          message: "Lorem ipsum dolor sit",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-2",
          when: "Yesterday",
          toRespond: 0,
          seen: false,
          active: false
        },
        {
          name: "Ashley Olsen",
          message: "Lorem ipsum dolor sit",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-3",
          when: "Yesterday",
          toRespond: 0,
          seen: false,
          active: false
        },
        {
          name: "Kate Moss",
          message: "Lorem ipsum dolor sit",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-4",
          when: "Yesterday",
          toRespond: 0,
          seen: true,
          active: false
        },
        {
          name: "Lara Croft",
          message: "Lorem ipsum dolor sit",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-5",
          when: "Yesterday",
          toRespond: 0,
          seen: false,
          active: false
        },
        {
          name: "Brad Pitt",
          message: "Lorem ipsum dolor sit",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
          when: "5 min ago",
          toRespond: 0,
          seen: true,
          active: false
        },
        {
          name: "Ken Ditto",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/img(3).jpg",
          message: "Hello, Are you there?",
          when: "Yesterday",
          toRespond: 0,
          seen: false,
          active: false
        },
        {
          name: "Marta Wozniak",
          message: "Lorem ipsum dolor sit.",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/img(2).jpg",
          when: "5 min ago",
          toRespond: 0,
          seen: false,
          active: false
        }
      ],
      messages: [
        {
          author: "Brad Pitt",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
          when: "12 mins ago",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          author: "Lara Croft",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-5",
          when: "13 mins ago",
          message:
            " Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
        },
        {
          author: "Brad Pitt",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
          when: "14 mins ago",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          author: "Lara Croft",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-5",
          when: "16 mins ago",
          message:
            " Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
        },
        {
          author: "Brad Pitt",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
          when: "17 mins ago",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      ]
    };
  }

  render() {
    return (
      <MDBCard className="grey lighten-3 chat-room">
        <MDBCardBody>
          <MDBRow className="px-lg-2 px-2">
          <div className="scrollable-chat">
                <MDBScrollbar>
                  <MDBListGroup className="list-unstyled pl-3 pr-3">
                    {this.state.messages.map(message => (
                      <NotifCard
                        key={message.author + message.when}
                        message={message}
                      />
                    ))}
                  </MDBListGroup>
                </MDBScrollbar>
              </div>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

const NotifCard = ({ message: { author, when, message } }) => (
  <li className="chat-message d-flex justify-content-between mb-4">
    <MDBCard>
      <MDBCardBody>
        <div>
          <strong className="primary-font">{author}</strong>
          <small className="pull-right text-muted">
            <i className="fa fa-clock-o" /> {when}
          </small>
        </div>
        <hr />
        <p className="mb-0">{message}</p>
      </MDBCardBody>
    </MDBCard>
  </li>
);

export default Notifications;