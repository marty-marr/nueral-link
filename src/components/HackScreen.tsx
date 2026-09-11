import '../HackScreenStyle.css'
import { BreachProtocol } from "./BreachProtocol/BreachProtocol";
import codeMatrixNumbers from '../Hooks/codeMatrixNumbers';
import { chunkArray } from '../utils/chunkyArray';

const codeMatrixGrid = chunkArray(codeMatrixNumbers, 6);

function HackScreen() {
    return (
        <div className="hack-screen">
            <div className='screen-headers'>
            <h1 className="brand-name">NetTech</h1>

            <div className="breach-time">
                <h2 className="hack-window-title">Breach Time Remaining</h2>
            </div>
            </div>

            <BreachProtocol grid={codeMatrixGrid} />
        </div>
    );
}

export default HackScreen;