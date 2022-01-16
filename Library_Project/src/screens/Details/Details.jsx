import { useState } from "react";
import styles from './Details.module.css';

const Details = ({ bookDetails, bookRate, setBookRate, notes, setNotes }) => {
    const [newNoteName, setNewNoteName] = useState([]);

    const addTaskInputHandler = (e) => { setNewNoteName(e.target.value) };

    const AddNote = (todo, bookDetailsId) => {
        let noteObj = { id: bookDetailsId, text: todo };
        const notesArray = [noteObj, ...notes];
        setNotes(notesArray);
        localStorage.setItem("Notes", JSON.stringify(notesArray));
    }

    const isSelected = (value) => bookRate === value;

    const handleRadioClick = (e) => {
        setBookRate(e.currentTarget.value)
        localStorage.setItem("Grades", JSON.stringify(bookRate));
    };

    return (
        <div className={styles.Details}>
            <h1>details page</h1>
            <img src={bookDetails.volumeInfo.imageLinks.thumbnail || ""} />
            <h3>{bookDetails.volumeInfo.title}</h3>
            <p>{bookDetails.volumeInfo.authors[0]}</p>
            <h3>{bookRate}</h3>
            <p >{bookDetails.volumeInfo.description}</p>
            <textarea placeholder="Notes" onChange={(e) => { bookDetails.volumeInfo.note = addTaskInputHandler(e) }} /><br></br>
            <button onClick={() => AddNote(newNoteName, bookDetails.id)}>save note</button>
            {/* <h3>{bookDetails.volumeInfo.note}</h3> */}
            <input
                className="rateBook"
                type="radio"
                name="star"
                value="☆"
                checked={isSelected("☆")}
                onChange={handleRadioClick}

            />  <input
                className="rateBook"
                type="radio"
                name="star"
                value="☆☆"
                checked={isSelected("☆☆")}
                onChange={handleRadioClick}

            />  <input
                className="rateBook"
                type="radio"
                name="star"
                value="☆☆☆"
                checked={isSelected("☆☆☆")}
                onChange={handleRadioClick}

            />  <input
                className="rateBook"
                type="radio"
                name="star"
                value="☆☆☆☆"
                checked={isSelected("☆☆☆☆")}
                onChange={handleRadioClick}

            />
            <input
                className="rateBook"
                type="radio"
                name="star"
                value="☆☆☆☆☆"
                checked={isSelected("☆☆☆☆☆")}
                onChange={handleRadioClick}
            /><br></br>
            <p>{notes ? notes.filter(note => {
                return note.id == bookDetails.id
            }).map(note => {
                return <p key={note.id}>{note.text}</p>
            }) : ""}</p>
            <article>{newNoteName ? "" : bookDetails}</article>
        </div>)
}

export default Details;