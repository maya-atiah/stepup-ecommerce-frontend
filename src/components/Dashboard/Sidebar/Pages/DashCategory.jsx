import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Pages.css";
import Sidebar from "../Sidebar";

function DashCategory() {
  const form = useRef();
  const [allcategories, setAllCategories] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [infoImage, setInfoImage] = useState(null);

  const [newInfo, setNewInfo] = useState({
    info_name: "",
    info_product_id: "",
    info_image: null,
  });

  const APIKEY = "https://e-commerce-back-end-production.up.railway.app/api/category/allcategories";

  const Categories = async () => {
    try {
      const res = await axios.get(APIKEY);
      setAllCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Categories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newInfo.info_name);
    formData.append("image", infoImage);
    try {
      const response = await axios.post(
        "https://e-commerce-back-end-production.up.railway.app/api/category/createcategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Added Successfully", 2000);
      Categories();
      setNewInfo({
        info_name: "",
        info_image: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(
      `https://e-commerce-back-end-production.up.railway.app/api/category/deletecategory/${id}`
    );
    toast.success("Deleted Successfully", 2000);
    await Categories();
  };

  const handleUpdate = (info) => {
    setSelectedInfo(info);
    setIsUpdateMode(true);
  };

  const handleImage = (e) => {
    setInfoImage(e.target.files[0]);
  };

  const updateUser = async () => {
    const formData = new FormData();
    formData.append("name", selectedInfo.info_name);
    formData.append("image", infoImage);

    await axios.put(
      `https://e-commerce-back-end-production.up.railway.app/api/category/updatecategory/${selectedInfo._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success("Updated Successfully", 2000);
    setIsUpdateMode(false);
    Categories();
  };
  return (
    <div className='compflex'>
      <Sidebar />
      <div className='container-info'>
        <h1 className="Item-dash-header">Categories</h1>
        <div>
          <form
            ref={selectedInfo}
            className='contact-formm'
            encType='multipart/form-data'
          >
            <input
              className='inputadd'
              type='text'
              value={newInfo.info_name}
              onChange={(e) =>
                setNewInfo({ ...newInfo, info_name: e.target.value })
              }
              placeholder='Enter name'
            />
            <input
              className='inputadd'
              type='file'
              value={newInfo.info_image}
              onChange={(e) => handleImage(e)}
            />
            <button className='buttonadd' onClick={handleAdd}>
              Add
            </button>
          </form>
        </div>

        {isUpdateMode && (
          <div className='container-info-edit'>
            <input
              className='inputadd'
              type='text'
              value={selectedInfo.info_name}
              onChange={(e) =>
                setSelectedInfo({ ...selectedInfo, info_name: e.target.value })
              }
            />

            <input
              className='inputadd'
              type='file'
              value={newInfo.info_image}
              onChange={(e) => setInfoImage(e.target.files[0])}
            />

            <div className='compflexbutton'>
              <button className='buttonadd' onClick={() => updateUser()}>
                Save
              </button>
              <button
                className='buttonadd'
                onClick={() => setIsUpdateMode(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div>
          <table>
            <thead>
              <tr>
                <th scope='col'>NB</th>
                <th scope='col'>Name</th>
                <th scope='col'>Image</th>
              </tr>
            </thead>
            <tbody>
              {allcategories.map((info, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{info.name}</td>
                  <td>
                    <img src={info.image} alt={info.image} />
                  </td>

                  <td>
                    <button
                      className='buttonedit'
                      onClick={() => handleUpdate(info)}
                    >
                      Edit
                    </button>
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

export default DashCategory;
