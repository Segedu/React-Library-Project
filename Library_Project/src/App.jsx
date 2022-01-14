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

      {showDialog ? <Login setShowDialog={setShowDialog} showDialog={showDialog} setAuth={setAuth} /> : ""}
      {showRegisterDialog ? <Register setShowRegisterDialog={setShowRegisterDialog} showRegisterDialog={showRegisterDialog} setAuth={setAuth} /> : ""}

      <div className="App">
        {!auth ? (
          <>
            <Link to="/">The Library</Link><span> </span>
            <Link to="/Search">Discover</Link><span> </span>

            {/* <Link to="/Login">Login</Link><span> </span> */}
            {/* <Link to="/Register">Register</Link><span></span> */}
          </>
        ) : <Redirect to="/Search" />}
        {auth ? (<>
          <Link to="/Search">Discover</Link><span> </span>
          <Link to="/CompletedList">Completed List</Link><span> </span>
          <Link to="/ReadingList">Reading List</Link><span> </span>
          <Redirect to="/Search" />
        </>
        ) : <Redirect to="/Login" />}
        {auth ? <Logout setAuth={setAuth} /> : <Redirect to="/" />}

        <Switch>
          <Route exact path="/" component={() => <HomePage setShowRegisterDialog={setShowRegisterDialog} setShowDialog={setShowDialog} setAuth={setAuth} />} />
          <Route exact path="/Login" component={() => <Login setShowDialog={setShowDialog} showDialog={showDialog} setAuth={setAuth} />} />
          <Route exact path="/Register" component={() => <Register setShowRegisterDialog={setShowRegisterDialog} showRegisterDialog={showRegisterDialog} setAuth={setAuth} />} />
          <Route exact path="/Search" component={() => <Search setBooks={setBooks} books={books}
            setReadingList={setReadingList}
            readingList={readingList} />} />
          <Route exact path="/CompletedList" component={() =>
            <CompletedList setCompletedList={setCompletedList} completedList={completedList} setBookDetails={setBookDetails} setBookRate={setBookRate} />} />
          <Route exact path="/ReadingList" component={() =>
            <ReadingList setReadingList={setReadingList} readingList={readingList}
              setCompletedList={setCompletedList} setBookDetails={setBookDetails} completedList={completedList} />} />
          <Route exact path="/Details" component={() => <Details bookDetails={bookDetails} bookRate={bookRate} setBookRate={setBookRate} />} />
        </Switch>
      </div>
    </BrowserRouter >
  )
}

export default App;
