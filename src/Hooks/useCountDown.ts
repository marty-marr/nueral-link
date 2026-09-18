import {useCallback, useEffect, useState} from "react";


export function useCountDown(seconds: number) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [isRunning, setIsRunning] = useState(false);

    //tick once per second while running
    useEffect(() => {
        if(!isRunning) return;
        const id = setInterval(() => {
            setTimeLeft((t) => Math.max(0, t - 1))
        }, 1000);
        return () => clearInterval(id);
    }, [isRunning]);

    //stop automatically when it hits 0
    useEffect(() => {
        if (timeLeft === 0) setIsRunning(false);
    }, [timeLeft]);

    const start = useCallback(() => setIsRunning(true), []);
    const stop = useCallback(() => setIsRunning(false), []);
    const reset = useCallback(() => {
        setIsRunning(false);
        setTimeLeft(seconds);
    }, [seconds]);

    return {timeLeft, start, stop, reset};

}