import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
  FaRegEnvelope,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const SocailMediaIcons = () => {
  return (
    <div className='socialicon'>
      <a href='https://www.facebook.com/stepuplb' target='_blank'>
        <FaFacebook className='facebook' />
      </a>
      <a
        href='https://instagram.com/stepupleb_?igshid=YmMyMTA2M2Y='
        target='_blank'
      >
        <FaInstagram className='facebook' />
      </a>
      <a className='facebook' href='https://wa.me/'>
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default SocailMediaIcons;
