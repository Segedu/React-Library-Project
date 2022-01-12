import { Fragment, useState } from "react"

const Details = ({ bookDetails, userGrade }) => {

    const [notesArray, setNotesArray] = useState([])
    const [print, setPrint] = useState(false)
    // todo: book id , user note, grade, email

    function saveUserNotes(e) {
        console.log(e);
    }

    return (<Fragment>
        <h1>details page</h1>
        <h3>{bookDetails.volumeInfo.title}</h3>
        <p>{bookDetails.volumeInfo.authors}</p>
        <img src={bookDetails.volumeInfo.imageLinks?.thumbnail || ""} />
        <p >{bookDetails.volumeInfo.description}</p>
        <textarea placeholder="Notes" onChange={(e) => { bookDetails.volumeInfo.note = saveUserNotes(e) }} /><br></br>
        <button onClick={() => setPrint(true)}>save note</button>
        {print ? notesArray : ""}

    </Fragment>)
}

export default Details;