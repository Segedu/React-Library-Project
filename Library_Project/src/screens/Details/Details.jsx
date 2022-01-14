import { Fragment, useState } from "react"
import ReadingList from "../ReadingList/ReadingList";
import './Details.css';

const Details = ({ bookDetails, bookRate, setBookRate }) => {
    const [notes, setNotes] = useState([]);
    const [newNoteName, setNewNoteName] = useState([]);

    // todo: book id , user note, grade, email

    // let id = 0;
    const addTaskInputHandler = (e) => { setNewNoteName(e.target.value) };

    const AddNote = (todo) => {
        // let obj = { id: id++, text: todo }
        let obj = { text: todo }
        const notesArray = [obj, ...notes];
        setNotes(notesArray);
        let saveBook = localStorage.setItem("NOTES", JSON.stringify(notesArray));
        console.log(saveBook);
    }

    let elements = notes.map(note =>
        <p key={note.text}>{note.text}</p>
    )
    const isSelected = (value) => bookRate === value;

    const handleRadioClick = (e) => { setBookRate(e.currentTarget.value) };

    return (<Fragment>
        <h1>details page</h1>
        <h3>{bookDetails.volumeInfo.title}</h3>
        <p>{bookDetails.volumeInfo.authors[0]}</p>
        <img src={bookDetails.volumeInfo.imageLinks?.thumbnail || ""} />
        <p >{bookDetails.volumeInfo.description}</p>
        <textarea placeholder="Notes" onChange={(e) => { bookDetails.volumeInfo.note = addTaskInputHandler(e) }} />
        <h3>{bookDetails.volumeInfo.note}</h3>
        <button onClick={() => AddNote(newNoteName)}>save note</button>
        <h3>{bookRate}</h3>
        <input
            className="rateBook"
            type="radio"
            name="star"
            value="☆"
            checked={isSelected("☆")}
            onChange={(e) => { bookDetails.volumeInfo.bookRate = handleRadioClick(e) }}
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

        {/* <h3>Book Rate:{bookRate}</h3> */}
        <article>{notes ? elements : bookDetails}</article>
        <article>{newNoteName ? "" : bookDetails}</article>


    </Fragment>)
}

export default Details;