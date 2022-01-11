import { Fragment, useState } from 'react';
import './CompletedList.css';
import { BiBook } from "react-icons/bi";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

const CompletedList =
    ({ setCompletedList, completedList, setBookDetails, setUserGrade }) => {
        const [data, setData] = useState("")
        const removeFromList = (bookId, listName, setFunction) => {
            const removeArray = [...listName].filter(book => book.id !== bookId)
            setFunction(removeArray)
        }

        const showBookDetails = (bookId) => {
            const foundBook = completedList.find(book => book.id === bookId)
            setBookDetails(foundBook)
        }

        const elements = completedList.map((completed, id) =>
            <article key={id}>
                <h3>{completed.volumeInfo.title}</h3>
                <p>{completed.volumeInfo.author}</p>
                <img onClick={() => { showBookDetails(completed.id) }} src={completed.volumeInfo.imageLinks?.thumbnail || ""} />
                <p className="Description">{completed.volumeInfo.description}</p>
                {/* <select value={e.target.value} onChange={setData(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select> */}
                <Tooltip title="Remove from Completed" placement="top">
                    <Button> <BiBook fontSize="x-large" onClick={() => removeFromList(completed.id, completedList, setCompletedList)} /></Button>
                </Tooltip>
            </article>)

        return (
            <Fragment>
                <h1>Completed List page</h1>
                <section>
                    {elements}
                </section>
                <h1>{data}</h1>
            </Fragment>)
    }

export default CompletedList;