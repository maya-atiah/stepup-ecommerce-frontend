import { useState } from "react";
import "./ContactForm.css";
import emailjs from "@emailjs/browser";
import heroContact from "../../assets/images/flower.jpeg";
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);

  const handleEvent = async (e) => {
    e.preventDefault();
    var data = { name, email, message, phoneNumber };
    await emailjs.send(
      "service_ulcn8zp",
      "template_95u0lpp",
      data,
      "ZEAGTqdyPelINi3Lv"
    );

    setName("");
    setEmail("");
    setMessage("");
    setPhoneNumber("");
  };

  return (
    <div className="contact_container">
      <div className="contact_info">
        <span>
        <h1>Are You Interested To Know More About Us And Our Products?</h1></span>
       <p> Thank you for considering Stepup for your Shoes Store. Browse our website or visit our stores today to
        experience the StepUp difference.</p>
        <h3 >Find Us At</h3>
        <i className="status"> We're Available Around The Clock! </i>
        <p>
          <span className="Beirut_lebanon">Beirut,Lebanon </span>
        </p>
        {/* <p> WhatsApp:+961 71 656 666 </p> */}
        <div className="social_icons_contact">
  <a href="https://www.facebook.com/"><FaFacebook  /></a>
  <a href="https://www.instagram.com/"><FaInstagram  /></a>
  <a href="https://wa.me/"><FaWhatsapp  /></a>
</div>
      </div>

      <div className="form_contact_container">
        <form className="form_contact" onSubmit={handleEvent}>
          <h1>Get us to contact you</h1>
          <p>
            Please complete the details below and then click on Submit and we'll
            be in contact
          </p>
          <div>
            <label className="contact_form_name">
              Name
              <input
                type="text"
                placeholder="My name is"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </label>
          </div>

          <div>
            <label className="contact_form_name">
              Email
              <input
                type="text"
                placeholder="Your Email"
                value={email}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </label>
          </div>
          <div>
            <label className="contact_form_name">
              Phone Number
              <input
                type="text"
                placeholder="Your Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </label>
          </div>
          <div>
            <label className="contact_form_name">
              Message
              <input
                name="message"
                type="text"
                placeholder="Your Message"
                value={message}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </label>
          </div>

          <div className="send_contact_div">
            <input
              className="send_contact_button"
              type="submit"
              value="Send Message"
              id="form_button"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
