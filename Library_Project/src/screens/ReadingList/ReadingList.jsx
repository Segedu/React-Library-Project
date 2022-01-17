import { Fragment, useEffect, useState } from "react";
import { BiBookBookmark, BiBook } from "react-icons/bi";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { Redirect } from "react-router-dom";
import styles from './ReadingList.module.css';


const ReadingList =
    ({ setReadingList, readingList,
        setCompletedList, completedList, setBookDetails }) => {
        const [isRedirect, setIsRedirect] = useState(false);

        const moveToCompleted = (bookId, completedList, readingList, setCompletedList, setReadingList) => {
            const foundBook = readingList.find(book => book.id == bookId);
            const array = [foundBook, ...completedList];
            setCompletedList(array);
            removeFromList(bookId, readingList, setReadingList);
            localStorage.setItem("CompletedList", JSON.stringify(array));
        }

        const removeFromList = (bookId, listName, setFunction) => {
            const removeArray = [...listName].filter(book => book.id !== bookId);
            setFunction(removeArray);
            localStorage.setItem("ReadingList", JSON.stringify(removeArray));
            return removeArray
        }

        const showBookDetails = (bookId) => {
            const foundBook = readingList.find(book => book.id === bookId);
            setBookDetails(foundBook);
            setIsRedirect(true);
        }

        function shortDescription(description) {
            if (description.length > 100) {
                return description.slice(0, 100) + "... "
            } else {
                return description;
            }
        }

        const elements = readingList.map((book) =>
            <article key={book.id}>
                <img src={book.volumeInfo.imageLinks?.thumbnail || ""} onClick={() => { showBookDetails(book.id) }} />
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors}</p>
                <p className={styles.description} >{shortDescription(book.volumeInfo.description)}</p>
                <Tooltip title="Mark As Read" placement="top">
                    <Button> <BiBookBookmark fontSize="x-large" onClick={() => moveToCompleted(book.id, completedList, readingList, setCompletedList, setReadingList)} /></Button>
                </Tooltip>
                <Tooltip title="Remove From Read List" placement="top">
                    <Button> <BiBook fontSize="x-large" onClick={() => removeFromList(book.id, readingList, setReadingList)} /></Button>
                </Tooltip>
            </article>)

        return (
            <Fragment>
                <h1>Reading List</h1>
                <section>{elements ? elements : ""}</section>
                {isRedirect ? < Redirect to="/Details" /> : ""}
            </Fragment>)
    }

export default ReadingList;