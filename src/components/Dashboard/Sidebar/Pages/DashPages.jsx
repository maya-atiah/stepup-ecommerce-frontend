import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Pages.css";
import Sidebar from "../Sidebar";

function DashPages() {
  const form = useRef();
  const [allPages, setAllPages] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [infoImage, setInfoImage] = useState(null);

  const [newInfo, setNewInfo] = useState({
    type: "",
    description: "",
    title: "",
    images: null,
  });

  const APIKEY = "https://e-commerce-back-end-production.up.railway.app/api/pages/getallpages";

  const Pages = async () => {
    try {
      const res = await axios.get(APIKEY);
      setAllPages(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Pages();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", newInfo.type);
    formData.append("title", newInfo.title);
    formData.append("description", newInfo.description);
    formData.append("images", infoImage);
    try {
      const response = await axios.post(
        "https://e-commerce-back-end-production.up.railway.app/api/pages/createpage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Added Successfully", 2000);
      Pages();
      setNewInfo({
        type: "",
        title: "",
        description: "",
        images: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://e-commerce-back-end-production.up.railway.app/api/pages/deletepage/${id}`);
    toast.success("Deleted Successfully", 2000);
    await Pages();
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
    formData.append("type", selectedInfo.type);
    formData.append("title", selectedInfo.title);
    formData.append("description", selectedInfo.description);
    formData.append("images", infoImage);

    await axios.put(
      `https://e-commerce-back-end-production.up.railway.app/api/pages/updatepage/${selectedInfo._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success("Updated Successfully", 2000);
    setIsUpdateMode(false);
    Pages();
  };
  return (
    <div className='compflex'>
      <Sidebar />
      <div className='container-info'>
      <h1 className="Item-dash-header">Pages</h1>

        <div>
          <form
            ref={selectedInfo}
            // className='contact-formm'
            encType='multipart/form-data'
          >
            <input
              className='inputadd'
              type='text'
              value={newInfo.type}
              onChange={(e) => setNewInfo({ ...newInfo, type: e.target.value })}
              placeholder='Enter type'
            />
            <input
              className='inputadd'
              type='text'
              value={newInfo.title}
              onChange={(e) =>
                setNewInfo({ ...newInfo, title: e.target.value })
              }
              placeholder='Enter title'
            />
            <input
              className='inputadd'
              type='text'
              value={newInfo.description}
              onChange={(e) =>
                setNewInfo({ ...newInfo, description: e.target.value })
              }
              placeholder='Enter description'
            />

            <input
              className='inputadd'
              type='file'
              value={newInfo.images}
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
              value={selectedInfo.type}
              onChange={(e) =>
                setSelectedInfo({ ...selectedInfo, type: e.target.value })
              }
            />
            <input
              className='inputadd'
              type='text'
              value={selectedInfo.title}
              onChange={(e) =>
                setSelectedInfo({ ...selectedInfo, title: e.target.value })
              }
            />
            <input
              className='inputadd'
              type='text'
              value={selectedInfo.description}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  description: e.target.value,
                })
              }
            />

            <input
              className='inputadd'
              type='file'
              value={newInfo.images}
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
          <table className="dashboard-table">
            <thead>
              <tr>
                <th scope='col'>NB</th>
                <th scope='col'>type</th>
                <th scope='col'>title</th>
                <th scope='col'>description</th>
                <th scope='col'>Image</th>
              </tr>
            </thead>
            <tbody>
              {allPages.map((info, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{info.type}</td>
                  <td>{info.title}</td>
                  <td>{info.description}</td>
                  <td>
                    <img src={info.images} alt={info.images} />
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

export default DashPages;
