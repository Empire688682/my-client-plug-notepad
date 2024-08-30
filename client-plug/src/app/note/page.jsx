'use client'
import React, { useEffect } from 'react';
import styles from'./note.module.css';
import Image from 'next/image';
import Add from '@/Component/Add/Add';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/Component/Context';

const page = () => {
  const router = useRouter();
  const {token} = useGlobalContext();
  useEffect(()=>{
    if(!token){
     router.push("/")
    }
 },[token, router]);

 // Prevent rendering until the token is validated
 if (!token) {
  return null; 
}

  return (
    <div className={styles.note}>
      <Add/>
    </div>
  )
}

export default page
