import ProgressBar from "./ProgressBar.tsx";


function InjectionScreen({onComplete}: {onComplete: () => void}) {

    return (
        <div className="success-screen">
            <div className="success-screen-content">
                <h1 className="success-screen-title">Injecting kernel</h1>
                <ProgressBar onComplete={onComplete} />
            </div>
        </div>
    );
}

export default InjectionScreen;