'use client'
import React, { useEffect } from 'react';
import styles from'./note.module.css';
import Image from 'next/image';
import Add from '@/Component/Add/Add';

const page = () => {
  return (
    <div className={styles.note}>
      <Add/>
    </div>
  )
}

export default page
