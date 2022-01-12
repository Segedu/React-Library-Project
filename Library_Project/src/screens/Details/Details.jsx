import { Fragment, useState } from "react"
import ReadingList from "../ReadingList/ReadingList";

const Details = ({ bookDetails, userGrade }) => {
    const [notes, setNotes] = useState([]);
    const [newNoteName, setNewNoteName] = useState([])
    // const [print, setPrint] = useState(false)

    // todo: book id , user note, grade, email
    let id = 0;
    const addTaskInputHandler = (e) => { setNewNoteName(e.target.value) }

    const AddNote = (todo) => {
        let obj = { id: id++, text: todo }
        const notesArray = [obj, ...notes];
        setNotes(notesArray);
        console.log({ notes });
        console.log( notesArray);
        return notesArray

    }

    let elements = notes.map((note) => 
    <p key={note.id}>{note.text}</p>)

    return (<Fragment>
        <h1>details page</h1>
        <h3>{bookDetails.volumeInfo.title}</h3>
        <p>{bookDetails.volumeInfo.authors}</p>
        <img src={bookDetails.volumeInfo.imageLinks?.thumbnail || ""} />
        <p >{bookDetails.volumeInfo.description}</p>
        <textarea placeholder="Notes" onChange={(e) => { bookDetails.volumeInfo.note = addTaskInputHandler(e) }} /><br></br>
        <h3>{bookDetails.volumeInfo.note}</h3>
        <section>{notes ? elements : bookDetails}</section>
        <button onClick={() => AddNote(newNoteName)}>save note</button>
        <section>{newNoteName ? "" :bookDetails}</section>


    </Fragment>)
}

export default Details;