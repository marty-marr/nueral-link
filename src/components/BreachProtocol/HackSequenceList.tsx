import { type Hack } from '../../types/breach';
import { getSequenceProgress } from '../../utils/getSequenceProgress';

type HackSequenceListProps = {
    hacks: Hack[];
    bufferValues: string[];
    completedHacks: Set<string>;
};

export function HackSequenceList({ hacks, bufferValues, completedHacks }: HackSequenceListProps) {
    return (
        <div className="hack-list">
            {hacks.map((hack) => {
                const isDone = completedHacks.has(hack.name);
                const progress = isDone ? hack.sequence.length : getSequenceProgress(hack.sequence, bufferValues);

                return (
                    <div key={hack.name} className={`hack-item ${isDone ? 'completed' : ''}`}>
                        <div className="hack-sequence">
                            {hack.sequence.map((code, i) => (
                                <span key={i} className={i < progress ? 'matched' : ''}>
                  {code}
                </span>
                            ))}
                        </div>
                        <div className="hack-name">{hack.name}</div>
                        <div className="hack-description">{hack.description}</div>
                    </div>
                );
            })}
        </div>
    );
}