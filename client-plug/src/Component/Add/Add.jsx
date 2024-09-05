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
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(false);
    const [notesMessage, setNotesMessage] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const addNote = async () => {
        try {
            setSaving(true);
            const response = await axios.post("/api/note/addNote", data, { withCredentials: true });

            if (response.data.success) {
                setData({
                    category: "",
                    link: "",
                    country: "",
                    phone: "",
                    email: "Nothin@gmail.com"
                });
                setMessage("Note saved successfully");
                setError(false);
                setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
                fetchUserNote(); // Refresh the notes after adding a new one
            } else {
                setMessage("Failed to save note.");
                setError(true);
            }
        } catch (error) {
            console.error("Error saving note:", error);
            setMessage("Error occurred while saving the note.");
            setError(true);
        } finally {
            setSaving(false);
        }
    };

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote();
    };

    const fetchUserNote = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/note/allNote");

            if (response.data.success) {
                setNotes(response.data.userNotes);
            } else if (response.data.message === "No notes available") {
                setNotesMessage("No notes available");
                setNotes([]);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
            setNotesMessage("Failed to fetch notes.");
        } finally {
            setLoading(false);
        }
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
                    <h1>Add your great idea @ <span className={styles.user}> {user} <FaHeart style={{ color: "red", minWidth: "40px" }} /></span></h1>
                </div>
            </div>
            <div className={styles.addSection}>
                <div className={styles.container}>
                    <div className={styles.addContainer}>
                        <form onSubmit={handleSubmit}>
                            <h2 className={styles.heading}>Your Awesome Note</h2>
                            {["category", "link", "country", "phone", "email"].map((field) => (
                                <div key={field}>
                                    <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        id={field}
                                        onChange={handleOnchange}
                                        type={field === "phone" ? "tel" : field === "email" ? "email" : "text"}
                                        value={data[field]}
                                        name={field}
                                        required
                                    />
                                </div>
                            ))}
                            {error ? (
                                <div>{message}</div>
                            ) : (
                                <div>
                                    <p>{saving ? "Saving..." : null}</p> <br />
                                    {message}
                                </div>
                            )}
                            <button type="submit" className={styles.submitBtn}>Save</button>
                        </form>
                    </div>
                    <div className={styles.noteSection} id='Notes'>
                        <h2>MY NOTES</h2>
                        {loading ? (
                            <h3>Loading...</h3>
                        ) : notes.length > 0 ? (
                            notes.map((note) => (
                                <div key={note._id} className={styles.note_Con}>
                                    {["category", "link", "country", "phone", "email"].map((field) => (
                                        <div key={field}>
                                            <h4>
                                                {field.charAt(0).toUpperCase() + field.slice(1)}: {field === "link" ? (
                                                    <a href={note[field]} target="_blank" rel="noopener noreferrer">{note[field]}</a>
                                                ) : field === "phone" ? (
                                                    <a href={`tel:${note[field]}`}>{note[field]}</a>
                                                ) : field === "email" ? (
                                                    <a href={`mailto:${note[field]}`}>{note[field]}</a>
                                                ) : note[field]}
                                            </h4>
                                        </div>
                                    ))}
                                    <div className={styles.btn_Con}>
                                        <div className={styles.edit_btn}>
                                            <MdEdit />
                                        </div>
                                        <div className={styles.delete_btn}>
                                            <MdDelete />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h3>{notesMessage}</h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;
