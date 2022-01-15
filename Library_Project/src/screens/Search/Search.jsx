import { BiBookAdd } from "react-icons/bi";
import { useState, Fragment } from "react";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import './Search.css';

const Search = ({ books, readingList, setReadingList }) => {
    const [searchBooksArray, setSearchBooksArray] = useState([]);
    const [search, setSearch] = useState("");

    let tempBook = books;
    function searchStringInAuthorTitleDescription(userInput) {
        tempBook.forEach(element => {
            element.volumeInfo.title.toLowerCase();
            element.volumeInfo.description?.toLowerCase();
            element.volumeInfo.authors[0].toLowerCase();
            if (tempBook.indexOf(userInput > -1)) {
                return tempBook[userInput]
            }
        })

        const titleFilter = tempBook.filter(book => book.volumeInfo.title.includes(userInput));
        const descriptionFilter = tempBook.filter(book => book.volumeInfo.description?.includes(userInput));
        const authorFilter = tempBook.filter(book => book.volumeInfo.authors?.includes(userInput));
        let searchesResultArray = titleFilter.concat(authorFilter).concat(descriptionFilter);
        let uniqueArray = [...new Set(searchesResultArray)];
        let shortenArray = uniqueArray.splice(0, 10);
        setSearchBooksArray(shortenArray)
    }

    const addToList = (bookId, category, setFunction) => {
        const foundBook = books.find(book => book.id == bookId);
        if (category.indexOf(foundBook) > -1) {
            alert("already in the reading list")
        } else {
            const updatedBooks = [foundBook, ...category];
            setFunction(updatedBooks);
            //    let tolocal = [foundBook.id, ...category]
            let saveBook = localStorage.setItem("ReadingList", JSON.stringify(updatedBooks));
            console.log(saveBook);
        }
    }

    const elements = books.map((book) =>
        <article key={book.id}>
            <img src={book.volumeInfo.imageLinks?.thumbnail || ""} />
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors}</p>
            <p className="Description">{book.volumeInfo.description}</p>
            <Tooltip title="Add To Read List" placement="top">
                <Button> <BiBookAdd fontSize="xx-large" onClick={() => addToList(book.id, readingList, setReadingList)} /></Button>
            </Tooltip>

        </article>);

    const generalBooksGallery = elements.splice(0, 10);

    const searchElements = searchBooksArray.map((book, id) =>
        <article key={id}>
            <img src={book.volumeInfo.imageLinks?.thumbnail || ""} />
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors}</p>
            <p className="Description" >{book.volumeInfo.description}</p>
            <Tooltip title="Add To Read List" placement="top">
                <Button> <BiBookAdd fontSize="x-large" onClick={() => addToList(book.id, readingList, setReadingList)} /></Button>
            </Tooltip>
        </article >);

    return (
        <Fragment>
            <h1>Discover</h1>
            <input type="text" onChange={(e) => {
                e.target.value
                const searchInput = (e.target.value);
                setSearch(searchInput)
                searchStringInAuthorTitleDescription(searchInput.toLowerCase());
            }} placeholder="Search Book..." />
            <section>{search ? searchElements : generalBooksGallery}</section>
        </Fragment >)
}

export default Search;