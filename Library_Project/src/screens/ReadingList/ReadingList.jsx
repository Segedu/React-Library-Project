import { Fragment, useEffect, useState } from "react";
import { BiBookBookmark, BiBook } from "react-icons/bi";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import '../ReadingList/ReadingList.css';
import { Link, Redirect } from "react-router-dom";

const ReadingList =
    ({ setReadingList, readingList,
        setCompletedList, completedList, setBookDetails }) => {

        const [isRedirect, setIsRedirect] = useState(false);

        const moveToCompleted = (bookId, listName, secondListName, setFunction, secondFunc) => {
            const foundBook = readingList.find(book => book.id == bookId);
            const array = [foundBook, ...listName];
            setFunction(array);
            removeFromList(bookId, secondListName, secondFunc);
        }

        const removeFromList = (bookId, listName, setFunction) => {
            const removeArray = [...listName].filter(book => book.id !== bookId);
            setFunction(removeArray);
        }

        const showBookDetails = (bookId) => {
            const foundBook = readingList.find(book => book.id === bookId);
            setBookDetails(foundBook);
            setIsRedirect(true);
        }

        function shortDescription(description) {
            let readMore = "...";
            if (description.length > 100) {
                return description.slice(0, 100) + " " + readMore;
            } else {
                return description;
            }
        }

        const elements = readingList.map((book) =>
            <article key={book.id}>
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors}</p>
                <img onClick={() => { showBookDetails(book.id) }} src={book.volumeInfo.imageLinks?.thumbnail || ""} />
                <p className="Description" >{shortDescription(book.volumeInfo.description)}</p>
                <Tooltip title="Mark As Read" placement="top">
                    <Button> <BiBookBookmark fontSize="x-large" onClick={() => moveToCompleted(book.id, completedList, readingList, setCompletedList, setReadingList)} /></Button>
                </Tooltip>
                <Tooltip title="Remove From Read List" placement="top">
                    <Button> <BiBook fontSize="x-large" onClick={() => removeFromList(book.id, readingList, setReadingList)} /></Button>
                </Tooltip>
            </article>)

        return (
            <Fragment>
                <h1>Reading List page</h1>
                <section>{elements}</section>
                {isRedirect ? < Redirect to="/Details" /> : ""}
            </Fragment>)
    }

export default ReadingList;