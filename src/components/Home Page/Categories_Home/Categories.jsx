import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function Categories() {
  const [alldata, setAllData] = useState([]);

  const apiURL = "https://e-commerce-back-end-production.up.railway.app/api/category/allcategories";

  const fetchallData = async () => {
    try {
      const response = await axios.get(apiURL);
      setAllData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchallData();
  }, []);

  const settings = {
    desktop: {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
    },

    mobile: {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  };

  const responsiveSettings =
    window.innerWidth < 768 ? settings.mobile : settings.desktop;
  const sliderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };



  return (
    <div className="container_categories">
      <div>
        <Slider {...responsiveSettings} style={sliderStyle}>
          {alldata.length > 0 ? (
            alldata.map((item) => (
              
              <div className="img_text_categories_home" key={item._id}>
              <Link to={`single-category/${item._id}`}>

                <img
                  className="img_categories_home"
                  src={`https://e-commerce-back-end-production.up.railway.app/${item.image}`}
                  alt={item.name}
                />
                <h6 className="text_under_categories">{item.name}</h6>
              </Link>

              </div>

            ))
          ) : (
            <p>No data available</p>
          )}
        </Slider>
      </div>
    </div>
  );
}

export default Categories;