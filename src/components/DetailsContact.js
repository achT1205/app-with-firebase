import React from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBIcon, MDBCol, Badge, NavLink } from "mdbreact";

const DetailsContact = (props) => {
  const { announcement, user, currentUser } = props;
  return (
    <MDBRow>
      <MDBCol>
        <MDBCard news>
          <MDBCardBody>
            <div className="content">
              {
                currentUser && user.id !== currentUser.id &&
                <div className="right-side-meta">
                  {user.isConnected === true && <Badge color="green" pill>Online</Badge>}
                  {user.isConnected === false && <Badge color="pink" pill>Off</Badge>}
                </div>
              }
              <NavLink to={`/users/${announcement.owner.id}`}>
                <img
                  src={user.photoURL}
                  alt=""
                  className="rounded-circle avatar-img z-depth-1-half"
                />
                <span>{announcement.owner.name}</span>
              </NavLink>
            </div>
          </MDBCardBody>

          <MDBCardBody>
            <ul className="text-lg-left list-unstyled ml-4">
              <li>
                <p>
                  <MDBIcon icon="map-marker" className="pr-2" />
                  {announcement.owner.address}
                </p>
              </li>
              <li>
                <p>
                  <MDBIcon icon="phone" className="pr-2" />
                  {announcement.owner.phone}
                </p>
              </li>
              <li>
                <p>
                  <MDBIcon icon="envelope" className="pr-2" />
                  {announcement.owner.email}
                </p>
              </li>
              <li>
                <p>
                  <MDBIcon icon="heart-o" className="pr-2" />
                  {announcement.owner.likeCount} likes
                  </p>
              </li>
            </ul>
            <hr className="hr-light my-4" />
            <ul className="list-inline text-center list-unstyled">
              <li className="list-inline-item">
                <a href="#!" className="p-2 fa-lg w-ic">
                  <MDBIcon icon="twitter" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#!" className="p-2 fa-lg w-ic">
                  <MDBIcon icon="linkedin" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#!" className="p-2 fa-lg w-ic">
                  <MDBIcon icon="instagram" />
                </a>
              </li>
              {
                currentUser && user.id !== currentUser.id &&
                <li className="list-inline-item">
                  <NavLink to={`/chats/${currentUser.id + '-' + announcement.id}`}>
                    <span href="#!" className="p-2 fa-lg w-ic">
                      <MDBIcon icon="comments-o" />
                    </span>
                  </NavLink>

                </li>
              }

            </ul>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default DetailsContact;