import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Pages.css";
import Sidebar from "../Sidebar";

function Dashproducts() {
  const form = useRef();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [infoImage, setInfoImage] = useState(null);

  const [newInfo, setNewInfo] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    size: "",
    color: "",
    quantity: "",
    image: null,
    images: null,
  });

  const APIKEY = "https://e-commerce-back-end-production.up.railway.app/api/products/getproducts";

  const Products = async () => {
    try {
      const res = await axios.get(APIKEY);
      setAllProducts(res.data.productList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Products();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newInfo.name);
    // formData.append("attribute", newInfo.attribute[color]);
    formData.append("price", newInfo.price);
    formData.append("description", newInfo.description);
    formData.append("countInStock", newInfo.countInStock);
    formData.append("category", newInfo.category._id);
    formData.append("size", newInfo.size);
    formData.append("color", newInfo.color);
    formData.append("image", infoImage.images);
    formData.append("images", infoImage.images);

    try {
      const response = await axios.post(
        "https://e-commerce-back-end-production.up.railway.app/api/products/createproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Added Successfully", 2000);
      Products();
      setNewInfo({
        name: newInfo.name,
        price: newInfo.price,
        description: newInfo.description,
        countInStock: newInfo.countInStock,
        category: newInfo.category._id,
        size: newInfo.size,
        color: newInfo.color,
        quantity: newInfo.quantity,
        image: newInfo.images,
        images: newInfo.images,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(
      `https://e-commerce-back-end-production.up.railway.app/api/products/deleteproduct/${id}`
    );
    toast.success("Deleted Successfully", 2000);
    await Products();
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
    formData.append("name", selectedInfo.name);
    formData.append("price", selectedInfo.price);
    formData.append("description", selectedInfo.description);
    formData.append("countInStock", selectedInfo.countInStock);
    formData.append("category", selectedInfo.category);
    formData.append("sizes", selectedInfo.sizes);
    formData.append("colors", selectedInfo.color);
    formData.append("image", infoImage);
    formData.append("images", infoImage);


    await axios.put(
      `https://e-commerce-back-end-production.up.railway.app/api/products/updateproduct/${selectedInfo._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success("Updated Successfully", 2000);
    setIsUpdateMode(false);
    Products();
  };
  return (
    <div className='compflex'>
      <Sidebar />
      <div className='container-info'>
        <h1 className='Item-dash-header'>Products</h1>

        <div>
          <form
            ref={selectedInfo}
            className='contact-formmm'
            encType='multipart/form-data'
          >
            <input
              className='inputadd'
              type='text'
              value={newInfo.name}
              onChange={(e) => setNewInfo({ ...newInfo, name: e.target.value })}
              placeholder='Enter Name'
            />
            <input
              className='inputadd'
              type='text'
              value={newInfo.price}
              onChange={(e) =>
                setNewInfo({ ...newInfo, price: e.target.value })
              }
              placeholder='Enter Price'
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
              type='text'
              value={newInfo.countInStock}
              onChange={(e) =>
                setNewInfo({ ...newInfo, countInStock: e.target.value })
              }
              placeholder='Enter Quantity'
            />
            <input
              className='inputadd'
              type='text'
              value={newInfo.category}
              onChange={(e) =>
                setNewInfo({ ...newInfo, category: e.target.value })
              }
              placeholder='Enter Category'
            />
            <input
              className='inputadd'
              type='text'
              value={newInfo.size}
              onChange={(e) => setNewInfo({ ...newInfo, size: e.target.value })}
              placeholder='Enter Sizes'
            />
            <input
              className='inputadd'
              type='text'
              value={newInfo.color}
              onChange={(e) =>
                setNewInfo({ ...newInfo, color: e.target.value })
              }
              placeholder='Enter Colors'
            />
            <input
              className='inputadd'
              type='file'
              value={newInfo.image}
              onChange={(e) => handleImage(e)}
            />
            <input
              className='inputadd'
              multiple='multiple'
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
              value={selectedInfo.name}
              onChange={(e) =>
                setSelectedInfo({ ...selectedInfo, name: e.target.value })
              }
            />
            <input
              className='inputadd'
              type='text'
              value={selectedInfo.price}
              onChange={(e) =>
                setSelectedInfo({ ...selectedInfo, price: e.target.value })
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
              type='text'
              value={selectedInfo.countInStock}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  countInStock: e.target.value,
                })
              }
            />
            <input
              className='inputadd'
              type='text'
              value={selectedInfo.category}
              onChange={(e) =>
                setSelectedInfo({ ...selectedInfo, category: e.target.value })
              }
            />
            <input
              className='inputadd'
              type='text'
              value={selectedInfo.sizes}
              onChange={(e) =>
                setSelectedInfo({ ...selectedInfo, sizes: e.target.value })
              }
            />
            <input
              className='inputadd'
              type='text'
              value={selectedInfo.colors}
              onChange={(e) =>
                setSelectedInfo({ ...selectedInfo, colors: e.target.value })
              }
            />
            <input
              className='inputadd'
              type='file'
              value={newInfo.image}
              onChange={(e) => setInfoImage(e.target.files[0])}
            />{" "}
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
          <table>            
            <tbody className='product-table-tbody'>
              {allProducts.map((info, index) => (
                <tr className='product-table-tbody-tr' key={index}>
                  <td>{index + 1}</td>
                  <td>{info.name}</td>
                  <td>{info.price}</td>
                  <td>{info.description}</td>
                  <td>{info.countInStock}</td>
                  <td>{info.category.name}</td>
                  <td>
                    {info.attribute.map((info, index) => (
                      <p>
                        Size {index}: {info.size}
                      </p>
                    ))}
                  </td>
                  <td>
                    {info.attribute.map((info, index) => (
                      <p>
                        Color {index}: {info.color}
                      </p>
                    ))}
                  </td>
                  <td className='product-dash-image'>
                    <img src={info.image} alt={info.image} />
                  </td>
                  <td>
                    <img src={info.images} alt={info.images} />
                  </td>

                  <td>
                    <button
                      className='buttonedit-product'
                      onClick={() => handleUpdate(info)}
                    >
                      Edit
                    </button>
                    <button
                      className='buttondelete-product'
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

export default Dashproducts;
