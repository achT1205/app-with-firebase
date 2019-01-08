import React, { Fragment } from "react";
import {
  MDBListGroupItem,
  MDBAvatar,
  MDBBadge,
  MDBIcon
} from "mdbreact";

const Conversation = ({
  conversation: { id, senderName, recipientId, senderAvatar, recipientName, recipientAvatar, messages, createAt, toRespond, seen, active }, selectConversation, user
}) => (
    <Fragment>
      {(user.id === recipientId && messages.length > 1 || user.id !== recipientId) &&
        <MDBListGroupItem
          href="#!"
          className="d-flex justify-content-between p-2 border-light"
          style={{ backgroundColor: active ? "#eeeeee" : "" }}
          onClick={() => selectConversation(id)}
        >
          <MDBAvatar
            tag="img"
            src={user.id === recipientId ? senderAvatar : recipientAvatar}
            alt="avatar"
            circle
            className="mr-2 z-depth-1"
          />
          <div style={{ fontSize: "0.95rem" }}>
            <strong>{user.id === recipientId ? senderName : recipientName}</strong>
            {messages.length > 1 &&
              <p className="text-muted">{messages[messages.length - 1].message.substring(0, 10) + "..."}</p>
            }
          </div>
          <div>
            <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
              {messages[messages.length - 1].createAt}
            </p>
            {messages.length > 1 &&
              <Fragment>
                {messages[messages.length - 1].senderId === user.id &&
                  <span className="text-muted float-right">
                    <MDBIcon className="fa-mail-reply" aria-hidden="true" />
                  </span>
                }
                {messages[messages.length - 1].recipientId === user.id &&
                  <Fragment>
                    {seen &&
                      <span className="text-muted float-right">
                        <MDBIcon className="fa-check" aria-hidden="true" />
                      </span>
                    }
                    {!seen && toRespond > 0 &&
                      <MDBBadge color="danger" className="float-right">
                        {toRespond}
                      </MDBBadge>
                    }
                    {!seen && toRespond == 0 &&
                      <span className="text-muted float-right">
                        <MDBIcon className="fa-mail-reply" aria-hidden="true" />
                      </span>
                    }
                  </Fragment>
                }
              </Fragment>
            }
          </div>
        </MDBListGroupItem>

      }
    </Fragment>
  );

export default Conversation