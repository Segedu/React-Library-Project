import { Fragment, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { BiBook } from "react-icons/bi";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import styles from './CompletedList.module.css';

const CompletedList =
    ({ setCompletedList, completedList, bookRate, setBookRate, setBookDetails }) => {
        const [isRedirect, setIsRedirect] = useState(false);

        const isSelected = (value) => bookRate === value;

        const handleRadioClick = (e) => { setBookRate(e.currentTarget.value) };

        const removeFromList = (bookId, listName, setFunction) => {
            const removeArray = [...listName].filter(book => book.id !== bookId);
            setFunction(removeArray);
            localStorage.setItem("CompletedList", JSON.stringify(removeArray));
        }

        const showBookDetails = (bookId) => {
            const foundBook = completedList.find(book => book.id === bookId);
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

        const elements = completedList.map((completed, id) =>
            <article key={id}>
                <h3>{completed.volumeInfo.title}</h3>
                <p>{completed.volumeInfo.author}</p>
                <img onClick={() => { showBookDetails(completed.id) }} src={completed.volumeInfo.imageLinks?.thumbnail || ""} />
                <p className={styles.description}>{shortDescription(completed.volumeInfo.description)}</p>
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
                <Tooltip title="Remove from Completed" placement="top">
                    <Button> <BiBook fontSize="x-large" onClick={() => removeFromList(completed.id, completedList, setCompletedList)} /></Button>
                </Tooltip>
            </article>)

        return (
            <Fragment>
                <h1>Completed List </h1>
                <section>{elements} </section>
                {isRedirect ? < Redirect to="/Details" /> : ""}
            </Fragment>)
    }

export default CompletedList;