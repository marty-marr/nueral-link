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
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={clearCredentials}>Clear Credentials</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default LoginForm;