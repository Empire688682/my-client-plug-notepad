import React from 'react';
import styles from './Footer.module.css'
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p className={styles.designer}> &copy Copyrighted 2023 <a href="#">JAY-EMPIRE</a> <FaHeart style={{color:"red"}}/> All rights reserved </p>
    </div>
  )
}

export default Footer
