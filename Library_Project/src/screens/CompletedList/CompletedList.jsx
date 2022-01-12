import { Fragment, useState } from 'react';
import './CompletedList.css';
import { Link, Redirect } from "react-router-dom";
import { BiBook } from "react-icons/bi";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

const CompletedList =
    ({ setCompletedList, completedList, setBookDetails }) => {
        const [bookRate, setBookRate] = useState("");
        const [isRedirect, setIsRedirect] = useState(false);

        const removeFromList = (bookId, listName, setFunction) => {
            const removeArray = [...listName].filter(book => book.id !== bookId);
            setFunction(removeArray);
        }

        const showBookDetails = (bookId) => {
            const foundBook = completedList.find(book => book.id === bookId);
            setBookDetails(foundBook);
            setIsRedirect(true);
        }
        const isSelected = (value) => bookRate === value;

        const handleRadioClick = (e) => setBookRate(e.currentTarget.value);

        const elements = completedList.map((completed, id) =>
            <article key={id}>
                <h3>{completed.volumeInfo.title}</h3>
                <p>{completed.volumeInfo.author}</p>
                <img onClick={() => { showBookDetails(completed.id) }} src={completed.volumeInfo.imageLinks?.thumbnail || ""} />
                <p className="Description">{completed.volumeInfo.description}</p>
                <input
                    type="radio"
                    name="star"
                    value="oneStar"
                    checked={isSelected("oneStar")}
                    onChange={handleRadioClick}
                />  <input
                    type="radio"
                    name="star"
                    value="twoStars"
                    checked={isSelected("twoStars")}
                    onChange={handleRadioClick}
                />  <input
                    type="radio"
                    name="star"
                    value="threeStars"
                    checked={isSelected("threeStars")}
                    onChange={handleRadioClick}
                />  <input
                    type="radio"
                    name="star"
                    value="fourStars"
                    checked={isSelected("fourStars")}
                    onChange={handleRadioClick}
                />
                <input
                    type="radio"
                    name="star"
                    value="fiveStars"
                    checked={isSelected("fiveStars")}
                    onChange={handleRadioClick}
                /><br></br>
                <Tooltip title="Remove from Completed" placement="top">
                    <Button> <BiBook fontSize="x-large" onClick={() => removeFromList(completed.id, completedList, setCompletedList)} /></Button>
                </Tooltip>
            </article>)

        return (
            <Fragment>
                <h1>Completed List page</h1>
                <section>{elements} </section>
                <h1>{bookRate}</h1>
                {isRedirect ? < Redirect to="/Details" /> : ""}
            </Fragment>)
    }

export default CompletedList;