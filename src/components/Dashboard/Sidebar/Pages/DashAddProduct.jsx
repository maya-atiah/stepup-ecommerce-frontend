import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../Sidebar";

const DashAddProduct = () => {
  const [selectedInfo, setSelectedInfo] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [infoImage, setInfoImage] = useState(null);
  const [images, setImages] = useState([]);

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newInfo, setNewInfo] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    attribute: [{ size: "", color: "", quantity: "" }],
    images: [],
    image: null,
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", newInfo.name);
    formData.append("price", newInfo.price);
    formData.append("description", newInfo.description);
    formData.append("category", newInfo.category);
    formData.append("image", newInfo.image);
    formData.append("attribute", JSON.stringify(newInfo.attribute));

    for (let i = 0; i < newInfo.images.length; i++) {
      formData.append("images", newInfo.images[i]);
    }

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
      if (response.status !== 200) {
        throw new Error("Failed to create product");
      }

      setNewInfo({
        name: "",
        price: "",
        description: "",
        category: "",
        attribute: [{ size: "", color: "", quantity: "" }],
        images: [],
        image: null,
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://e-commerce-back-end-production.up.railway.app/api/category/allcategories"
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleImage(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setNewInfo((prevInfo) => ({ ...prevInfo, image: selectedFile }));
    }
  }

  function handleImages(e) {
    const filesArray = Array.from(e.target.files);
    if (filesArray.length > 0) {
      setNewInfo((prevInfo) => ({ ...prevInfo, images: filesArray }));
    }
  }

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

  const deleteProduct = async (id) => {
    await axios.delete(
      `https://e-commerce-back-end-production.up.railway.app/api/products/deleteproduct/${id}`
    );
    toast.success("Deleted Successfully", 2000);
    await Products();
  };

  const updateProduct = async (id) => {
    const formData = new FormData();
    formData.append("name", selectedInfo.name);
    formData.append("price", selectedInfo.price);
    formData.append("description", selectedInfo.description);
    formData.append("category", selectedInfo.category);
    formData.append("attribute", JSON.stringify(selectedInfo.attribute));

    for (let i = 0; i < newInfo.images.length; i++) {
      formData.append("images", newInfo.images[i]);
    }

    try {
      const response = await axios.put(
        `https://e-commerce-back-end-production.up.railway.app/api/products/updateproduct/${id}`,
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
      if (response.status !== 200) {
        throw new Error("Failed to update product");
      }

      setNewInfo({
        name: "",
        price: "",
        description: "",
        category: "",
        attribute: [{ size: "", color: "", quantity: "" }],
        images: [],
        image: null,
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleUpdate = (info) => {
    setSelectedInfo(info);
    setIsUpdateMode(true);
  };

  return (
    <div className='compflex'>
      <Sidebar />
      <div className='container-info'>
        <div>
          <div className='add-new-product'> Add a new product</div>
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

            <select
              id='category'
              name='category'
              value={newInfo.category}
              className='category-select'
              onChange={(e) =>
                setNewInfo({ ...newInfo, category: e.target.value })
              }
            >
              <option value=''>Select a Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ul>
              {newInfo.attribute.map((attribute, index) => (
                <li key={index} className='li-attribute'>
                  <label>
                    Size:
                    <input
                      type='text'
                      name='size'
                      className='attribute-input'
                      value={attribute.size}
                      required
                      onChange={(e) => {
                        const updatedAttribute = {
                          ...newInfo.attribute[index],
                          size: parseInt(e.target.value),
                        };
                        const updatedAttributes = [...newInfo.attribute];
                        updatedAttributes[index] = updatedAttribute;
                        setNewInfo((prevInfo) => ({
                          ...prevInfo,
                          attribute: updatedAttributes,
                        }));
                      }}
                    />
                  </label>
                  <label>
                    Color:
                    <input
                      type='text'
                      value={attribute.color}
                      className='attribute-input'
                      onChange={(e) => {
                        const updatedAttribute = {
                          ...newInfo.attribute[index],
                          color: e.target.value,
                        };
                        const updatedAttributes = [...newInfo.attribute];
                        updatedAttributes[index] = updatedAttribute;
                        setNewInfo((prevInfo) => ({
                          ...prevInfo,
                          attribute: updatedAttributes,
                        }));
                      }}
                      required
                    />
                  </label>
                  <label>
                    Quantity:
                    <input
                      type='number'
                      value={attribute.quantity}
                      className='attribute-input'
                      onChange={(e) => {
                        const updatedAttribute = {
                          ...newInfo.attribute[index],
                          quantity: parseInt(e.target.value),
                        };
                        const updatedAttributes = [...newInfo.attribute];
                        updatedAttributes[index] = updatedAttribute;
                        setNewInfo((prevInfo) => ({
                          ...prevInfo,
                          attribute: updatedAttributes,
                        }));
                      }}
                      required
                      min='0'
                    />
                  </label>
                  {index == 0 ? (
                    <button
                      type='button'
                      className='add-attribute'
                      onClick={() => {
                        setNewInfo((prevInfo) => ({
                          ...prevInfo,
                          attribute: [
                            ...newInfo.attribute,
                            { size: "", color: "", quantity: 0 },
                          ],
                        }));
                      }}
                    >
                      Add Attribute
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='add-attribute'
                      onClick={() => {
                        const updatedAttributes = [...newInfo.attribute];
                        updatedAttributes.splice(index, 1);
                        setNewInfo((prevInfo) => ({
                          ...prevInfo,
                          attribute: updatedAttributes,
                        }));
                      }}
                    >
                      Remove Attribute
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <input
              className='inputadd'
              type='file'
              onChange={(e) => handleImage(e)}
            />

            <input
              className='inputadd'
              type='file'
              multiple
              onChange={(e) => handleImages(e)}
            />

            <button className='buttonadd' onClick={handleFormSubmit}>
              Add
            </button>
          </form>
        </div>

        {isUpdateMode && (
          <div className='container-info'>
            <input
              className='inputadd'
              type='text'
              value={selectedInfo.name}
              onChange={(e) =>
                setSelectedInfo({ ...selectedInfo, name: e.target.value })
              }
              placeholder='Enter Name'
            />
            <input
              className='inputadd'
              type='text'
              value={selectedInfo.price}
              onChange={(e) =>
                setSelectedInfo({ ...selectedInfo, price: e.target.value })
              }
              placeholder='Enter Price'
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
              placeholder='Enter description'
            />
            <select
              id='category'
              name='category'
              className='category-select'
              value={selectedInfo.category}
              onChange={(e) =>
                setSelectedInfo({ ...selectedInfo, category: e.target.value })
              }
            >
              <option value=''>Select a Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ul>
              {selectedInfo.attribute.map((attribute, index) => (
                <li key={index}>
                  <label>Size:</label>
                  <input
                    type='text'
                    name='size'
                    // value={attribute.size}
                    className='attribute-input'
                    onChange={(e) =>
                      setSelectedInfo({
                        ...selectedInfo,
                        size: e.target.value,
                      })
                    }
                  />
                  <label>
                    Color:
                    <input
                      type='text'
                      className='attribute-input'
                      value={selectedInfo.color}
                      onChange={(e) =>
                        setSelectedInfo({
                          ...selectedInfo,
                          color: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label>
                    Quantity:
                    <input
                      type='number'
                      className='attribute-input'
                      value={selectedInfo.quantity}
                      onChange={(e) =>
                        setSelectedInfo({
                          ...selectedInfo,
                          quantity: e.target.value,
                        })
                      }
                      required
                      min='0'
                    />
                  </label>
                  {index == 0 ? (
                    <button
                      type='button'
                      className='add-attribute'
                      onClick={() => {
                        setNewInfo((prevInfo) => ({
                          ...prevInfo,
                          attribute: [
                            ...newInfo.attribute,
                            { size: "", color: "", quantity: 0 },
                          ],
                        }));
                      }}
                    >
                      Add Attribute
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='add-attribute'
                      onClick={() => {
                        const updatedAttributes = [...newInfo.attribute];
                        updatedAttributes.splice(index, 1);
                        setNewInfo((prevInfo) => ({
                          ...prevInfo,
                          attribute: updatedAttributes,
                        }));
                      }}
                    >
                      Remove Attribute
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <input
              className='inputadd'
              type='file'
              onChange={(e) => handleImage(e)}
            />
            <input
              className='inputadd'
              type='file'
              multiple
              onChange={(e) => handleImages(e)}
            />{" "}
            <div className='compflexbutton'>
              <button className='buttonadd' onClick={updateProduct}>
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
            {/* <thead>
              <tr>
                <th scope='col'>NB</th>
                <th scope='col'>Name</th>
                <th scope='col'>Price</th>
                <th scope='col'>description</th>
                <th scope='col'>countInStock</th>
                <th scope='col'>Category</th>
                <th scope='col'>Sizes</th>
                <th scope='col'>Colors</th>
                <th scope='col'>Image</th>
                <th scope='col'>Images</th>
                <th scope='col'>Buttons</th>
              </tr>
            </thead> */}
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
                  {/* <td>
                    <img src={info.images} alt={info.images} />
                  </td> */}

                  <td>
                    <button
                      className='buttonedit-product'
                      onClick={() => handleUpdate(info)}
                    >
                      Edit
                    </button>
                    <button
                      className='buttondelete-product'
                      onClick={() => deleteProduct(info._id)}
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
};

export default DashAddProduct;
