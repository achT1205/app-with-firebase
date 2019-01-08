
import React, { Fragment } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBAvatar,
} from "mdbreact";

const ChatMessage = ({ message: { id, author, avatar, createAt, message }, isLast, user }) => (
    <Fragment>
      {id !== 0 &&
        <li className="chat-message d-flex justify-content-between mb-4">
          <MDBAvatar
            tag="img"
            src={avatar}
            alt="avatar"
            circle
            className="mx-2 z-depth-1"
          />
          <MDBCard>
            <MDBCardBody>
              <div>
                <strong className="primary-font">{author}</strong>
                <small className="pull-right text-muted">
                  <i className="fa fa-clock-o" /> {createAt}
                </small>
              </div>
              <hr />
              <p className="mb-0">{message}</p>
            </MDBCardBody>
          </MDBCard>
        </li>
      }
    </Fragment>
  );

  export default ChatMessage