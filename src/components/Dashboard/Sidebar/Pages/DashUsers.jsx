import axios from "axios";
import "./Pages.css";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Pages.css";
import Sidebar from "../Sidebar";
import secureLocalStorage from "react-secure-storage";

function YourComponent() {
  const form = useRef();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const [newInfo, setNewInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
    role: "",
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

    async function fetchData() {
        
    const token = secureLocalStorage.getItem("token");
      
    try {
        
      const response = await axios.get(
        "https://e-commerce-back-end-production.up.railway.app/api/users/getall",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Set the items in state
      setItems(response.data.user);
    } catch (error) {
      console.error("what", error);
    }
  }

  const handleAdd = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("fullName", newInfo.fullName);
      formData.append("email", newInfo.email);
      formData.append("password", newInfo.password);
      formData.append("phoneNumber", newInfo.phoneNumber);
      formData.append("location", newInfo.location);
      try {
          const response = await axios.post(
              "https://e-commerce-back-end-production.up.railway.app/api/users/register", formData,
              {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  },
              }
          );

          toast.success("Added Successfully", 2000);
          fetchData();
          setNewInfo({
              fullName: '',
              email: '',
              password: '',
              phoneNumber: '',
              location: '',

          });
      } catch (error) {
          console.error(error);
      }
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://e-commerce-back-end-production.up.railway.app/api/users/delete/${id}`);
    toast.success("Deleted Successfully", 2000);
    await fetchData();
  };

  return (
    <div className='compflex'>
      <Sidebar />
      <div className='container-info'>
        <div>
        <h1 className="Item-dash-header">Users</h1>

           <form
                        ref={selectedInfo}
                        className="contact-formm"
                        encType="multipart/form-data"
                    >
                        <input
                            className="inputadd"
                            type="text"
                            value={newInfo.fullName}
                            onChange={(e) =>
                                setNewInfo({ ...newInfo, fullName: e.target.value })
                            }
                            placeholder="Enter FullName"
                        />
                        <input
                            className="inputadd"
                            type="text"
                            value={newInfo.email}
                            onChange={(e) =>
                                setNewInfo({ ...newInfo, email: e.target.value })
                            }
                            placeholder="Enter Email"
                        /><input
                            className="inputadd"
                            type="text"
                            value={newInfo.password}
                            onChange={(e) =>
                                setNewInfo({ ...newInfo, password: e.target.value })
                            }
                            placeholder="Enter Password"
                        /><input
                            className="inputadd"
                            type="text"
                            value={newInfo.phoneNumber}
                            onChange={(e) =>
                                setNewInfo({ ...newInfo, phoneNumber: e.target.value })
                            }
                            placeholder="Enter PhoneNumber"
                        /><input
                            className="inputadd"
                            type="text"
                            value={newInfo.location}
                            onChange={(e) =>
                                setNewInfo({ ...newInfo, location: e.target.value })
                            }
                            placeholder="Enter Location"
                        /> 

         <button className="buttonadd" onClick={handleAdd}>
                            Add
                        </button> 
          </form> 
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th scope='col'>NB</th>
                <th scope='col'>FullName</th>
                <th scope='col'>Email</th>
                {/* <th scope="col">Password</th> */}
                <th scope='col'>PhoneNumber</th>
                <th scope='col'>Location</th>
                <th scope='col'>Role</th>
              </tr>
            </thead>
            <tbody>
              {items.map((info, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{info.fullName}</td>
                  <td>{info.email}</td>
                  {/* <td>{info.password}</td> */}
                  <td>{info.phoneNumber}</td>
                  <td>{info.location}</td>
                  <td>{info.role}</td>
                  <td>
                    <button
                      className='buttondelete'
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

export default YourComponent;
