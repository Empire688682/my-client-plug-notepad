import React from 'react';
import './Footer.css';
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <p className="designer"> &copy Copyrighted 2023 <a href="#">JAY-EMPIRE</a> <FaHeart style={{color:"red"}}/> All rights reserved </p>
    </div>
  )
}

export default Footer
