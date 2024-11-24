import React from 'react';
import Slider from 'react-slick';
import './Dominospizzacarousel.css'; // Create this file for styling
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css';

const Dominospizzacarousel = () => {
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
          
          <img src="https://wallpapers.com/images/hd/pacific-veggie-dominos-pizza-mywuwotiaoda3z06.jpg" alt="Pizza" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Flavoured Ice Cream</h3>
            <p> Ice Cream delivered in under 30 minutes!</p>
          </div>
        </div>
        <div>
          <img src="https://wallpapers.com/images/hd/dominos-pizza-quality-cgw4da28romhh7jb.jpg" alt="Sushi" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Fresh Sushi Rolls</h3>
            <p>Get your sushi fix with our premium selection.</p>
          </div>
        </div>
        <div>
          <img src="https://i2-prod.hulldailymail.co.uk/news/uk-world-news/article7819084.ece/ALTERNATES/s1200/0_image001-16.jpg" alt="Burgers" className="carousel-image" />
          <div className="carousel-caption">
            <h3>Juicy Burgers</h3>
            <p>Try our famous gourmet burgers with crispy fries.</p>
          </div>
        </div>
        
      </Slider>
    </div>
  );
};

export default Dominospizzacarousel;
