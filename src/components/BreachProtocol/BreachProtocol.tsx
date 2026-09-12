import { useBreachProtocol } from '../../Hooks/useBreachProtocol';
import { hacks } from '../../data/hacks';
import { CodeMatrix } from './CodeMatrix';
import { HackSequenceList } from './HackSequenceList';

type BreachProtocolProps = {
    grid: string[][];
};



export function BreachProtocol({ grid }: BreachProtocolProps) {
    const { buffer, isSelectable, isUsed, completedHacks, selectCell } = useBreachProtocol(grid, hacks);

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