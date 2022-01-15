import { useState, useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Switch, Route, Link, Router, Redirect, } from "react-router-dom";
import HomePage from './screens/HomePage/HomePage';
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import Logout from './components/Logout';
import Search from './screens/Search/Search';
import CompletedList from './screens/CompletedList/CompletedList';
import ReadingList from './screens/ReadingList/ReadingList';
import Details from './screens/Details/Details';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { BiMenu } from "react-icons/bi";
import './App.css';


function App() {
  const [auth, setAuth] = useState(null);
  const [books, setBooks] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [bookDetails, setBookDetails] = useState("");
  const [bookRate, setBookRate] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [notes, setNotes] = useState([]);

  const url = "/data/data.js";

  useEffect(getData, []);

  function getData() {
    axios.get(url)
      .then(response => {
        const data = JSON.parse(JSON.stringify(response.data))
        setBooks(data);
      }).catch(error => console.log(error));
  }

  return (
    <BrowserRouter>


      <div className="App">
        {/* {auth ? <Logout setAuth={setAuth} /> : <Redirect to="/" />} */}
        {showDialog ? <Login setCompletedList={setCompletedList} setReadingList={setReadingList} setBookRate={setBookRate} setNotes={setNotes} setShowDialog={setShowDialog} showDialog={showDialog} setAuth={setAuth} /> : ""}
        {showRegisterDialog ? <Register setShowRegisterDialog={setShowRegisterDialog} showRegisterDialog={showRegisterDialog} setAuth={setAuth} /> : ""}
        {auth ? (
          <>
            <Logout setAuth={setAuth} />
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                <BiMenu fontSize="x-large" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/Search"><Link to="/Search">Discover</Link></Dropdown.Item>
                <Dropdown.Item href="/CompletedList"><Link to="/CompletedList">Completed List</Link></Dropdown.Item>
                <Dropdown.Item href="/ReadingList"><Link to="/ReadingList">ReadingList List</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Redirect to="/Search" />
          </>
        ) : <Redirect to="/" />}
        {!auth ? (
          <>
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                <BiMenu fontSize="x-large" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/"><Link to="/">Home</Link></Dropdown.Item>
                <Dropdown.Item href="/Search"><Link to="/Search">Discover</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : <Redirect to="/Search" />}


        <Switch>
          <Route exact path="/" component={() => <HomePage setShowRegisterDialog={setShowRegisterDialog} setShowDialog={setShowDialog} setAuth={setAuth} />} />
          <Route exact path="/Login" component={() => <Login setCompletedList={setCompletedList} setReadingList={setReadingList} setBookRate={setBookRate} setNotes={setNotes} setShowDialog={setShowDialog} showDialog={showDialog} setAuth={setAuth} />} />
          <Route exact path="/Register" component={() => <Register setShowRegisterDialog={setShowRegisterDialog} showRegisterDialog={showRegisterDialog} setAuth={setAuth} />} />
          <Route exact path="/Search" component={() => <Search setBooks={setBooks} books={books} setReadingList={setReadingList} readingList={readingList} />} />
          <Route exact path="/CompletedList" component={() => <CompletedList setCompletedList={setCompletedList} completedList={completedList} setBookDetails={setBookDetails} setBookRate={setBookRate} />} />
          <Route exact path="/ReadingList" component={() => <ReadingList setReadingList={setReadingList} readingList={readingList} setCompletedList={setCompletedList} setBookDetails={setBookDetails} completedList={completedList} />} />
          <Route exact path="/Details" component={() => <Details notes={notes} setNotes={setNotes} bookDetails={bookDetails} bookRate={bookRate} setBookRate={setBookRate} />} />
        </Switch>
      </div>
    </BrowserRouter >
  )
}

export default App;
