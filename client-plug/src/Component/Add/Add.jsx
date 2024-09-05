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
    const [isEditing, setIsEditing] = useState(null); // State to track which note is being edited
    const [editData, setEditData] = useState({}); // State to store the edited data

    const addNote = async () => {
        try {
            setSaving(true);
            const response = await axios.post("api/note/addNote", data, { withCredentials: true });
            if (response && response.data.success) {
                setData({
                    category: "",
                    link: "",
                    country: "",
                    phone: "",
                    email: "Not@gmail.com"
                });
                setMessage("Note saved");
                setTimeout(() => {
                    setMessage("");
                }, 2000);
                setError(false);
                window.location.reload();
            } else {
                setMessage("Error");
                setError(true);
            }
        } catch (error) {
            console.log("ERROR", error);
            setMessage("An error occurred while saving the note.");
            setError(true);
        } finally {
            setSaving(false);
        }
    };

    const handleOnchange = (e) => {
        const { value, name } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote();
    };

    const fetchUserNote = async () => {
        try {
            setLoading(true);
            const response = await axios.get("api/note/allNote");
            if (response.data.success) {
                setNotes(response.data.userNotes);
            } else if (response.data.message === "No notes available") {
                setNotesMessage("No notes available");
                setNotes([]);
            }
        } catch (error) {
            console.log("ERROR:", error);
            setNotesMessage("Failed to fetch notes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserNote();
    }, []);

    const handleEditClick = (note) => {
        setIsEditing(note._id); // Set the current note to editing mode
        setEditData(note); // Initialize the edit data with the note's current data
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = async (noteId) => {
        try {
            const response = await axios.post(`api/note/editNote`, {
                noteId, // Send noteId and edited fields
                category: editData.category,
                link: editData.link,
                country: editData.country,
                phone: editData.phone,
                email: editData.email
            }, { withCredentials: true });

            if (response && response.data.success) {
                setMessage("Note updated successfully");
                setTimeout(()=>{
                    setMessage("")
                },3000)
                setIsEditing(null); // Exit edit mode after saving
                fetchUserNote(); // Refresh the notes list
            } else {
                setMessage("Error updating note");
                setError(true);
            }
        } catch (error) {
            console.error("Error updating note:", error);
            setMessage("An error occurred while updating the note.");
            setError(true);
        }
    };

    const deleteNote = async (noteId) =>{
        try {
            const response = await axios.post("api/note/deleteNote", {noteId});
            if(response){
                fetchUserNote();
            }
        } catch (error) {
            console.log("ERROR:", error);
        }
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
                        <form onSubmit={handleSubmit}>
                            <h2 className={styles.heading}>That your awesome note</h2>
                            <div>
                                <label htmlFor="category">Category</label>
                                <input id='category' onChange={handleOnchange} type="text" value={data.category} name='category' required />
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
                            loading ? <h3>Loading....</h3> :
                                notes.map((note) => {
                                    return (
                                        <div key={note._id} className={styles.note_Con}>
                                            {
                                                isEditing === note._id ? (
                                                    <div className={styles.edit_Con}>
                                                        <div>
                                                            <input type="text" name="category" value={editData.category} onChange={handleEditChange} />
                                                        </div>
                                                        <div>
                                                            <input type="text" name="link" value={editData.link} onChange={handleEditChange} />
                                                        </div>
                                                        <div>
                                                            <input type="text" name="country" value={editData.country} onChange={handleEditChange} />
                                                        </div>
                                                        <div>
                                                            <input type="tel" name="phone" value={editData.phone} onChange={handleEditChange} />
                                                        </div>
                                                        <div>
                                                            <input type="email" name="email" value={editData.email} onChange={handleEditChange} />
                                                        </div>
                                                        <button onClick={() => handleSaveEdit(note._id)}>Save</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div>
                                                            <p>Category: {note.category}</p>
                                                        </div>
                                                        <div>
                                                            <p>Link: <a href={note.link} target="_blank" rel="noopener noreferrer">{note.link}</a></p>
                                                        </div>
                                                        <div>
                                                            <p>Country: {note.country}</p>
                                                        </div>
                                                        <div>
                                                            <p>Phone: <a href={`tel:${note.phone}`}>{note.phone}</a></p>
                                                        </div>
                                                        <div>
                                                            <p>Email: <a href={`mailto:${note.email}`}>{note.email}</a></p>
                                                        </div>
                                                        <div className={styles.btn_Con}>
                                                            <div className={styles.edit_btn} onClick={() => handleEditClick(note)}>
                                                                <MdEdit />
                                                            </div>
                                                            <div className={styles.delete_btn} onClick={()=>deleteNote(note._id)}>
                                                                <MdDelete />
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    );
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;
