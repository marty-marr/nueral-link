
import ProgressBar from "./ProgressBar.tsx";


function SuccessScreen({onComplete}: {onComplete: () => void}) {

    return (
        <div className="success-screen">
            <div className="success-screen-content">
                <h1 className="success-screen-title">Sequence Successful</h1>
                <ProgressBar onComplete={onComplete} />
                <p>Injecting...</p>
            </div>
        </div>
    );
}

export default SuccessScreen;