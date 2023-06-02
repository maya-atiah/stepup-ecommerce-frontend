import { useParams } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./SingleCategory.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

function SingleCategory() {
  const { categoryId } = useParams();

  const [allproduct, setallproductData] = useState([]);
  const [loading,setLoading] = useState(true);

  const apiURL = `https://e-commerce-back-end-production.up.railway.app/api/products/getproductsbycategory/${categoryId}`;

  const fetchAllProduct = async () => {
    try {
      const response = await axios.get(apiURL);
      setallproductData(response.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);
  if(loading){
    return <div> <Loader/> </div>
  }

  if (!allproduct || allproduct.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="container_single_cat">
      <div className="group_title_single_cat">
        <h1 className="title_single_cat">
          {allproduct[0]?.category?.name || "N/A"}
        </h1>
      </div>

      <div className="container_category_ticp_cat">
        {allproduct.map((item) => (
          <div className="ticp_cat" key={item._id}>
            <Link to={`/single-product/${item._id}`}>
              <img className="img_single_cat" src={item.image} alt="" />
              <h5>{item.category?.name || "N/A"}</h5>
              <h5 className="title_single_item">{item.name}</h5>
              <h5>{item.price} $</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleCategory;