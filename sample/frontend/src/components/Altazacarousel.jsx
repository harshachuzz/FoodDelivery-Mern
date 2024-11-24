import React from 'react';
import Slider from 'react-slick';
import './Chickingcarousel.css'; // Create this file for styling
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css';

const Chickingcarousel = () => {
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
          
          <img src="https://i.ytimg.com/vi/x4DZVIZI2I8/maxresdefault.jpg" alt="Pizza" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Flavoured Ice Cream</h3>
            <p> Ice Cream delivered in under 30 minutes!</p>
          </div>
        </div>
        <div>
          <img src="https://static.vecteezy.com/system/resources/previews/022/007/194/large_2x/tasty-doner-kebab-shawarma-roll-wrap-illustration-generative-ai-food-photo.jpeg" alt="Sushi" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Fresh Sushi Rolls</h3>
            <p>Get your sushi fix with our premium selection.</p>
          </div>
        </div>
        <div>
          <img src="https://wallpapercave.com/wp/wp6651947.jpg" alt="Burgers" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Juicy Burgers</h3>
            <p>Try our famous gourmet burgers with crispy fries.</p>
          </div>
        </div>
        
      </Slider>
    </div>
  );
};

export default Chickingcarousel;
