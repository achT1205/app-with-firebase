import React from "react";
import { MDBRow, MDBCarousel, MDBCarouselInner } from "mdbreact";
import CarouselItem from './CarouselItem';
const RelatedAnnouncements = (props) => {
  const { announcements } = props;
  const length = announcements.length;
  return (
    <section className="text-center my-5">
      <h2 className="h1-responsive font-weight-bold text-center my-5">
        You may like this too !
      </h2>
      <MDBCarousel
        activeItem={1}
        length={length/3}
        slide={true}
        showControls={true}
        showIndicators={true}
        multiItem
      >
        <MDBCarouselInner>
          <MDBRow>
            {length > 0 && <CarouselItem item={1} announcements={announcements.slice(0, 3)} />}
            {length > 3 && <CarouselItem item={2} announcements={announcements.slice(3, 6)} />}
          </MDBRow>
        </MDBCarouselInner>
      </MDBCarousel>
    </section>
  );
}

export default RelatedAnnouncements;