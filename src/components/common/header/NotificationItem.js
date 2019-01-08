import React, { Fragment } from "react";
import {
  MDBBadge,
  MDBIcon
} from "mdbreact";
import './index.css'

const NotificationItem = ({
  conversation: { id, senderName, recipientId, senderAvatar, recipientName, recipientAvatar, messages, createAt, toRespond, seen, active }, user
}) => (
    <div
      className="d-flex justify-content-between p-2 border-light"
      style={{ backgroundColor: active ? "#eeeeee" : "" }}
    >
      <img src={user.id === recipientId ? senderAvatar : recipientAvatar} className="rounded-circle z-depth-0" style={{ height: "50px", padding: 0 }} alt="" />
      <div style={{ fontSize: "0.75rem",  marginTop: 15 , marginLeft :15 }}>
        <strong>{user.id === recipientId ? senderName : recipientName}</strong>
        {messages.length > 1 &&
          <p className="text-muted">{messages[messages.length - 1].message.substring(0, 10) + "..."}</p>
        }
      </div>
      <div>
        <p className="text-muted mb-2" style={{ fontSize: "0.50rem", marginLeft: 15 }}>
          {createAt}
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
    </div>

  );

export default NotificationItem