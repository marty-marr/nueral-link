
import ProgressBar from "./ProgressBar.tsx";
import {useState} from "react";


function WelcomeScreen() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'entered'>('idle');

    if (status === 'idle') {
        return (
            <>
                <div className="welcome-screen">
                    <div className="welcome-screen-content">
                        <h1 className="welcome-screen-title">Welcome to nueral link</h1>
                        <button onClick={()=>setStatus('loading')}>Enter</button>
                    </div>

                </div>

            </>
        )
    }

    if (status === 'loading') {
        return (
            <div className='welcome-screen'>
                <div className='welcome-screen-content'>
                    <h1 className='welcome-screen-title'>Loading...</h1>
                    <ProgressBar onComplete={() => setStatus('entered')}/>
                </div>
            </div>
        )
    }

}

export default WelcomeScreen;