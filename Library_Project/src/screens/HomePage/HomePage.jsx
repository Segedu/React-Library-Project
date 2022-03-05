import { useContext } from 'react';
import Context from '../../components/context';
import './HomePage.module.css';

const HomePage = () => {
    const { setShowDialog, setShowRegisterDialog } = useContext(Context);

    return (
        <div className='HomePage'>
            <h2>Stoa Library</h2>
            <button onClick={() => setShowDialog(true)}>Login</button><span> </span>
            <button onClick={() => setShowRegisterDialog(true)}>Register</button><span> </span>
        </div>)
}

export default HomePage;