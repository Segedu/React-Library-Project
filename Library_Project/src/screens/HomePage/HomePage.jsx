
const HomePage = ({ setAuth, setShowDialog, setShowRegisterDialog }) => {
    return (
        <div>
            <h2>Library</h2>
            <span> Have an account? </span><span> New to our Library?</span><br></br>
            <button onClick={() => setShowDialog(true)}>Login</button><span> </span>
            <button onClick={() => setShowRegisterDialog(true)}>Register</button><span> </span>
        </div>)
}

export default HomePage;    