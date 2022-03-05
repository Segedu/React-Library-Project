import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect, } from "react-router-dom";
import Context from './components/context';
import axios from "axios";
import HomePage from './screens/HomePage/HomePage';
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import Logout from './components/Logout';
import Search from './screens/Search/Search';
import CompletedList from './screens/CompletedList/CompletedList';
import ReadingList from './screens/ReadingList/ReadingList';
import Details from './screens/Details/Details';
import { Dropdown } from 'react-bootstrap';
import { BiMenu } from "react-icons/bi";
import './App.css';

function App() {
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useState(localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null);
  const [completedList, setCompletedList] = useState(localStorage.getItem("CompletedList") ? JSON.parse(localStorage.getItem("CompletedList")) : []);
  const [readingList, setReadingList] = useState(JSON.parse(localStorage.getItem("auth")).email == email ? JSON.parse(localStorage.getItem("ReadingList")) : []);
  const [bookRate, setBookRate] = useState(localStorage.getItem("Grades") ? JSON.parse(localStorage.getItem("Grades")) : null);
  const [notes, setNotes] = useState(localStorage.getItem("Notes") ? JSON.parse(localStorage.getItem("Notes")) : []);
  const [bookDetails, setBookDetails] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [books, setBooks] = useState([]);

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
    <Context.Provider value={{
      email, books, notes, readingList, bookDetails, bookRate, showDialog, completedList, showRegisterDialog, setReadingList, setAuth, setBooks, setEmail,
      setShowRegisterDialog, setCompletedList, setBookRate, setBookDetails,
      setNotes, setShowDialog
    }}>
      <BrowserRouter>
        <div className="App">
          {showDialog ? <Login /> : ""}
          {showRegisterDialog ? <Register /> : ""}
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
                  <Dropdown.Item href="/ReadingList"><Link to="/ReadingList">Reading List</Link></Dropdown.Item>
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
            <Route exact path="/" component={() => <HomePage />} />
            <Route exact path="/Login" component={() => <Login />} />
            <Route exact path="/Register" component={() => <Register />} />
            <Route exact path="/Search" component={() => <Search />} />
            <Route exact path="/CompletedList" component={() => <CompletedList />} />
            <Route exact path="/ReadingList" component={() => <ReadingList />} />
            <Route exact path="/Details" component={() => <Details />} />
          </Switch>
        </div>
      </BrowserRouter >
    </Context.Provider>

  )
}

export default App;
