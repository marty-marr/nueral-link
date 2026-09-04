import useLoginFormLogic from "../Hooks/loginFormLogic.ts";


function LoginForm() {
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

    if(isAuthenticated) {
        return <p>You are logged in!</p>
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={clearCredentials}>Clear Credentials</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default LoginForm;