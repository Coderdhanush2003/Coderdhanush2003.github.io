import React from 'react';

const CustomCarousel = ({ text, imageSrc, keyProp }) => {
  return (
    <div className="carousel-image-container h-72" key={keyProp}>
      <img
        src={imageSrc}
        className="d-block w-full h-full rounded-lg"
        alt={text}
      />
      <p className="image-overlay-text">{text}</p>
    </div>
  );
};

export default CustomCarousel;