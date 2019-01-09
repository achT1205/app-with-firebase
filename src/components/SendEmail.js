import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

const SendEmail = ({handleInputChange, formValues, handleSubmit}) => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <form>
            <div className="grey-text">
              <MDBInput
                label="Your name"
                icon="user"
                name="name"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={formValues.name}
                onChange={handleInputChange}
              />
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              <MDBInput
                label="Subject"
                icon="tag"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                name="subject"
                value={formValues.subject}
                onChange={handleInputChange}
              />
              <MDBInput
                type="textarea"
                rows="2"
                label="Your message"
                icon="pencil"
                name="message"
                value={formValues.message}
                onChange={handleInputChange}
              />
            </div>
            <div className="text-center">
              <MDBBtn outline color="secondary" onClick={handleSubmit}>
                Send <MDBIcon icon="paper-plane-o" className="ml-1" />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default SendEmail;