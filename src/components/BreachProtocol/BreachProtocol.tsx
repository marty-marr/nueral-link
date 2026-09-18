
import { hacks } from '../../data/hacks';
import { CodeMatrix } from './CodeMatrix';
import { HackSequenceList } from './HackSequenceList';
import type {useBreachProtocol} from "../../Hooks/useBreachProtocol.ts";

type BreachProtocolProps = {
    grid: string[][];
    breach: ReturnType<typeof useBreachProtocol>
};



export function BreachProtocol({ grid, breach }: BreachProtocolProps) {
    const { buffer, isSelectable, isUsed, completedHacks, selectCell } = breach;

    return (
        <div className="breach-protocol">


            <div className="breach-panels">
                <div className="code-window">
                    <h2 className="code-window-title">Code Matrix</h2>
                    <CodeMatrix
                        grid={grid}
                        isSelectable={isSelectable}
                        isUsed={isUsed}
                        onSelect={selectCell}
                    />
                </div>

                <div className="sequence-window">
                    <h2 className="hack-window-title">Sequence Required to Upload</h2>
                    <HackSequenceList hacks={hacks} bufferValues={buffer.map((c) => c.value)} completedHacks={completedHacks} />
                </div>
            </div>
        </div>
    );
}