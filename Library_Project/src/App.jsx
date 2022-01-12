import { useState } from 'react'
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

function App({ bookRate }) {
  const [auth, setAuth] = useState(null);
  const [books, setBooks] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [bookDetails, setBookDetails] = useState("");

  return (
    <BrowserRouter>
      <div className="App">
        {!auth ? (
          <>
            <Link to="/">The Library</Link><span> </span>
            <Link to="/Login">Login</Link><span> </span>
            <Link to="/Register">Register</Link><span></span>
          </>) : <Redirect to="/Search" />}
        {auth ? (<>
          <Link to="/Search">Discover</Link><span> </span>
          <Link to="/CompletedList">Completed List</Link><span> </span>
          <Link to="/ReadingList">Reading List</Link><span> </span>
        </>
        ) : <Redirect to="/Login" />}
        {auth ? <Logout setAuth={setAuth} /> : <Redirect to="/" />}

        <Switch>
          <Route exact path="/" component={() => <HomePage setAuth={setAuth} />} />
          <Route exact path="/Login" component={() => <Login setAuth={setAuth} />} />
          <Route exact path="/Register" component={() => <Register setAuth={setAuth} />} />
          <Route exact path="/Search" component={() => <Search setBooks={setBooks} books={books}
            setReadingList={setReadingList}
            readingList={readingList} />} />
          <Route exact path="/CompletedList" component={() =>
            <CompletedList setCompletedList={setCompletedList} completedList={completedList} setBookDetails={setBookDetails} />} />
          <Route exact path="/ReadingList" component={() =>
            <ReadingList setReadingList={setReadingList} readingList={readingList}
              setCompletedList={setCompletedList} setBookDetails={setBookDetails} completedList={completedList} />} />
          <Route exact path="/Details" component={() => <Details bookDetails={bookDetails} bookRate={bookRate} />} />
        </Switch>
      </div>
    </BrowserRouter >
  )

}

export default App;
