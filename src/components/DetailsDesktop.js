import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer } from "mdbreact";

import DetailsCarousel from './DetailsCarousel';
import DetailsAccordion from './DetailsAccordion';
import DetailsContact from './DetailsContact';
import RelatedAnnouncements from './RelatedAnnouncements';
const DetailsDesktop = props => {
    const { announcement, onSendingEmailm } = props;
    return (
        <section className="my-5">
            <MDBContainer>
                <MDBRow className="mb-4">
                    <MDBCol sm="12">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>{announcement.title}</MDBCardTitle>
                                <MDBCardText>
                                    {announcement.shortDescription}
                                </MDBCardText>
                                <MDBRow>
                                    <MDBCol sm="7">
                                        <DetailsCarousel images={announcement.pictures} />
                                    </MDBCol>
                                    <MDBCol sm="1"></MDBCol>
                                    <MDBCol sm="4">
                                        <DetailsContact owner={announcement.owner} />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBContainer>
                <MDBRow className="mb-4">
                    <MDBCol sm="12">
                        <MDBCard>
                            <MDBCardBody>
                                <DetailsAccordion
                                    description={announcement.description}
                                    location={announcement.location}
                                    onSendingEmailm={onSendingEmailm}
                                    to={announcement.owner.name}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBContainer>
                <MDBRow className="mb-4">
                    <MDBCol sm="12">
                        <MDBCard>
                            <MDBCardBody>
                                {/*<RelatedAnnouncements announcements={announcement.owner.relateds} />*/}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};

export default DetailsDesktop;
