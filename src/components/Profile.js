import React from "react";
import { MDBContainer, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBTestimonial, MDBAvatar, MDBIcon } from "mdbreact";

const TestimonialsPage = ({user} = this.props) => {
  return (
    <MDBContainer>
      <section className="text-center my-5">
          <MDBCarousel
            activeItem={1}
            length={1}
            testimonial
            interval={false}
            showIndicators={false}
            showControls={false}
            className="no-flex"
          >
            <MDBCarouselInner>
              <MDBCarouselItem itemId="1">
                <MDBTestimonial>
                  <MDBAvatar className="mx-auto mb-4">
                    <img
                      src={user && user.photoURL ? user.photoURL : '' }
                      className="rounded-circle img-fluid"
                      alt=""
                    />
                  </MDBAvatar>
                  <p>
                    <MDBIcon icon="quote-left" /> Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Quod eos id officiis hic
                    tenetur quae quaerat ad velit ab. Lorem ipsum dolor sit
                    amet, consectetur adipisicing elit. Dolore cum accusamus
                    eveniet molestias voluptatum inventore laboriosam labore
                    sit, aspernatur praesentium iste impedit quidem dolor
                    veniam.
                  </p>
                  <h4 className="font-weight-bold"> { user &&  user.displayName ? user.displayName : ''}</h4>
                  <h6 className="font-weight-bold my-3">
                    Founder at ET Company
                  </h6>
                  <MDBIcon icon="star" className="blue-text" />
                  <MDBIcon icon="star" className="blue-text" />
                  <MDBIcon icon="star" className="blue-text" />
                  <MDBIcon icon="star" className="blue-text" />
                  <MDBIcon icon="star-half-full" className="blue-text" />
                </MDBTestimonial>
              </MDBCarouselItem>
             </MDBCarouselInner>
          </MDBCarousel>
        </section>
    </MDBContainer>
  );
}

export default TestimonialsPage;