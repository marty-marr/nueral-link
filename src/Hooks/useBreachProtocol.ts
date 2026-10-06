import {useCallback, useEffect, useState} from "react";
import type {Cell, Hack} from "../types/breach.ts";
import {useCountDown} from "./useCountDown.ts";

const BUFFER_SIZE = 10;
const TIME_LIMIT = 40;

export function useBreachProtocol(grid: string[][], hacks: Hack[]) {
    const [buffer, setBuffer] = useState<Cell[]>([]);
    const [selectionMode, setSelectionMode] = useState<'row' | 'col'>('row');
    const [lockedIndex, setLockedIndex] = useState<number>(0);
    const [usedCells, setUsedCells] = useState<Set<string>>(new Set());
    const [completedHacks, setCompletedHacks] = useState<Set<string>>(new Set());
    const [failed, setFailed] = useState(false);

    const lastCell = buffer[buffer.length - 1] ?? null;
    const {timeLeft, start: startTimer, stop: stopTimer, reset: resetTimer} = useCountDown(TIME_LIMIT);
    const timeUp = timeLeft === 0;
    const bufferFull = buffer.length >= BUFFER_SIZE;
    const allComplete = hacks.length > 0 && completedHacks.size === hacks.length;

    useEffect(() => {
        if(bufferFull || allComplete || timeUp) stopTimer();
    }, [bufferFull, timeUp, allComplete, stopTimer]);

    // Automatically fail when time runs out
    useEffect(() => {
        if (timeUp && !allComplete) {
            setFailed(true);
        }
    }, [timeUp, allComplete]);

    const isSelectable = useCallback(
        (row: number, col: number) => {
            const key = `${row}-${col}`;
            if (usedCells.has(key)) return false;
            if (buffer.length >= BUFFER_SIZE) return false;
            if (buffer.length === 0) return row === 0;
            if (timeUp) return false;

            if (selectionMode === 'col') return col === lockedIndex;

                return row === lockedIndex;

        },
        [usedCells, buffer, selectionMode, lockedIndex, lastCell]
    );

    const checkSequences = useCallback(
        (currentBuffer: string[]) => {
            hacks.forEach((hack) => {
                setCompletedHacks((prevCompleted) => {
                    if (prevCompleted.has(hack.name)) return prevCompleted;
                    const { sequence } = hack;
                    for (let start = 0; start <= currentBuffer.length - sequence.length; start++) {
                        const slice = currentBuffer.slice(start, start + sequence.length);
                        if (slice.every((val, i) => val === sequence[i])) {
                            return new Set(prevCompleted).add(hack.name);
                        }
                    }
                    return prevCompleted;
                });
            });
        },
        [hacks]
    );

    const selectCell = useCallback(
        (row: number, col: number) => {
            if (!isSelectable(row, col)) return;
            if(buffer.length === 0) startTimer();
            const value = grid[row][col];
            const newBuffer = [...buffer, { row, col, value }];
            setBuffer(newBuffer);
            setUsedCells((prev) => new Set(prev).add(`${row}-${col}`));
            if (selectionMode === 'row') {
                setSelectionMode('col');
                setLockedIndex(col);
            } else {
                setSelectionMode('row');
                setLockedIndex(row);
            }
            checkSequences(newBuffer.map((c) => c.value));
        },
        [buffer, grid, isSelectable, selectionMode, checkSequences]
    );

    const fail = useCallback(() => {
        setFailed(true);
        stopTimer();
        }, [stopTimer]
    )

    const reset = useCallback(() => {
        setBuffer([]);
        setSelectionMode('row');
        setLockedIndex(0);
        setUsedCells(new Set());
        setCompletedHacks(new Set());
        setFailed(false);
        resetTimer();
    }, [resetTimer]);

    return {
        buffer,
        isSelectable,
        isUsed: (row: number, col: number) => usedCells.has(`${row}-${col}`),
        completedHacks,
        selectCell,
        reset,
        fail,

        bufferFull: buffer.length >= BUFFER_SIZE,
        timeLeft,
        timeUp,

        allComplete,
        failed
    };
}