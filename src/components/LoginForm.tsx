import useLoginFormLogic from "../Hooks/loginFormLogic.ts";
import {useEffect} from "react";


function LoginForm({onComplete}: {onComplete: () => void}) {
    const {
        username,
        setUsername,
        password,
        setPassword,
        isAuthenticated,
        error,
        handleSubmit,
        clearCredentials,
    } = useLoginFormLogic();

    useEffect(() => {
        if(isAuthenticated) {

            onComplete();
        }
    }, [isAuthenticated, onComplete]);



    return (
        <div className="login-form">
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <div className="login-input-container">
                <label className='login-form-label' htmlFor="username">Username:</label>
            <input className="login-form-input" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <label className='login-form-label' htmlFor="password">Password:</label>
            <input className="login-form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="login-form-btn" onClick={clearCredentials}>Clear Credentials</button>
            {error && <p>{error}</p>}
            </div>
        </form>
        </div>
    )
}

export default LoginForm;