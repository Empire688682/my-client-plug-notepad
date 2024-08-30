'use client'; 
import React, { useState } from 'react';
import styles from './Add.module.css';
import { useGlobalContext } from '../Context';
import { MdEdit, MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

const Add = () => {
    const { user, token, url } = useGlobalContext();
    const [note, setNote] = useState([]);
    const [data, setData] = useState({
        category: "",
        country: "",
        phone: "",
        email: "Not@gmail.com"
    });

    const handleOnchange = (e)=>{
        const {value, name} = e.target
        setData((prev) => ({...prev, [name]:value}));
    }

    return (
        <div>
            <div className={styles.addHeader}>
                <div className={styles.btnCon}>
                    <a href="#Notes">MY NOTES</a>
                </div>
                <div className={styles.container}>
                    <h1> Add your great idea @ <span className={styles.user}> {user} <FaHeart style={{ color: "red", minWidth: "40px" }} /></span></h1>
                </div>
            </div>
            <div className={styles.addSection}>
                <div className={styles.container}>
                    <div className={styles.addContainer}>
                        <form>
                            <h2 className={styles.heading}>That your awesome note</h2>
                            <div>
                                <label htmlFor="ctegory">Category</label>
                                <input id='ctegory' onChange={handleOnchange} type="text" value={data.ctegory} name='category' required />
                            </div>
                            <div>
                                <label htmlFor="country">Country</label>
                                <input id='country' onChange={handleOnchange} type="text" value={data.country} name='country' required />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input id='phone' onChange={handleOnchange} type='tel' value={data.phone} name='phone' required />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input id='email' onChange={handleOnchange} type='email' value={data.email} name='email' required />
                            </div>
                            <button type="submit" className={styles.submitBtn}>Save</button>
                        </form>
                    </div>
                    <div className={styles.noteSection} id='Notes'>
                        <h2>MY NOTES</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;
