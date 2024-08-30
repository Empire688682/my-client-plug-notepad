import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { AiOutlineMenuFold } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { useGlobalContex } from '../Context';


const NavBar = () => {
    const {token, logOutUser } = useGlobalContex();
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className={styles.header}>
            <div className={styles.navbar-container}>
                <div className={styles.navbar}>
                    <div className={`${styles.logo} ${styles.logo-container}`}>
                        <NavLink to="/" >
                            <img src='/notejot_logo.png' alt="" />
                        </NavLink>
                    </div>
                    <nav>
                        <ul className={`${showMenu ? styles.show-mobile-menu : ""}`}>
                            <div>
                                <li onClick={() => setShowMenu(false)}><NavLink className="menu_link" to="/">Home</NavLink></li>
                                <li onClick={() => setShowMenu(false)}><NavLink className="menu_link" to="/about">About</NavLink></li>
                                <li onClick={() => setShowMenu(false)}><NavLink className="menu_link" to="/contact">Contact</NavLink></li>
                                {
                                    token ?
                                        <li onClick={() => setShowMenu(false)}><NavLink className="menu_link" to="/add#Notes">My Note</NavLink></li>
                                        :
                                        null
                                }
                                {
                                    token ?
                                        <li onClick={() => setShowMenu(false)}><button onClick={logOutUser} className="menu_link button" to="/"><p>Log Out</p></button></li>
                                        :
                                        <li onClick={() => setShowMenu(false)}><NavLink className="menu_link" to="/signup">Signup</NavLink></li>
                                }
                            </div>
                        </ul>
                    </nav>

                    <div className="menu" onClick={() => setShowMenu(!showMenu)}>
                        {
                            showMenu ? <RxCross1 className='menus_icon' /> : <AiOutlineMenuFold className='menus_icon' />
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NavBar
