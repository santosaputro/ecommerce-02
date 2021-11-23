import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

const Banner = () => {
  const images = require('../assets/images/logo.png').default;
  return (
    <Container>
      <Carousel indicators={false}>
        <Carousel.Item>
          <img className="d-block w-100" src={images} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={images} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={images} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Banner;
