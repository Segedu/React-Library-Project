import axios from "axios";
import { useState } from "react";
import { API_KEY } from '../../../logic/key';
import './Login.module.css';

const Login = ({ setAuth, showDialog, setShowDialog }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorFromServer, setErrorFromServer] = useState(false);
    const LOCAL_STORAGE_AUTH_KEY = "auth";
   

    const login = () => {
        // setLoading(true)
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        axios
            .post(url, {
                email,
                password,
            })
            .then(function (response) {
                // setTimeout(() => {
                // setLoading(false)
                setAuth(response.data);
                localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(response.data));
                // }, 5000)
            })
            .catch(function (error) {
                console.log(error)
                setErrorFromServer(error)
            });
    }

    return (
        <div className="Form">
            <dialog open={showDialog ? 'open' : 'close'}>
                <button onClick={() => { setShowDialog(false) }}>X</button>
                <h2>Login</h2>
                <form onSubmit={(e) => {
                    e.preventDefault(),
                        login()
                    setShowDialog(false)
                }}>
                    <input type="email" placeholder="Enter Your Email" onChange={(e) => { setEmail(e.target.value) }} /><br></br>
                    <input type="password" placeholder="Enter Your Password" onChange={(e) => { setPassword(e.target.value) }} /><br></br>
                    <input type="submit" value="Log-In" />
                </form>
            </dialog>
            <h3>{errorFromServer ? "Error from server during Login" : ""}</h3>
        </div >)
}

export default Login