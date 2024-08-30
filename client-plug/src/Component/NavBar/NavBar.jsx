'use client'
import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { AiOutlineMenuFold } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Link from 'next/link';
import SignUp from '../SignUp/SignUp';
import { useGlobalContext } from '../Context'; // Corrected line

const NavBar = () => {
    const {token, logOutUser} = useGlobalContext();
    const [showMenu, setShowMenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const openLogin = () => {
        setShowLogin(true);
    }

    return (
        <div className={styles.header}>
            <div className={styles.navbarContainer}>
                <div className={styles.navbar}>
                    <div className={`${styles.logo} ${styles.logoContainer}`}>
                        <Link href="/">
                            <img src='/notejot_logo.png' alt="NoteJot Logo" />
                        </Link>
                    </div>
                    <nav>
                        <ul className={showMenu ? styles.showMobileMenu : ""}>
                            <li onClick={() => setShowMenu(false)}>
                                <Link className={styles.menu_link} href="/">Home</Link>
                            </li>
                            {token ? (
                                <li onClick={() => setShowMenu(false)}>
                                    <Link className={styles.menu_link} href="/add">My Note</Link>
                                </li>
                            ) : null}
                            {token ? (
                                <li onClick={() => setShowMenu(false)}>
                                    <button onClick={logOutUser} className={`${styles.menu_link} ${styles.button}`}><p>Log Out</p></button>
                                </li>
                            ) : (
                                <li onClick={() => setShowMenu(false)}>
                                    <Link className={styles.menu_link} href="/add">Signup</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                    <div className={styles.menu} onClick={() => setShowMenu(!showMenu)}>
                        {showMenu ? <RxCross1 className={styles.menus_icon} /> : <AiOutlineMenuFold className={styles.menus_icon} />}
                    </div>
                </div>
            </div>
            <SignUp />
        </div>
    );
};

export default NavBar;
