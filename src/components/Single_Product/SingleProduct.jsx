import "./SingleProduct.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

function SingleProduct() {
  const { productId } = useParams();

  const [alldata, setAllData] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isProductDisabled, setIsProductDisabled] = useState(false);
  const [cart, setCart] = useState([]);
 const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  



  const apiURL = `https://e-commerce-back-end-production.up.railway.app/api/products/getproductbyid/${productId}`;

  const fetchallData = async () => {
    try {
      const response = await axios.get(apiURL);
      setAllData([response.data.product]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchallData();
   
  }, []);
  
  if(loading){
    return <div> <Loader/> </div>
  }



  const handleIncrease = () => {
    const attribute = alldata[0].attribute.find((attribute) => attribute.size == selectedSize && attribute.color == selectedColor);
    if (attribute && selectedQuantity < attribute.quantity) {
      setSelectedQuantity(selectedQuantity + 1);
    }
    
  };

  const handleDecrease = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };
  
  
   const addToCart = () => {
     const selectedAttr = alldata[0].attribute.find(
       (attr) => attr.size == selectedSize && attr.color == selectedColor
     );
     if (selectedAttr && selectedQuantity <= selectedAttr.quantity) {
       const cartItem = {
         product_id: alldata[0]._id,
         price: alldata[0].price,
         color: selectedColor,
         size: selectedSize,
         quantity: selectedQuantity,
         image: alldata[0].image,
         name:alldata[0].name
       };
       let existingCartItems =
         JSON.parse(localStorage.getItem("cart")) || [];
       let cartItemExists = false;
       existingCartItems = existingCartItems.map((item) => {
         if (
           item.product_id == cartItem.product_id &&
           item.color == cartItem.color &&
           item.size == cartItem.size
         ) {
           cartItemExists = true;
           return {
             ...item,
             quantity: item.quantity + cartItem.quantity,
           };
         }
         return item;
       });
       if (!cartItemExists) {
         existingCartItems.push(cartItem);
       }
       localStorage.setItem("cart", JSON.stringify(existingCartItems));
       setMessage("Product added to cart!");
       window.location.reload()
      
     
     } 
   };


  const specificData = alldata && alldata[0].attribute.filter((i) => i.size == selectedSize)
  const allSizes = alldata && alldata[0].attribute.map((item) => item.size);
  const uniqueSizes = Array.from(new Set(allSizes));

  return (
    <div className="product-details-container">
      {alldata ? (
        alldata.map((product) => {
          const allSizes = product.attribute.map((attr) => attr.size);
          // const allColors = product.attribute.map((attr) => attr.color);
          // const allquantity = product.attribute.map((attr) => attr.quantity);

          return (
            <div key={product._id} className='product-details'>
              <div className='image-wrapper'>
                <ul>
                  <li>
                    <img src={product.image} alt='' />
                  </li>
                  {product.images &&
                    product.images.map((image, index) => (
                      <li key={index}>
                        <img src={image} alt='' />
                      </li>
                    ))}
                </ul>
              </div>
              <div className='product-info'>
                {product.is_new_release && (
                  <p className='new-release'>New release!</p>
                )}
                <h1 className='product-name'>{product.name}</h1>
                <p className='product-category'>{product.category.name}</p>
                <p className='product-description'>{product.description}</p>
                <h2 className='product-price'>{product.price} $</h2>

                {/* SIZES */}
                <div className='all-product-attribute'>
                  <div className='product-attribute'>
                    <select
                      id='attribute-size'
                      name='attribute-size'
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <option value=''>Select a Size</option>
                      {uniqueSizes.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>

                    {/* COLORS */}
                  </div>

                  <div className='product-attribute'>
                    <select
                      id='attribute-color'
                      name='attribute-color'
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    >
                      <option value=''>Select a Color</option>
                      {/* {allColors.map((color, index) => (
                        <option key={index} value={color}>
                          {color}
                        </option>
                      ))} */}
                      {specificData.map((item, index) => (
                        <option key={index} value={item.color}>
                          {item.color}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}

                  <div className='product-attribute-quantity'>
                    <div className='product-counter'>
                      <button
                        className='counter-button'
                        onClick={handleDecrease}
                      >
                        -
                      </button>
                      <span className='counter-value'>{selectedQuantity}</span>
                      <button
                        className='counter-button'
                        onClick={handleIncrease}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className='product-actions'>
                    <button
                      className='add-to-cart-button'
                      disabled={isProductDisabled}
                      onClick={addToCart}
                    >
                      Add to Cart
                    </button>
                    <p className='message-added'>{message}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default SingleProduct;
