type CodeMatrixProps = {
    grid: string[][];
    isSelectable: (row: number, col: number) => boolean;
    isUsed: (row: number, col: number) => boolean;
    onSelect: (row: number, col: number) => void;
};

export function CodeMatrix({ grid, isSelectable, isUsed, onSelect }: CodeMatrixProps) {
    return (
        <div className="code-matrix-numbers">
            {grid.map((rowValues, row) => (
                <div className="code-matrix-row" key={row}>
                    {rowValues.map((value, col) => {
                        const selectable = isSelectable(row, col);
                        const used = isUsed(row, col);
                        return (
                            <div
                                key={col}
                                className={[
                                    'cell',
                                    selectable ? 'selectable' : '',
                                    used ? 'used' : '',
                                ].join(' ').trim()}
                                onClick={() => onSelect(row, col)}
                            >
                                {value}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}