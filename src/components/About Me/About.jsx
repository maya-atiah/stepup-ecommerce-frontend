import { useState } from "react";
import { useEffect } from "react";
import "./About.css";
import axios from "axios";
import Logo from "../../assets/images/logoAbout.png";
import {
  BsFillChatLeftQuoteFill,
  BsFillChatRightQuoteFill,
} from "react-icons/bs";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaExclamation } from "react-icons/fa";
function About() {
  useEffect(() => {
    getabout();
  }, []);

  const [aboutdata, setaboutdata] = useState("");
  const [aboutimage, setaboutimage] = useState("");

  const getabout = async () => {
    const response = await axios.get(
      `https://e-commerce-back-end-production.up.railway.app/api/pages/getallpagesbyid/6440f68433ababf0bb2ad176`
    );
    setaboutdata(response.data.data.description);
    setaboutimage(response.data.data.image);
  };


  return (
    <>
      <div className='hero-image-about'></div>

      <div className='content-about'>
        {" "}
        <img src={Logo} alt='logo' className='logo-about' />
        <div className='description-about'>
          <div className='quote-titile-about'>
            <BsFillChatLeftQuoteFill className='quote-icon-about' />{" "}
            <p>We provide you with the better walking experience</p>
            <BsFillChatRightQuoteFill className='quote-icon-about' />
          </div>
          <div className='about-data'>{aboutdata}</div>
          <div className='quote-titile-about'>
            {" "}
            <VscWorkspaceTrusted className='quote-icon-about' />
            <p>Thank you for choosing our website </p>{" "}
            <FaExclamation className='quote-icon-about' />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
