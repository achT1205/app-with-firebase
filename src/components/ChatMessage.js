
import React, { Fragment } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBAvatar,
} from "mdbreact";
import Timestamp from 'react-timestamp'

const ChatMessage = ({ message: { id, author, avatar, createAt, message, senderId }, isLast, user }) => (
  <Fragment>
    {id !== 0 && senderId === user.id &&
      <li className="chat-message d-flex justify-content-between mb-4 p-5">
        <MDBCard>
          <MDBCardBody>
            <div id={id}>
              <strong className="primary-font">{author}</strong>
            </div>
            <hr />
            <p className="mb-3">{message}</p>
            <p className="pull-right text-muted" style={{ fontSize: "0.55rem" }}>
              <i className="fa fa-clock-o" /> <Timestamp time={createAt} autoUpdate />
            </p>
          </MDBCardBody>
        </MDBCard>
        <MDBAvatar
          tag="img"
          src={avatar}
          alt="avatar"
          circle
          className="mx-2 z-depth-1"
        />
      </li>
    }
    {id !== 0 && senderId !== user.id &&
      <li className="chat-message d-flex justify-content-between mb-4 p-5">
        <MDBAvatar
          tag="img"
          src={avatar}
          alt="avatar"
          circle
          className="mx-2 z-depth-1"
        />
        <MDBCard>
          <MDBCardBody>
            <div id={id}>
              <strong className="primary-font">{author}</strong>
            </div>
            <hr />
            <p className="mb-3">{message}</p>
            <p className="pull-right text-muted" style={{ fontSize: "0.55rem" }}>
              <i className="fa fa-clock-o" /> <Timestamp time={createAt} autoUpdate />
            </p>
          </MDBCardBody>
        </MDBCard>
      </li>
    }
  </Fragment>
);

export default ChatMessage