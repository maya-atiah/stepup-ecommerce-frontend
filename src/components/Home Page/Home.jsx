import React, { useState, useEffect } from "react";
import Categories from "./Categories_Home/Categories";
import ProductsHome from "./Products_Home/ProductsHome";
import Slider from "./Slider/Slider";
import "./Home.css";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loader />;
  }
  const handleCLick = () => {
    navigate('about')
  }
  const handleClickExplore = () => {
     navigate("contact");
  }

  return (
    <div>
      <Slider />
      <Categories />
      <ProductsHome />

      <div className="container_home">
        <div className="column_home_1"></div>
        <div className="column_home_11">
          <h1>About us</h1>
          <br />
          <br />
          <p>
            All the products we send are accompanied by an authenticity card as
            well as a seal certifying the quality and authenticity of the
            product. Before reaching your hands, they are checked by our experts
            who ensure their authenticity.
            All the products we send are accompanied by an authenticity card as
            well as a seal certifying the quality and authenticity of the
            product. Before reaching your hands, they are checked by our experts
            who ensure their authenticity.
          </p>
          <br />
          <br />
          <button className="home_button"  onClick={handleCLick}>Explore more</button>
        </div>
      </div>
      <div className="container_home_2">
        <div className="column_home_22 ">
          <h1>Authentic products</h1>
          <br />
          <br />
          <p>
            All the products we send are accompanied by an authenticity card as
            well as a seal certifying the quality and authenticity of the
            product. Before reaching your hands, they are checked by our experts
            who ensure their authenticity.
            All the products we send are accompanied by an authenticity card as
            well as a seal certifying the quality and authenticity of the
            product. Before reaching your hands, they are checked by our experts
            who ensure their authenticity.
          </p>
          <br />
          <br />
          <button className="home_button" onClick={handleClickExplore}>Explore more</button>
        </div>
        <div className="column_home_2"></div>
      </div>
    </div>
  );
}

export default Home;
