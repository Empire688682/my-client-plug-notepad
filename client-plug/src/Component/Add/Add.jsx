'use client';
import React, { useEffect, useState } from 'react';
import styles from './Add.module.css';
import { useGlobalContext } from '../Context';
import { MdEdit, MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

const Add = () => {
    const { user } = useGlobalContext();
    const [notes, setNotes] = useState([]);
    const [data, setData] = useState({
        category: "",
        link: "",
        country: "",
        phone: "",
        email: "Nothin@gmail.com"
    });
    const [dataStage, setDataStage] = useState("Compose");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(false);
    const [notesMessage, setNotesMessage] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const addNote = async () => {
        try {
            setSaving(true) 
            await axios.post("api/note/addNote", data, { withCredentials: true }) 
            if (response) {
                setData({
                    category: "",
                    link: "",
                    country: "",
                    phone: "",
                    email: "Not@gmail.com"
                })
                window.location.reload();
                setMessage("Note saved");
                setInterval(() => {
                    setMessage("")
                }, 2000);
                setError(false)
            }
            else {
                setMessage("Error");
                setError(true)
            };

        } catch (error) {
            console.log("ERROR");
        }
        finally {
            setSaving(false);
        }
    }

    const handleOnchange = (e) => {
        const { value, name } = e.target
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote();
        fetchUserNote();
    };

    const fetchUserNote = async () => {
        try {
            setLoading(true);
            const response = await axios.get("api/note/allNote");
            if (response) {
                setNotes(response.data.userNotes);
            } else if (response.data.message === "No notes available") {
                setNotesMessage("No notes available");
                setNotes([]);  // Clear notes if no notes are available
            }
        } catch (error) {
            console.log("ERROR:", error);
            setNotesMessage("Failed to fetch notes");
        } finally {
            setLoading(false);
        }
    };

    const edditNote = async (note) =>{
        setDataStage("Eddit");
        setData({
            category: `${note.category}`,
            link: `${note.link}`,
            country: `${note.country}`,
            phone: `${note.phone}`,
            email: `${note.email}`
        });
        window.scroll(0, 420)
    };

    useEffect(() => {
        fetchUserNote();
    }, []);

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
                        <form onSubmit={handleSubmit}>
                            <h2 className={styles.heading}>That your awesome note</h2>
                            <div>
                                <label htmlFor="ctegory">Category</label>
                                <input id='ctegory' onChange={handleOnchange} type="text" value={data.ctegory} name='category' required />
                            </div>
                            <div>
                                <label htmlFor="link">Link</label>
                                <input id='link' onChange={handleOnchange} type="text" value={data.link} name='link' required />
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
                            {
                                error ? <div>
                                    {message}
                                </div>
                                    :
                                    <div>
                                        <p>{saving ? "Saving......" : null}</p> <br />
                                        {message}
                                    </div>
                            }
                            <button type="submit" className={styles.submitBtn}>Save</button>
                        </form>
                    </div>
                    <div className={styles.noteSection} id='Notes'>
                        <h2>MY NOTES</h2>
                        {
                           notes && loading ?
                                <h3>Loading....</h3> :
                                notes.map((note) => {
                                    return <div key={note._id} className={styles.note_Con}>
                                        <div>
                                            <h4>Category: {note.category}</h4>
                                        </div>
                                        <div>
                                            <h4>Link: <a href={note.link} target="_blank" rel="noopener noreferrer">{note.link}</a></h4>
                                        </div>
                                        <div>
                                            <h4>Country: {note.country}</h4>
                                        </div>
                                        <div>
                                            <h4>Phone: <a href={`tel:${note.phone}`}>{note.phone}</a></h4>
                                        </div>
                                        <div>
                                            <h4>Email: <a href={`mailto:${note.email}`}>{note.email}</a></h4>
                                        </div>
                                        <div className={styles.btn_Con}>
                                            <div className={styles.eddit_btn} onClick={()=>getNoteId(note)}>
                                            <MdEdit />
                                            </div>
                                            <div className={styles.delete_btn}>
                                            <MdDelete />
                                            </div>
                                        </div>
                                    </div>
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;
