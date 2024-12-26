import React from "react";
import { Carousel as BootstrapCarousel } from "react-bootstrap";
import CustomCarousel from "../components/CustomCarousel";
import banner_1 from "../assets/banner_1.jpg";
import banner_2 from "../assets/banner_2.jpg";
import banner_3 from "../assets/banner_3.jpg";

const slides = [
  {
    id: 1,
    imageSrc:
    banner_1,
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet...",
    imageSrc:
    banner_2,
  },
  {
    id: 3,
    text: "Praesent commodo cursus magna...",
    imageSrc:
    banner_3,
  },
  
];

function Slider() {
  return (
    <BootstrapCarousel className="z-0">
    {slides.map((slide) => (
      <BootstrapCarousel.Item key={slide.id} >
        <CustomCarousel text={slide.text} imageSrc={slide.imageSrc} keyProp={slide.id} />
      </BootstrapCarousel.Item>
    ))}
  </BootstrapCarousel>
  );
}

export default Slider;
