import React from "react";
import { MDBCarouselItem,MDBCol} from "mdbreact";
import RowCard from './RowCard';

const CarouselItem = ( props) => {
  const {announcements, item} = props;
  return (

    <MDBCarouselItem itemId={item}>
    {announcements.map(announcement => 
        <MDBCol md="4"
        key={announcement.id}
        >
        <RowCard announcement={announcement} />
      </MDBCol> )}
  </MDBCarouselItem>
  );
}

export default CarouselItem;
