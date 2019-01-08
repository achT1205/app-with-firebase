import React, { Fragment } from "react";
import {
    MDBCard,
    MDBCardBody
} from "mdbreact";

const NotifCard = (
    {
        notification: { author, avatar, message, createAt, type }
    }
) => (
        <li className="chat-message d-flex justify-content-between mt-4">
            <MDBCard>
                <MDBCardBody>
                    {type === "email" &&
                        <Fragment>
                            <div>
                                <strong className="primary-font">
                                    <img src={avatar} className="rounded-circle z-depth-0" style={{ height: "50px", padding: 0 }} alt="" />
                                    {author}
                                </strong>
                                <small className="pull-right text-muted">
                                    <i className="fa fa-clock-o" /> {createAt}
                                </small>
                            </div>
                            <hr />
                            <p className="mb-0">
                                {message}
                            </p>
                        </Fragment>
                    }
                </MDBCardBody>
            </MDBCard>
        </li>
    );

export default NotifCard