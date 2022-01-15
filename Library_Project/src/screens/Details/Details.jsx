import { Fragment, useState } from "react"
import ReadingList from "../ReadingList/ReadingList";
import './Details.css';

const Details = ({ bookDetails, bookRate, setBookRate, notes, setNotes }) => {
    const [newNoteName, setNewNoteName] = useState([]);
    // let array = notes;
    // todo: book id , grade, email

    const addTaskInputHandler = (e) => { setNewNoteName(e.target.value) };

    const AddNote = (todo, bookDetailsId) => {
        let obj = { id: bookDetailsId, text: todo };
        const notesArray = [obj, ...notes];
        setNotes(notesArray);
        window.localStorage.setItem("Notes", JSON.stringify(notesArray));
    }

    const isSelected = (value) => bookRate === value;

    const handleRadioClick = (e) => {
        setBookRate(e.currentTarget.value)
        window.localStorage.setItem("Grades", JSON.stringify(bookRate));
    };

    // const elements = notes.map(note => {
    //     return <p key={note.id}>{note.text}</p>
    // })

    return (<div className="Details">
        <h1>details page</h1>
        <img src={bookDetails.volumeInfo.imageLinks?.thumbnail || ""} />
        <h3>{bookDetails.volumeInfo.title}</h3>
        <p>{bookDetails.volumeInfo.authors[0]}</p>
        <h3>{bookRate}</h3>
        <p >{bookDetails.volumeInfo.description}</p>
        <textarea placeholder="Notes" onChange={(e) => { bookDetails.volumeInfo.note = addTaskInputHandler(e) }} />
        <button onClick={() => AddNote(newNoteName, bookDetails.id)}>save note</button>
        <h3>{bookDetails.volumeInfo.note}</h3>
        <input
            className="rateBook"
            type="radio"
            name="star"
            value="☆"
            checked={isSelected("☆")}
            onChange={(e) => { bookDetails.volumeInfo.bookRate = handleRadioClick(e) }}

        // onChange={handleRadioClick}
        />  <input
            className="rateBook"
            type="radio"
            name="star"
            value="☆☆"
            checked={isSelected("☆☆")}
            onChange={handleRadioClick}

        // onChange={(e) => { bookDetails.volumeInfo.bookRate = handleRadioClick(e) }}
        />  <input
            className="rateBook"
            type="radio"
            name="star"
            value="☆☆☆"
            checked={isSelected("☆☆☆")}
            onChange={handleRadioClick}

        // onChange={(e) => { bookDetails.volumeInfo.bookRate = handleRadioClick(e) }}
        />  <input
            className="rateBook"
            type="radio"
            name="star"
            value="☆☆☆☆"
            checked={isSelected("☆☆☆☆")}
            onChange={handleRadioClick}

        // onChange={(e) => { bookDetails.volumeInfo.bookRate = handleRadioClick(e) }}
        />
        <input
            className="rateBook"
            type="radio"
            name="star"
            value="☆☆☆☆☆"
            checked={isSelected("☆☆☆☆☆")}
            // onChange={(e) => { bookDetails.volumeInfo.bookRate = handleRadioClick(e) }}

            onChange={handleRadioClick}
        /><br></br>

        {/* <h3>Book Rate:{bookRate}</h3> */}
        <article>{notes ? notes.map(note => {
            return <p key={note.id}>{note.text}</p>
        }) : ""}</article>
        <article>{newNoteName ? "" : bookDetails}</article>
    </div>)
}

export default Details;