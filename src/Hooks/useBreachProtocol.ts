import { useCallback, useEffect, useState } from "react";
import type { Cell, Hack } from "../types/breach.ts";
import { useCountDown } from "./useCountDown.ts";

const BUFFER_SIZE = 10;
const TIME_LIMIT = 40;

export function useBreachProtocol(grid: string[][], hacks: Hack[]) {
    const [buffer, setBuffer] = useState<Cell[]>([]);
    const [selectionMode, setSelectionMode] = useState<"row" | "col">("row");
    const [lockedIndex, setLockedIndex] = useState<number>(0);
    const [usedCells, setUsedCells] = useState<Set<string>>(new Set());
    const [completedHacks, setCompletedHacks] = useState<Set<string>>(new Set());
    const [failed, setFailed] = useState(false);

    const {
        timeLeft,
        start: startTimer,
        stop: stopTimer,
        reset: resetTimer,
    } = useCountDown(TIME_LIMIT);

    const timeUp = timeLeft === 0;
    const bufferFull = buffer.length >= BUFFER_SIZE;
    const allComplete =
        hacks.length > 0 && completedHacks.size === hacks.length;

    // Stop the timer when the game ends or the buffer fills.
    useEffect(() => {
        if (bufferFull || allComplete || timeUp || failed) {
            stopTimer();
        }
    }, [bufferFull, allComplete, timeUp, failed, stopTimer]);

    // Fail when time runs out before all hacks are completed.
    useEffect(() => {
        if (timeUp && !allComplete) {
            setFailed(true);
        }
    }, [timeUp, allComplete]);

    // Determine whether a cell can be selected.
    const isSelectable = useCallback(
        (row: number, col: number) => {
            const key = `${row}-${col}`;

            if (failed || allComplete || timeUp) return false;
            if (usedCells.has(key)) return false;
            if (buffer.length >= BUFFER_SIZE) return false;

            // The first selection must come from the top row.
            if (buffer.length === 0) {
                return row === 0;
            }

            // Alternate between selecting by column and by row.
            if (selectionMode === "col") {
                return col === lockedIndex;
            }

            return row === lockedIndex;
        },
        [
            failed,
            allComplete,
            timeUp,
            usedCells,
            buffer.length,
            selectionMode,
            lockedIndex,
        ]
    );

    // Find hacks whose sequences appear in the current buffer.
    const checkSequences = useCallback(
        (currentBuffer: string[]) => {
            const newlyCompleted = new Set<string>();

            for (const hack of hacks) {
                if (completedHacks.has(hack.name)) continue;

                const sequence = hack.sequence;

                for (
                    let start = 0;
                    start <= currentBuffer.length - sequence.length;
                    start++
                ) {
                    const slice = currentBuffer.slice(
                        start,
                        start + sequence.length
                    );

                    if (slice.every((value, i) => value === sequence[i])) {
                        newlyCompleted.add(hack.name);
                        break;
                    }
                }
            }

            if (newlyCompleted.size > 0) {
                setCompletedHacks((previous) => {
                    const updated = new Set(previous);

                    newlyCompleted.forEach((name) => updated.add(name));

                    return updated;
                });
            }

            return newlyCompleted;
        },
        [hacks, completedHacks]
    );

    // Select a cell, update the buffer, and check win/failure conditions.
    const selectCell = useCallback(
        (row: number, col: number) => {
            if (!isSelectable(row, col)) return;

            if (buffer.length === 0) {
                startTimer();
            }

            const value = grid[row][col];
            const newBuffer = [...buffer, { row, col, value }];

            setBuffer(newBuffer);
            setUsedCells((previous) => {
                const updated = new Set(previous);
                updated.add(`${row}-${col}`);
                return updated;
            });

            // Alternate selection direction.
            if (selectionMode === "row") {
                setSelectionMode("col");
                setLockedIndex(col);
            } else {
                setSelectionMode("row");
                setLockedIndex(row);
            }

            const newlyCompleted = checkSequences(
                newBuffer.map((cell) => cell.value)
            );

            const totalCompleted = new Set([
                ...completedHacks,
                ...newlyCompleted,
            ]);

            const nextBufferFull = newBuffer.length >= BUFFER_SIZE;
            const nextAllComplete =
                hacks.length > 0 && totalCompleted.size === hacks.length;

            // The buffer is exhausted before every hack is completed.
            if (nextBufferFull && !nextAllComplete) {
                setFailed(true);
                stopTimer();
            }

            // Stop the timer if every hack is now completed.
            if (nextAllComplete) {
                stopTimer();
            }
        },
        [
            isSelectable,
            buffer,
            grid,
            startTimer,
            selectionMode,
            checkSequences,
            completedHacks,
            hacks,
            stopTimer,
        ]
    );

    // Manually trigger failure if needed.
    const fail = useCallback(() => {
        setFailed(true);
        stopTimer();
    }, [stopTimer]);

    // Reset the game state.
    const reset = useCallback(() => {
        setBuffer([]);
        setSelectionMode("row");
        setLockedIndex(0);
        setUsedCells(new Set());
        setCompletedHacks(new Set());
        setFailed(false);
        resetTimer();
    }, [resetTimer]);

    return {
        buffer,
        isSelectable,
        isUsed: (row: number, col: number) =>
            usedCells.has(`${row}-${col}`),
        completedHacks,
        selectCell,
        reset,
        fail,
        bufferFull,
        timeLeft,
        timeUp,
        allComplete,
        failed,
    };
}