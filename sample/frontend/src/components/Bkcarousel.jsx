import React from 'react';
import Slider from 'react-slick';
import './Bkcarousel.css'; // Create this file for styling
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css';

const Bkcarousel = () => {
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
          
          <img src="https://www.wallpapertip.com/wmimgs/12-124272_hamburgers-uhd-4k-wallpaper-burger-hd.jpg" alt="Pizza" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Flavoured Ice Cream</h3>
            <p> Ice Cream delivered in under 30 minutes!</p>
          </div>
        </div>
        <div>
          <img src="https://wallpaperbat.com/img/497232-burger-wallpaper-top-free-burger-background.jpg" alt="Sushi" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Fresh Sushi Rolls</h3>
            <p>Get your sushi fix with our premium selection.</p>
          </div>
        </div>
        <div>
          <img src="https://wallpapercave.com/wp/wp7029404.jpg" alt="Burgers" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Juicy Burgers</h3>
            <p>Try our famous gourmet burgers with crispy fries.</p>
          </div>
        </div>
        <div>
          <img src="https://wallpaperaccess.com/full/8671602.jpg" alt="Salads" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Healthy Salads</h3>
            <p>Order fresh, organic salads for a healthy meal.</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Bkcarousel;
