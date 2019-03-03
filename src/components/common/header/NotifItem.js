import React from "react";
import Timestamp from 'react-timestamp'
const NotifItem = ({
  notification: { author, avatar, message, createAt, active }
}) => (
    <div
      className="d-flex justify-content-between p-2 border-light"
      style={{ backgroundColor: active ? "#eeeeee" : "" }}
    >
      <img src={avatar} className="rounded-circle z-depth-0" style={{ height: "50px", padding: 0 }} alt="" />
      <div style={{ fontSize: "0.75rem", marginTop: 15 , marginLeft :15}}>
        <strong>{author}</strong>
        <p className="text-muted">{message.substring(0, 10) + "..."}</p>
      </div>
      <div>
        <p className="text-muted mb-0" style={{ fontSize: "0.50rem", marginLeft: 15 }}>
        <Timestamp time={createAt} autoUpdate  />
        </p>
      </div>
    </div>

  );

export default NotifItem