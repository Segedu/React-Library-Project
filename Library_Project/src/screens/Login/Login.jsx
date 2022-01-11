import axios from "axios";
import { useState, useEffect } from "react";
import { API_KEY } from '../../../logic/key';

const Login = ({ setAuth }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorFromServer, setErrorFromServer] = useState(false);
    const LOCAL_STORAGE_AUTH_KEY = "auth";

    useEffect(getLocalStorageData, [email])

    const login = () => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        axios
            .post(url, {
                email,
                password,
            })
            .then(function (response) {
                setAuth(response.data);
                window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error)
                setErrorFromServer(error)
            });
    }

    function getLocalStorageData() {
        if (LOCAL_STORAGE_AUTH_KEY !== null) {
            let data = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
            setAuth(JSON.parse(data));
        }
    }

    return (
        <div className="Register">
            <h5>Login Here</h5>
            <form onSubmit={(e) => {
                e.preventDefault(),
                    login()
            }}>
                <input type="emil" placeholder="Enter Your Email" onChange={(e) => { setEmail(e.target.value) }} /><br></br>
                <input type="password" placeholder="Enter Your Password" onChange={(e) => { setPassword(e.target.value) }} /><br></br>
                <input type="submit" value="Log-In" />
            </form>
            <h3>{errorFromServer ? "Error from server during Login" : ""}</h3>
        </div >)
}

export default Login