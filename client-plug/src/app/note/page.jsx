'use client'
import styles from'./note.module.css';
import Add from '@/Component/Add/Add';

const page = () => {
  return (
    <div className={styles.note}>
      <Add/>
    </div>
  )
}

export default page
