import Login from '../Login/Login';
import Register from '../Register/Register';
import './HomePage.module.css';

const HomePage = ({ showDialog, showRegisterDialog, setShowDialog, setShowRegisterDialog }) => {
    return (
        <div className='HomePage'>
            {/* <h2>Library</h2> */}
            {/* <span> Have an account? </span><span> New to our Library?</span><br></br> */}
            <button onClick={() => setShowDialog(true)}>Login</button><span> </span>
            <button onClick={() => setShowRegisterDialog(true)}>Register</button><span> </span>
            {showDialog ? <Login /> : ""}
            {showRegisterDialog ? <Register /> : ""}

        </div>)
}

export default HomePage;    