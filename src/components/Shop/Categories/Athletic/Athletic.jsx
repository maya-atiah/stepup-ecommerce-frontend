import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../Loader/Loader";

function Athletic() {
const [alldata, setAllData] = useState([]);
const [loading,setLoading] = useState(true);


  const apiURL = "https://e-commerce-back-end-production.up.railway.app/api/products/getproducts";

  const fetchAllData = async () => {
    try {
      const response = await axios.get(apiURL);
      setAllData(response.data?.productList || []); 
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  if(loading){
    return <div> <Loader/> </div>
  }

  if (alldata && alldata.length > 0) {
    const filteredData = alldata.filter((item) =>
      item.category._id.includes("6437ba7ba671878f61ce7e42")
    );
    return (
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item._id}>
              <h2>{item.name}</h2>
              <img src={item.image} alt={item.name} />
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    );
  } else {
    return <p>No data available</p>;
  }
}

export default Athletic;
