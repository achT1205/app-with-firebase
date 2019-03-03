import React, { Fragment } from "react";
import {
  MDBListGroupItem,
  MDBAvatar,
  MDBBadge,
  MDBIcon
} from "mdbreact";
import Timestamp from 'react-timestamp'

const Conversation = ({
  conversation: { id, senderName, recipientId, senderAvatar, recipientName, recipientAvatar, messages, toRespond, seen, title },
  selectConversation,
  user,
  selectedConversation
}) => (
    <Fragment>
      {(user.id === recipientId && messages.length > 1 || user.id !== recipientId) &&
        <MDBListGroupItem
          href="#!"
          className="d-flex justify-content-between p-2 border-light"
          style={{ backgroundColor: selectedConversation && selectedConversation.id === id ? "#eeeeee" : "" }}
          onClick={() => selectConversation(null, id)}
        >
          <MDBAvatar
            tag="img"
            src={user.id === recipientId ? senderAvatar : recipientAvatar}
            alt="avatar"
            circle
            className="mr-2 z-depth-1"
          />
          <div>
            <div><strong>{user.id === recipientId ? senderName : recipientName} </strong></div>
            <span className="bq-title">{title}</span>
            {messages.length > 1 &&
              <p className="text-muted">{messages[messages.length - 1].message.substring(0, 10) + "..."}</p>
            }
          </div>
          <div>
            <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
              <Timestamp time={messages[messages.length - 1].createAt} autoUpdate />
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