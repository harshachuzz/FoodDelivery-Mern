import React from 'react';
import Slider from 'react-slick';
import './Carousel.css'; // Create this file for styling
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    
    <div className="carousel-container">
      <Slider {...settings}>
        
        <div>
          
          <img src="https://png.pngtree.com/background/20230528/original/pngtree-an-arrangement-of-various-indian-food-picture-image_2778221.jpg" alt="Pizza" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Delicious Pizza</h3>
            <p>Hot and fresh pizza delivered in under 30 minutes!</p>
          </div>
        </div>
        <div>
          <img src="https://pixelz.cc/wp-content/uploads/2018/11/ice-cream-with-lavender-uhd-4k-wallpaper.jpg" alt="Sushi" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Fresh Sushi Rolls</h3>
            <p>Get your sushi fix with our premium selection.</p>
          </div>
        </div>
        <div>
          <img src="https://www.pixelstalk.net/wp-content/uploads/images5/4K-Food-HD-Wallpaper-Free-download.jpg" alt="Burgers" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Juicy Burgers</h3>
            <p>Try our famous gourmet burgers with crispy fries.</p>
          </div>
        </div>
        <div>
          <img src="https://png.pngtree.com/background/20230417/original/pngtree-fast-food-burger-fried-chicken-advertising-background-picture-image_2445022.jpg" alt="Salads" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Healthy Salads</h3>
            <p>Order fresh, organic salads for a healthy meal.</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
