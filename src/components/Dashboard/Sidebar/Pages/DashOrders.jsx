import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Pages.css";
import Sidebar from "../Sidebar";
import secureLocalStorage from "react-secure-storage";

function DashOrders() {
  const form = useRef();
  const [allOrders, setAllOrders] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  async function fetchData() {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.get(
        "https://e-commerce-back-end-production.up.railway.app/api/authorized/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Set the items in state
      setAllOrders(response.data.orders);
    } catch (error) {
      console.error("what", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    const token = secureLocalStorage.getItem("token");
    await axios.delete(
      `https://e-commerce-back-end-production.up.railway.app/api/authorized/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Deleted Successfully", 2000);
    await fetchData();
  };

  const handleUpdate = (info) => {
    setSelectedInfo(info);
    setIsUpdateMode((current) => !current);
  };

  const updateUser = async () => {
    const updatedCart = selectedInfo.cart.map((item) => ({
      ...item,
      quantity: item.quantity, // Update the quantity property
      color: item.color, // Update the color property
    }));

    const updatedInfo = {
      ...selectedInfo,
      status: selectedInfo.status,
      payment_status: selectedInfo.payment_status,
      cart: updatedCart,
    };

    const token = secureLocalStorage.getItem("token");

    await axios.put(
      `https://e-commerce-back-end-production.up.railway.app/api/authorized/orders/${selectedInfo._id}`,
      updatedInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Updated Successfully", 2000);
    setIsUpdateMode(false);
    fetchData();
  };
  return (
    <div className="compflex">
      <Sidebar />
      <div className="container-info">
        <h1 className="Item-dash-header">Orders</h1>

        {isUpdateMode && (
          <div className="container-info">
            <p>Order Status</p>
            <input
              className="checkbox_dash"
              type="checkbox"
              value={selectedInfo.status}
              checked={selectedInfo.status}
              onChange={(e) =>
                setSelectedInfo({ ...selectedInfo, status: e.target.checked })
              }
            />
            <p className="Payment_status_dash">Payment Status</p>
            <input
              className="checkbox_dash"
              type="checkbox"
              value={selectedInfo.payment_status}
              checked={selectedInfo.payment_status}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  payment_status: e.target.checked,
                })
              }
            />

            <div className="compflexbutton">
              <button className="buttonadd" onClick={updateUser}>
                Save
              </button>
              <button
                className="buttonadd"
                onClick={() => setIsUpdateMode(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div>
          <table className="order-dash-table">
            <thead>
              <tr className="order-table-thead-tr">
                <th scope="col">NB</th>
                <th scope="col">quantity</th>
                <th scope="col">Order Status</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Ordered At</th>
                <th scope="col">Color</th>
                <th scope="col">size</th>
                <th scope="col">FullName</th>
                <th scope="col">phoneNumber</th>
                <th scope="col">name</th>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody className="order-table-tbody">
              {allOrders.map((info, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{info.cart.map((info) => info.quantity)}</td>
                  <td>{info.status ? "Delivered" : "pending"}</td>
                  <td>{info.payment_status ? "Paid" : "pending"}</td>
                  <td>{info.createdAt}</td>
                  {/* <td>{info.user_id.fullName} </td> */}

                  {/* <td>{info.user_id.map((info) => (info.fullName)
                                        )}</td> */}
                  <td>{info.cart.map((info) => info.color)}</td>
                  <td>
                    {info.cart.map((info, index) => (
                      <p>
                        Product {index}: {info.size}
                      </p>
                    ))}{" "}
                  </td>
                  <td>{info.user_id?.fullName ?? ""}</td>
                  <td>{info.user_id?.phoneNumber ?? ""}</td>

                  <td>{info.cart.map((info) => info.product_id.name)}</td>
                  <td>{info.total_price}</td>
                  <td>
                    <button
                      className="buttonedit"
                      onClick={() => handleUpdate(info)}
                    >
                      Edit
                    </button>
                    <button
                      className="buttondelete"
                      onClick={() => deleteUser(info._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default DashOrders;
