import { Fragment, useState } from "react"
import ReadingList from "../ReadingList/ReadingList";

const Details = ({ bookDetails, bookRate }) => {
    const [notes, setNotes] = useState([]);
    const [newNoteName, setNewNoteName] = useState([]);
    // const [flag, setFlag] = useState(false);

    // todo: book id , user note, grade, email
    let id = 0;
    const addTaskInputHandler = (e) => { setNewNoteName(e.target.value) }

    const AddNote = (todo) => {
        let obj = { id: id++, text: todo }
        const notesArray = [obj, ...notes];
        setNotes(notesArray);
    }

    let elements = notes.map(note =>
        <ul>
            <li key={note.id}>{note.text}</li>
        </ul>
    )

    return (<Fragment>
        <h1>details page</h1>
        <h3>{bookDetails.volumeInfo.title}</h3>
        <p>{bookDetails.volumeInfo.authors}</p>
        <img src={bookDetails.volumeInfo.imageLinks?.thumbnail || ""} />
        <p >{bookDetails.volumeInfo.description}</p>
        <textarea placeholder="Notes" onChange={(e) => { bookDetails.volumeInfo.note = addTaskInputHandler(e) }} /><br></br>
        <h3>{bookDetails.volumeInfo.note}</h3>
        <h3>{bookRate}</h3>
        <button onClick={() => AddNote(newNoteName)}>save note</button>
        <article>{notes ? elements : bookDetails}</article>
        {/* <article>{newNoteName ? "" : bookDetails}</article> */}


    </Fragment>)
}

export default Details;