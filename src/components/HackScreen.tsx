import '../HackScreenStyle.css'
import { BreachProtocol } from "./BreachProtocol/BreachProtocol";
import codeMatrixNumbers from '../Hooks/codeMatrixNumbers';
import { chunkArray } from '../utils/chunkyArray';

const codeMatrixGrid = chunkArray(codeMatrixNumbers, 6);

function HackScreen() {
    return (
        <div className="hack-screen">
            <h1 className="brand-name">NetTech</h1>

            <div className="hack-window">
                <h2 className="hack-window-title">Breach Time Remaining</h2>
            </div>

            <BreachProtocol grid={codeMatrixGrid} />
        </div>
    );
}

export default HackScreen;