import { useState, useContext } from "react";
import axios from "axios";
import { API_KEY } from '../../../logic/key';
import Context from "../../components/context";
import '../Login/Login.module.css';

const Register = () => {
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState()
    const [errorFromServer, setErrorFromServer] = useState(false);
    const { setAuth, showRegisterDialog, setShowRegisterDialog } = useContext(Context);

    function register() {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

        axios
            .post(url, {
                email: userEmail,
                password: password,
            })
            .then(function (response) {
                setAuth(response.data);
            })
            .catch(function (error) {
                console.log(error)
                setErrorFromServer(error)
            });
    }

    const emailValidation = (e) => {
        setUserEmail(e.target.value)
    }

    const passwordValidation = (e, setFunction) => {
        if (e.target.value.length > 7 && e.target.value !== ""
            && e.target.value != 0 && e.target.value !== null) {
            setFunction(e.target.value);
        }
    }

    return (
        <div className="Form">
            <dialog open={showRegisterDialog ? 'open' : 'close'}>
                <button onClick={() => { setShowRegisterDialog(false) }}>X</button>
                <h2>Register</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (password === confirmPassword) {
                        register()
                        setShowRegisterDialog(false)
                    } else {
                        alert("incorrect password")
                    }
                }}>
                    <input type="email" onChange={(e) => { emailValidation(e) }} placeholder="Enter Email" /><br></br>
                    <input type="password" onChange={(e) => { passwordValidation(e, setPassword) }} placeholder="Enter Password" /><br></br>
                    <input type="password" onChange={(e) => { passwordValidation(e, setConfirmPassword) }} placeholder="Confirm Password" /><br></br>
                    <input type="submit" value="Register" />
                </form>
            </dialog>
            <h3>{errorFromServer ? "Error from server during Registration" : ""}</h3>
        </div>
    )
}

export default Register;