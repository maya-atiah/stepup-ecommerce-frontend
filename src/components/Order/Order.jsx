import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import  secureLocalStorage  from  "react-secure-storage";


const Order = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setISSubmitted] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []);

  
  const handleSubmitOrder = async () => {
    setIsLoading(true);
    setErrorMessage("");
    const token = secureLocalStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    try {
      const response = await axios.post(
        "https://e-commerce-back-end-production.up.railway.app/api/orders",
        {
          cart,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setISSubmitted(true);
      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      console.error(error.response.data.error);
      setErrorMessage(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    setCart((cart) => cart.filter((i) => i.product_id !== id));
    
    localStorage.setItem("cart", JSON.stringify(cart));
      window.location.reload();
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.product_id === itemId) {
        return {
          ...item,
          quantity: newQuantity <0 ? 0 : newQuantity,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <h1 className='shopping-cart'>Shopping Cart</h1>
      <div className='cart-table-view'>
        <div className='table-cart'>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan='7'>Your cart is empty.</td>
                </tr>
              ) : (
                <>
                  {cart.map((item) => (
                    <tr key={item.product_id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='cart-image'
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.color}</td>
                      <td>{item.size}</td>
                      <td>
                        <button
                          className='increment-btn-cart'
                          onClick={() =>
                            updateQuantity(item.product_id, +item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        {item.quantity}

                        <button
                          className='increment-btn-cart'
                          onClick={() =>
                            updateQuantity(item.product_id, +item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </td>
                      <td>{item.price}</td>
                      <td>
                        <AiFillDelete
                          className='delete-icon-row'
                          onClick={() => handleDelete(item.product_id)}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>

          <div className='cart-item-responsive'>
            {cart.length === 0 ? (
              <tr>
                <td colSpan='7'>Your cart is empty.</td>
              </tr>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.product_id} className='cart-items-rspnv'>
                    <div className='list-rspnv delete-icon'>
                      <AiFillDelete
                        className='delete-icon-row'
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                    <div className='cart-image-rspnv-div'>
                      {" "}
                      <img
                        src={item.image}
                        alt={item.name}
                        className='cart-image-rspnv'
                      />
                    </div>
                    <div className='list-rspnv'>
                      <div>Product: </div>
                      <div> {item.name}</div>
                    </div>
                    <div className='list-rspnv'>
                      <div>Color: </div>
                      <div>{item.color}</div>
                    </div>
                    <div className='list-rspnv'>
                      <div>Size: </div>
                      <div>{item.size}</div>
                    </div>
                    <div className='list-rspnv'>
                      <div>Quantity: </div>
                      <div className='increment-div-rspnsv'>
                        <button
                          className='increment-btn-cart'
                          onClick={() =>
                            updateQuantity(item.product_id, +item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        {item.quantity}
                        <button
                          className='increment-btn-cart'
                          onClick={() =>
                            updateQuantity(item.product_id, +item.quantity - 1)
                          }
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className='list-rspnv'>
                      <div>
                        <div>Price:</div>
                      </div>

                      <div>
                        <div>{item.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {isSubmitted ? (
          <div className='success-message'>
            {" "}
            <FaCheckCircle className='success' /> Order submitted successfully!
          </div>
        ) : (
          <div className='cart-discription'>
            <h3 className='cart-description-title'>
              {" "}
              <BsCart className='cart-icon-cart' /> Cart Description
            </h3>
            <div className='order-details'>
              <div>
                <p className='order-detail-title'>Order details:</p>
                <ul className='cart-list'>
                  {cart.map((item) => (
                    <li key={item.product_id}>
                      <p className='cart-item-quantity'>{item.quantity} </p>{" "}
                      {item.name} / color : {item.color} / size : {item.size}
                    </li>
                  ))}
                </ul>
              </div>
              <div>Created At: {new Date().toLocaleString()}</div>
              <div className='cart-total-price'>
                Total Price :{" "}
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}{" "}
                $
              </div>
            </div>
            <div className='submit-cart'>
              <button
                onClick={handleSubmitOrder}
                className='submit-order'
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Order"}
              </button>
              {errorMessage && (
                <div className='error-message'>{errorMessage}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;