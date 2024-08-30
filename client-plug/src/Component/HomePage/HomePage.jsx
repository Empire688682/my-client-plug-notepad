'use client'; 
import React from 'react';
import styles from './HomePage.module.css'; 
import Link from 'next/link'; 
import { useGlobalContext } from '../Context'; 
import { FaCircleArrowDown } from 'react-icons/fa6';

const HomePage = () => {
  const { token } = useGlobalContext();

  return (
    <div className={styles.ideasJotter}>
      <div className={styles.container}>
        <div className={styles.ideasJotterHomepage}>
          <h1>Welcome to ideasjoter</h1>
          <h2>Preserve Your Innovative Concepts for Future Exploration</h2>
          <p>Jot down ideas you think are great</p>
          <small className={styles.arrowDown}>
            <FaCircleArrowDown />
          </small>
          <Link href='/note' className={styles.btn}>
            Add Your Note
          </Link>
        </div>
        <div className={styles.row}>
          <div className={styles.col2}>
            <img src='/notejot_gif.gif' alt="NoteJotter GIF" />
          </div>
          <div className={styles.col2}>
            <h1>Ideas Rule the World you know</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
