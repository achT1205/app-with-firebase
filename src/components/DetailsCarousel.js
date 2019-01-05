import React from "react";
import { Carousel, CarouselInner, CarouselItem, View, Mask } from "mdbreact";

const DetailsCarousel = (props) => {
  const { images } = props;
  return (
    <Carousel
      activeItem={1}
      length={images.length}
      showControls={true}
      showIndicators={true}
      thumbnails={false}
      className="z-depth-1">
      <CarouselInner>
        {images.length > 0 &&
          images.map((image, index) =>
            <CarouselItem itemId={index + 1} key={index}>
              <View>
                <img className="d-block w-100" src={image.thumb} alt="slide" />
                <Mask overlay="black-light" />
              </View>
            </CarouselItem>
          )
        }
      </CarouselInner>
    </Carousel>
  );
}

export default DetailsCarousel;