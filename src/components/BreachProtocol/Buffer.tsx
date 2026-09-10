import {type Cell } from '../../types/breach';

type BufferProps = {
    buffer: Cell[];
    size: number;
}

export function Buffer({ buffer, size }: BufferProps) {
    const slots = Array.from({ length: size})

    return (
        <div className='buffer'>
            {slots.map((_, i) => (
                <div key={i} className={`buffer-slot ${buffer[i] ? 'filled' : ''}`}>
                    {buffer[i]?.value ?? ''}
                </div>
            ))}
        </div>
    )
}