import { Fragment, useState } from "react"

const Details = ({ bookDetails, userGrade }) => {
    const [notesArray, setNotesArray] = useState([])

    // todo: book id , user note, grade, email

    // function saveUserNotes(e) {
    //     let userNote = e.target.value;
    //     let history = [userNote, ...notesArray];
    //     history.splice(1, history.length)
    //     setNotesArray(history)

    //     localStorage.setItem("history", notesArray + history);

    // }

    return (<Fragment>
        <h1>details page</h1>
        <h3>{bookDetails.volumeInfo.title}</h3>
        <p>{bookDetails.volumeInfo.authors}</p>
        {/* <img src={bookDetails.imgUrl} /> */}
        <p >{bookDetails.volumeInfo.description}</p>
        <textarea placeholder="Notes" onChange={(e) => { bookDetails.volumeInfo.note = saveUserNotes(e) }} /><br></br>
        <p>{bookDetails.volumeInfo.note}        </p>
        <p>local storage:{localStorage.getItem("history")}</p>
        {notesArray}
    </Fragment>)
}

export default Details;