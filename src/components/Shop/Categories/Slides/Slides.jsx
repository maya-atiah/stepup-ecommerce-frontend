import React, { useEffect, useState } from "react";
import axios from "axios";

function Slides() {
  const [alldata, setallData] = useState([]);

  const apiURL = "https://stepup-rjvy.onrender.com/api/products/getproducts";

  const fetchAllData = async () => {
    try {
      const response = await axios.get(apiURL);
      setallData(response.data.productList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  if (alldata && alldata.length > 0) {
    const filteredData = alldata.filter((item) =>
      item.category._id.includes("643feb6092947e7429c6dfc4")
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

export default Slides;
