'use client'
import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { AiOutlineMenuFold } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Link from 'next/link';
import SignUp from '../SignUp/SignUp';
import { useGlobalContext } from '../Context';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const NavBar = () => {
    const { token, showLogin, setShowLogin, url } = useGlobalContext();
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    const clearCookies = async ()=>{
        try {
            const response = await axios.get(url + "api/users/logout");
            if(response){
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logOutUser = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/");
        clearCookies();
    };

    const handleSignupClick = () => {
        setShowMenu(false);
        setShowLogin(true);
    }

    useEffect(() => {
        if (showLogin) {
            window.scroll(0, 0);
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "auto";
        };
    }, [showLogin]);

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
                                    <Link className={styles.menu_link} href="/note">My Note</Link>
                                </li>
                            ) : null}
                            {token ? (
                                <li onClick={() => setShowMenu(false)}>
                                    <button onClick={logOutUser} className={`${styles.menu_link} ${styles.button}`}><p>Log Out</p></button>
                                </li>
                            ) : (
                                <li onClick={handleSignupClick}>
                                    <p className={styles.menu_link} href="/add">Signup</p>
                                </li>
                            )}
                        </ul>
                    </nav>
                    <div className={styles.menu} onClick={() => setShowMenu(!showMenu)}>
                        {showMenu ? <RxCross1 className={styles.menus_icon} /> : <AiOutlineMenuFold className={styles.menus_icon} />}
                    </div>
                </div>
            </div>
            {
                showLogin ? <div className={styles.signupCon}>
                    <SignUp setShowLogin={setShowLogin} />
                </div>
                    :
                    null
            }
        </div>
    );
};

export default NavBar;
