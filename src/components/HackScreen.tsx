
import '../HackScreenStyle.css'

import gridNumbers from "./GridNumbers.tsx";

function HackScreen() {

    return (
        <>
            <div className="hack-screen">
                <h1 className='brand-name'>NetTech</h1>
                <div className='hack-window'>
                    <h2 className='hack-window-title'>Breach Time Remaining</h2>
                </div>
                <div className='code-window'>
                    <h2 className='code-window-title'>Code Matrix</h2>
                    {gridNumbers()}
                </div>
            </div>
        </>
    );
}

export default HackScreen;