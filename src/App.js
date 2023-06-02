import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./App.css";
import Login from "./components/Login/Login";
import Navhead from "./components/Navhead/Navhead";
import Home from "./components/Home Page/Home";
import About from "./components/About Me/About";
import Footer from "./components/Footer/Footer";
import SingleProduct from "./components/Single_Product/SingleProduct";
import SingleCategory from "./components/Single_Category/SingleCategory";
import Order from "./components/Order/Order";
import ContactForm from "./components/Contact us /ContactForm";
import DashCategory from "./components/Dashboard/Sidebar/Pages/DashCategory";
import DashPages from "./components/Dashboard/Sidebar/Pages/DashPages";
import DashOrders from "./components/Dashboard/Sidebar/Pages/DashOrders";
// import DashProducts from "./components/Dashboard/Sidebar/Pages/DashProducts";
import DashUsers from "./components/Dashboard/Sidebar/Pages/DashUsers";
import Page404 from "./components/404PAge/Page404";
import secureLocalStorage from "react-secure-storage";
import Scroll from "./components/Scroll/Scroll";
import Dashboard from "./components/Dashboard/Dashboard";
import DashAddProduct from "./components/Dashboard/Sidebar/Pages/DashAddProduct";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const role = secureLocalStorage.getItem("role");
  const isAdmin = role === "admin";

  useEffect(() => {
    changeLoggedIn();
  }, []);

  const changeLoggedIn = () => {
    let loggedin = secureLocalStorage.getItem("loggedIn");
    if (loggedin) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Navhead isLoggedIn={isLoggedIn} setIsLoggedIn={changeLoggedIn} />

      <Routes>
        <Route
          exact
          path="/login"
          element={isLoggedIn === true ? <Home /> : <Login />}
        />
        <Route
          exact
          path="/order"
          element={isLoggedIn === true ? <Order /> : <Login />}
        />

        <Route
          exact
          path="/dashboard"
          element={isLoggedIn === true && isAdmin ? <Dashboard /> : <Login />}
        />
        <Route
          exact
          path="/dashpages"
          element={isLoggedIn === true && isAdmin ? <DashPages /> : <Login />}
        />

        <Route
          exact
          path="/dashcategories"
          element={
            isLoggedIn === true && isAdmin ? <DashCategory /> : <Login />
          }
        />

        <Route
          exact
          path="/dashorders"
          element={isLoggedIn === true && isAdmin ? <DashOrders /> : <Login />}
        />

        <Route
          exact
          path="/dashusers"
          element={isLoggedIn === true && isAdmin ? <DashUsers /> : <Login />}
        />

        <Route
          exact
          path="/dashproducts"
          element={
            isLoggedIn === true && isAdmin ? <DashAddProduct /> : <Login />
          }
        />

        <Route path="/*" element={<Page404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/terms" element={<Home />} />
        <Route path="/refund" element={<Home />} />
        <Route path="/single-product/:productId" element={<SingleProduct />} />
        <Route
          path="/single-category/:categoryId"
          element={<SingleCategory />}
        />
      </Routes>
      <Scroll />
      <Footer />
    </div>
  );
}

export default App;
