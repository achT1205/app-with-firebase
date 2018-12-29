import React from "react";
import {  MDBRow,  MDBCard, MDBCardBody, MDBIcon, MDBCol,Badge} from "mdbreact";

const DetailsContact = (props) => {
  const {owner} =props;
  return (
<MDBRow>
      <MDBCol>
        <MDBCard news>
          <MDBCardBody>
            <div className="content">
              <div className="right-side-meta">
             {owner.isConneted && <Badge color="green" pill>Online</Badge>}
             {!owner.isConneted && <Badge color="pink" pill>Off</Badge>}
              </div>
              <img
                src={owner.profile}
                alt=""
                className="rounded-circle avatar-img z-depth-1-half"
              />
              {owner.name}
            </div>
          </MDBCardBody>
          
          <MDBCardBody>
            <ul className="text-lg-left list-unstyled ml-4">
                <li>
                  <p>
                    <MDBIcon icon="map-marker" className="pr-2" />
                    {owner.address}
                  </p>
                </li>
                <li>
                  <p>
                    <MDBIcon icon="phone" className="pr-2" />
                    {owner.phone}
                  </p>
                </li>
                <li>
                  <p>
                    <MDBIcon icon="envelope" className="pr-2" />
                    {owner.email}
                  </p>
                </li>
                <li>
                  <p>
                  <MDBIcon icon="heart-o" className="pr-2" />
                  {owner.likeCount} likes
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
              </ul>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default DetailsContact;