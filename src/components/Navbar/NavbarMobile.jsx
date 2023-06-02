import React, { useState } from "react";
import { FaAlignRight, FaRegTimesCircle } from "react-icons/fa";
import "../Navbar/NavbarMobile.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

function NavbarMobile() {
  const [open, setOpen] = useState(false);

  const hamburgerIcon = (
    <FaAlignRight className='hamburger burger' onClick={() => setOpen(!open)} />
  );
  const closeIcon = (
    <FaRegTimesCircle className='hamburger' onClick={() => setOpen(!open)} />
  );

  const closeMobileMenu = () => setOpen(false);

  const animatedForm = { opacity: 0, y: -40 };
  const animatedTo = { opacity: 1, y: 0 };

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://e-commerce-back-end-production.up.railway.app/api/users/auth/user-role",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.role === "admin") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/error";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='mobile-navigation'>
      {open ? closeIcon : hamburgerIcon}
      {open && (
        <div className='navlink-mobile'>
          <Link to='/' style={{ textDecoration: "none" }}>
            <motion.div
              initial={animatedForm}
              animate={animatedTo}
              onClick={() => closeMobileMenu()}
              transition={{ delay: 0.1 }}
            >
              Home
            </motion.div>
          </Link>

          <Link
            to='/single-category/643fe9acc1397ac9890562cd'
            onClick={() =>
              (window.location.href =
                "/single-category/643fe9acc1397ac9890562cd")
            }
            style={{ textDecoration: "none" }}
          >
            <motion.div
              initial={animatedForm}
              animate={animatedTo}
              onClick={() => closeMobileMenu()}
              transition={{ delay: 0.15 }}
            >
              Hightop sneakers
            </motion.div>
          </Link>
          <Link
            to='/single-category/6437ba63a671878f61ce7e40'
            onClick={() =>
              (window.location.href =
                "/single-category/6437ba63a671878f61ce7e40")
            }
            style={{ textDecoration: "none" }}
          >
            <motion.div
              initial={animatedForm}
              animate={animatedTo}
              onClick={() => closeMobileMenu()}
              transition={{ delay: 0.19 }}
            >
              Lowtop sneakers
            </motion.div>
          </Link>
          <Link
            to='/single-category/6437ba7ba671878f61ce7e426437ba7ba671878f61ce7e42'
            style={{ textDecoration: "none" }}
            onClick={() =>
              (window.location.href =
                "/single-category/6437ba63a671878f61ce7e40")
            }
          >
            <motion.div
              initial={animatedForm}
              animate={animatedTo}
              onClick={() => closeMobileMenu()}
              transition={{ delay: 0.2 }}
            >
              Athletic shoes
            </motion.div>
          </Link>
          <Link
            to='/single-category/643feab292947e7429c6dfc2'
            onClick={() =>
              (window.location.href =
                "/single-category/6437ba63a671878f61ce7e40")
            }
            style={{ textDecoration: "none" }}
          >
            <motion.div
              initial={animatedForm}
              animate={animatedTo}
              onClick={() => closeMobileMenu()}
              transition={{ delay: 0.24 }}
            >
              Retro Shoes
            </motion.div>
          </Link>
          <motion.div
            initial={animatedForm}
            animate={animatedTo}
            onClick={() => closeMobileMenu()}
            transition={{ delay: 0.29 }}
          >
            <a
              href='#'
              onClick={() =>
                (window.location.href =
                  "/single-category/643feb6092947e7429c6dfc4retroretro")
              }
              style={{ textDecoration: "none" }}
            >
              Slides
            </a>
          </motion.div>
          <motion.div
            initial={animatedForm}
            animate={animatedTo}
            onClick={() => closeMobileMenu()}
            transition={{ delay: 0.3 }}
          >
            <a
              href='#'
              onClick={() =>
                (window.location.href =
                  "/single-category/643feb6d92947e7429c6dfc6")
              }
              style={{ textDecoration: "none" }}
            >
              Socks
            </a>
          </motion.div>

          <Link to='about' style={{ textDecoration: "none" }}>
            <motion.div
              initial={animatedForm}
              animate={animatedTo}
              onClick={() => closeMobileMenu()}
              transition={{ delay: 0.35 }}
            >
              About Us
            </motion.div>
          </Link>
          <Link to='contact' style={{ textDecoration: "none" }}>
            <motion.div
              initial={animatedForm}
              animate={animatedTo}
              onClick={() => closeMobileMenu()}
              transition={{ delay: 0.39 }}
            >
              Contact Us
            </motion.div>
          </Link>
          <Link to='terms' style={{ textDecoration: "none" }}>
            <motion.div
              initial={animatedForm}
              animate={animatedTo}
              onClick={() => closeMobileMenu()}
              transition={{ delay: 0.4 }}
            >
              Terms and Conditions
            </motion.div>
          </Link>
          <Link to='refund' style={{ textDecoration: "none" }}>
            <motion.div
              initial={animatedForm}
              animate={animatedTo}
              onClick={() => closeMobileMenu()}
              transition={{ delay: 0.45 }}
            >
              Refund and Return
            </motion.div>
          </Link>
          <Link to='privacy' style={{ textDecoration: "none" }}>
            <motion.div
              initial={animatedForm}
              animate={animatedTo}
              onClick={() => closeMobileMenu()}
              transition={{ delay: 0.5 }}
            >
              Privacy Policy
            </motion.div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavbarMobile;
