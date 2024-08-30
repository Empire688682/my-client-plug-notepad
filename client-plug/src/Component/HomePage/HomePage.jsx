'use client'; // Ensure client-side rendering if using hooks or state management

import React from 'react';
import styles from './HomePage.module.css'; // Use a CSS Module for styles
import Link from 'next/link'; // Use Next.js Link for navigation
import { useGlobalContex } from '../Context'; // Assuming useGlobalContex is compatible
import { FaCircleArrowDown } from 'react-icons/fa6';

const HomePage = () => {
  const { token } = useGlobalContex(); // Extract token from your global context

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
          <Link href={!token ? '/signup' : '/add'} className={styles.btn}>
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
