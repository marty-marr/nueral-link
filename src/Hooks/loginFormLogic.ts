import {useState} from "react";


interface Credentials {
    username: string;
    password: string;
}

interface LoginFormLogic {
    username: string;
    setUsername: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    clearCredentials: () => void;
    isAuthenticated: boolean;
    error: string;
    handleSubmit: () => void;
}

const STORAGE_KEY = "credentials";

function useLoginFormLogic(): LoginFormLogic {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState("");

    function handleSubmit() {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored === null) {
            //Nothing saved yet - register
            const newCredentials: Credentials = {
                username,
                password
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newCredentials));
            setIsAuthenticated(true);
            setError("");
            return;
        }

        // Something is saved - compare against it
        const savedCredentials: Credentials = JSON.parse(stored);

        if (
            savedCredentials.username === username && savedCredentials.password === password
        ) {
            setIsAuthenticated(true);
            setError("");
        } else {
            setIsAuthenticated(false);
            setError("Invalid credentials");
        }
    }

        function clearCredentials() {
            localStorage.removeItem(STORAGE_KEY);
            setIsAuthenticated(false);
            setUsername("");
            setPassword("");
            setError("Credentials Cleared");
        }


    return {
        username,
        setUsername,
        password,
        setPassword,
        isAuthenticated,
        error,
        handleSubmit,
        clearCredentials,
    }
}

export default useLoginFormLogic;
