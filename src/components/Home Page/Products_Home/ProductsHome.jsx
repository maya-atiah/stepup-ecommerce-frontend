import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./ProductsHome.css";
import { Link } from "react-router-dom";
import { RiBookmarkFill } from "react-icons/ri";


function ProductsHome() {
  const [alldata, setAllData] = useState([]);
  // const [loading,setLoading] = useState(true);

  const apiURL = "https://e-commerce-back-end-production.up.railway.app/api/products/getproducts";

  const fetchallData = async () => {
    try {
      const response = await axios.get(apiURL);
      setAllData(response.data.productList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchallData();
  }, []);


  return (
    <div className='container_products'>
      <div className='group_title_product'>
        <h1 className='title_product'>Our Products</h1>
        <p>List of our products</p>
      </div>
      <div className='container_products_ticp'>
        {alldata.length > 0 ? (
          alldata
            .sort((a, b) => b._id.localeCompare(a._id))
            .slice(0, 8)
            .map((item) => (
              <div className='ticp' key={item._id}>
                {item.is_new_release && (
                  <p className='new-release-home'> </p>
                )}
               
                <Link to={`/single-product/${item._id}`}>
                  <img className='img_products_home' src={`${item.image}`} />
                  <Fragment>
                    <h5>{item.category ? item.category.name : "N/A"}</h5>
                  </Fragment>{" "}
                  <h5 className='title_product_item'> {item.name}</h5>
                  <h5>{item.price} $</h5>
                </Link>
              </div>
            ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default ProductsHome;
