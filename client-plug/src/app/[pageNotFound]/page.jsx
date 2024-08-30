// app/not-found.tsx or app/not-found.jsx
import Link from 'next/link';
import styles from './pageNotFound.module.css'; // Optional: import your styles

const Page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.message}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className={styles.homeLink}>Go back to Home</Link>
    </div>
  );
};

export default Page;
