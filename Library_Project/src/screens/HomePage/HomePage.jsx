import { useState } from "react";
import Login from "../Login/Login"
import Register from "../Register/Register";

const HomePage = ({ setAuth }) => {
    const [loginFlag, setLoginFlag] = useState(false);
    const [registerFlag, setRegisterFlag] = useState(false);
    return (
        <div>
            <h2>Library</h2>
            <span> Have an account? </span><span> New to our Library?</span><br></br>
            <button onClick={() => setLoginFlag(true)}>Login</button><span> </span>
            <button onClick={() => setRegisterFlag(true)}>Register</button>
            {loginFlag ? <Login setAuth={setAuth} /> : ""}
            {registerFlag ? <Register setAuth={setAuth} /> : ""}
        </div>)
}

export default HomePage;    