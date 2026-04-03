// No edit
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import './carousel.css'; // Import the CSS file

function DarkVariantExample() {
  return (
    <Carousel className="mt-0">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://blainepardoe.wordpress.com/wp-content/uploads/2023/06/flash.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>The Flash</h5>
          <p>Watch the flash and enjoy!!.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://preview.redd.it/r74159lipa881.png?auto=webp&s=1ddb9ffc5e0c5d8fd7e955cd5d462ebcbfd53cc4"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Spider-Man No Way Home</h5>
          <p>Three spidies from another universes come for team up! What News!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://1.vikiplatform.com/c/40913c/35f724a5fe.jpg?x=b"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Study Group</h5>
          <p>
            See what this boy will change the school!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;

// No editt