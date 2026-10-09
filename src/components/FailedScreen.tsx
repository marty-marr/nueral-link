

function FailedScreen() {

    return (
        <div className="failed-screen">
            <div className="failed-screen-content">
                <h1 className="failed-screen-title">Injection Failed</h1>
                <button className="failed-screen-button" onClick={() => window.location.reload()}>Try Again</button>
            </div>
        </div>
    );
}

export default FailedScreen;