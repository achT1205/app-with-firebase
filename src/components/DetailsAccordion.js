import React, { Component } from 'react';
import {
  Container, Collapse, Card, CardBody, CollapseHeader,
  MDBRow, MDBCol, MDBBtn, MDBIcon
} from 'mdbreact';
import SendEmail from './SendEmail';
import "./DetailsAccordion.css";

class DetailsAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: ''
    };
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));

  render() {
    const { collapseID } = this.state;
    const { description, location, onSendingEmailm, to } = this.props;
    return (
      <Container>
        <Container className="md-accordion mt-5">
          <Card>
            <CollapseHeader onClick={this.toggleCollapse('collapse1')}>Description
              <i className={collapseID === 'collapse1' ? 'fa fa-angle-down rotate-icon' : 'fa fa-angle-down'}></i>
            </CollapseHeader>
            <Collapse id="collapse1" isOpen={collapseID}>
              <CardBody>
                {description}
              </CardBody>
            </Collapse>
          </Card>

          <Card>
            <CollapseHeader onClick={this.toggleCollapse('collapse2')}>Location
              <i className={collapseID === 'collapse2' ? 'fa fa-angle-down rotate-icon' : 'fa fa-angle-down'}></i>
            </CollapseHeader>
            <Collapse id="collapse2" isOpen={collapseID}>
              <CardBody>
                <MDBRow>
                  <MDBCol lg="9" className="lg-0 mb-4">
                    <div
                      id="map-container"
                      className="rounded z-depth-1-half map-container"
                      style={{ height: "400px" }}
                    >
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d76765.98321148289!2d-73.96694563267306!3d40.751663750099084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1525939514494"
                        title="This is a unique title"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                      />
                    </div>
                  </MDBCol>
                  <MDBCol lg="3" className="lg-0 mb-4">
                    <MDBBtn tag="a" floating color="blue" className="accent-1">
                      <MDBIcon icon="map-marker" />
                    </MDBBtn>
                    <p className="mb-md-0">
                      {location.numberOfStreet}</p>
                    <p className="mb-md-0">
                      {location.streetName}
                    </p>
                    <p className="mb-md-0">
                      {location.city}
                    </p>
                    <p className="mb-md-0">
                      {location.zipCode}
                    </p>
                    <p className="mb-md-0">
                      {location.placeKnownAs}
                    </p>
                    <p className="mb-md-0">
                      {location.address}
                    </p>
                    <p className="mb-md-0">
                      {location.country}
                    </p>
                  </MDBCol>
                </MDBRow>
              </CardBody>
            </Collapse>
          </Card>

          <Card>
            <CollapseHeader onClick={this.toggleCollapse('collapse3')}>Write to {to}
              <i className={collapseID === 'collapse3' ? 'fa fa-angle-down rotate-icon' : 'fa fa-angle-down'}></i>
            </CollapseHeader>
            <Collapse id="collapse3" isOpen={collapseID}>
              <CardBody>
                <SendEmail onSendingEmailm={onSendingEmailm} />
              </CardBody>
            </Collapse>
          </Card>
        </Container>
      </Container>
    );
  }
}

export default DetailsAccordion;