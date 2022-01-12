import axios from "axios";
import { BiBookAdd } from "react-icons/bi";
import { useState, useEffect, Fragment } from "react";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import './Search.css';

const Search = ({ setBooks, books, readingList, setReadingList }) => {
    const [searchBooksArray, setSearchBooksArray] = useState([]);
    const [flag, setFlag] = useState(false);
    const url = `https://www.googleapis.com/books/v1/volumes?q=MarcusAurelius&key=AIzaSyD9B_Kbyleik18VaRFdiQ8RSLH_UOxMIH4&maxResults=40`

    useEffect(getData, [url])

    function getData() {
        axios.get(url)
            .then(response => {
                setBooks(response.data.items);
            })
            .catch(error => console.error(error));
    }

    function searchBook(inputData) {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${inputData}+insubject:keyes&key=AIzaSyD9B_Kbyleik18VaRFdiQ8RSLH_UOxMIH4&maxResults=40`)
            .then(response => {
                setSearchBooksArray(response.data.items);
            })
            .catch(error => console.error(error));
    }

    const addToList = (bookId, category, setFunction) => {
        const foundBook = books.find(book => book.id == bookId);
        if (category.indexOf(foundBook) > -1) {
            alert("already in the reading list")
        } else {
            const updatedBooks = [foundBook, ...category];
            setFunction(updatedBooks);
        }
    }

    const elements = books.map((book, id) =>
        <article key={id}>
            <Tooltip title="Add To Read List" placement="top">
                <Button> <BiBookAdd fontSize="x-large" onClick={() => addToList(book.id, readingList, setReadingList)} /></Button>
            </Tooltip>
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors}</p>
            <img src={book.volumeInfo.imageLinks?.thumbnail || ""} />
            <p className="Description">{book.volumeInfo.description}</p>

        </article>);

    const generalBooksGallery = elements.splice(0, 10);

    const searchElements = searchBooksArray.map((book, id) =>
        <article key={id}>
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors}</p>
            <img src={book.volumeInfo.imageLinks?.thumbnail || ""} />
            <p className="Description" >{book.volumeInfo.description}</p>
            <Tooltip title="Add To Read List" placement="top">
                <Button> <BiBookAdd fontSize="x-large" onClick={() => addToList(book.id, readingList, setReadingList)} /></Button>
            </Tooltip>
        </article >)

    return (
        <Fragment>
            <h1>Discover</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                const searchInput = (e.target[0].value)
                searchBook(searchInput);
                setFlag(true);
            }}>
                <input type="text" onChange={(e) => {
                    e.target.value
                }} placeholder="Search Book..." />
                <input type="submit" value="Search" />
            </form>
            <section>{searchBooksArray ? searchElements : generalBooksGallery}</section>
            <section>{flag ? "" : generalBooksGallery}</section>
        </Fragment >)
}

export default Search;