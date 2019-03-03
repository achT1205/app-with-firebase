import React, { Fragment } from "react";
import {
  MDBBadge,
  MDBIcon,
  NavLink
} from "mdbreact";
import './index.css'
import Timestamp from 'react-timestamp'

const NotificationItem = ({
  conversation: { id, senderName, recipientId, senderAvatar, recipientName, recipientAvatar, messages, updatedAt, toRespond, seen, active }, user, selectConversation
}) => (
     <NavLink to={`/chats/${id}`}
      className={active ? "d-flex notif-list actived-notif":"d-flex notif-list"}    
    >
      <img src={user.id === recipientId ? senderAvatar : recipientAvatar} className="rounded-circle z-depth-0" style={{ height: "50px", padding: 0 }} alt="" />
      <div style={{ fontSize: "0.75rem",  marginTop: 15 , marginLeft :15 }}
      
      >
        <strong>{user.id === recipientId ? senderName : recipientName}</strong>
        {messages.length > 1 &&
          <p className="text-muted">{messages[messages.length - 1].message.substring(0, 10) + "..."}</p>
        }
      </div>
      <div>
        <p className="text-muted notif-muted mb-2" style={{ fontSize: "0.50rem", marginLeft: 15 }}>
        <Timestamp time={updatedAt} autoUpdate  />
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
    </NavLink>
  );

export default NotificationItem