import {useEffect, useState} from "react";


interface ProgressBarProps {
    duration?: number; // ms, default 2400
    onComplete?: () => void;
}

function ProgressBar({ duration = 2400, onComplete}: ProgressBarProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const start = Date.now();
        const interval = setInterval(()=> {
            const pct = Math.min(100, ((Date.now() - start) / duration) * 100);
            setProgress(pct);
            if (pct >= 100) {
                clearInterval(interval);
                onComplete?.();
            }
        }, 16);
        return () => clearInterval(interval);
    }, [duration, onComplete]);

    return (
        <div className='progress-track'>
            <div className='progress-fill' style={{width: `${progress}%`}} />
        </div>
    );
}

export default ProgressBar;
