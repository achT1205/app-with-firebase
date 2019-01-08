import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer } from "mdbreact";

import DetailsCarousel from './DetailsCarousel';
import DetailsAccordion from './DetailsAccordion';
import DetailsContact from './DetailsContact';
import RelatedAnnouncements from './RelatedAnnouncements';
const DetailsDesktop = props => {
    const { announcement, onSendingEmailm,handleInputChange,formValues, user, redirectToProfile, redirectToChat, relateds, currentUser } = props;
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
                                        <DetailsCarousel images={announcement.images} />
                                    </MDBCol>
                                    <MDBCol sm="1"></MDBCol>
                                    <MDBCol sm="4">
                                        <DetailsContact
                                            owner={announcement.owner}
                                            user={user}
                                            redirectToProfile={redirectToProfile}
                                            redirectToChat={redirectToChat}
                                            currentUser ={currentUser} />
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
                                    handleInputChange={handleInputChange}
                                    formValues={formValues}
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
                                <RelatedAnnouncements announcements={relateds} />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};

export default DetailsDesktop;
