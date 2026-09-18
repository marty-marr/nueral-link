import '../HackScreenStyle.css'
import { BreachProtocol } from "./BreachProtocol/BreachProtocol";
import codeMatrixNumbers from '../Hooks/codeMatrixNumbers';
import { chunkArray } from '../utils/chunkyArray';
import { useBreachProtocol } from '../Hooks/useBreachProtocol';
import { hacks} from "../data/hacks.ts";



const codeMatrixGrid = chunkArray(codeMatrixNumbers, 6);

function HackScreen() {
    const breach = useBreachProtocol(codeMatrixGrid, hacks);
    return (
        <div className="hack-screen">
            <div className='screen-headers'>
            <h1 className="brand-name">NetTech</h1>

            <div className="breach-time">
                <h2 className="hack-window-title">Breach Time Remaining: {String(breach.timeLeft).padStart(2, '0')}</h2>
            </div>
            </div>

            <BreachProtocol grid={codeMatrixGrid} breach={breach} />
        </div>
    );
}

export default HackScreen;