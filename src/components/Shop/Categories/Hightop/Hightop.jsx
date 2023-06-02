import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../Loader/Loader";

function Hightop() {
  const [alldata, setallData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiURL = "https://e-commerce-back-end-production.up.railway.app/api/products/getproducts";

  const fetchallData = async () => {
    try {
      const response = await axios.get(apiURL);
      setallData(response.data?.productList || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchallData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (alldata && alldata.length > 0) {
    const filteredData = alldata.filter((item) =>
      item.category._id.includes("643fe9acc1397ac9890562cd")
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

export default Hightop;
