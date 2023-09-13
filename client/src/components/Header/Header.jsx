import React from "react";
import Slider from "react-slick";
import "./Header.css";
import heroImage from "./hero_bg.png";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";
import { Link } from "react-router-dom";

function Header({sliders}){
  const BACKEND_ROOT_URL = process.env.REACT_APP_BACKEND_URL;
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        margin: 30,
        nextArrow: <FaArrowRight />,
        prevArrow: <FaArrowLeft />,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "linear"
      };
      return (
        // background-repeat: no-repeat;background-image: url(&quot;/static/media/hero_bg.daaa9b02c54bbdddccbc.png&quot;);object-fit: cover;background-size: cover;background-position: center center;
        <div style={{backgroundImage: `url("${heroImage}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover'}}>
          <Slider {...settings} className="slider_wrapper">
            {
              sliders && sliders?.map(slider => (
                <div key={slider._id}>
                <div className="single_slider">
                  <div className="slider_content">
                      <h1>{slider.title}</h1>
                      <p dangerouslySetInnerHTML={{ __html: slider.content.slice(0, 50).concat('…') }}></p>
                  <Link to={`post/${slider._id}`} className="read-more">More</Link>
                  </div>
                  <div className="slider_image">
                      <img src={`${BACKEND_ROOT_URL}/media/${slider.featured_image}`} alt={slider.title} />
                  </div>
                </div>
              </div>
              ))
            }
          </Slider>
        </div>
      );
}

export default Header;