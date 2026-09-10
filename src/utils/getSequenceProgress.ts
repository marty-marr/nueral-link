export function getSequenceProgress(sequence: string[], bufferValues: string[]): number {
    const maxLen = Math.min(sequence.length, bufferValues.length);
    for (let len = maxLen; len > 0; len--) {
        const tail = bufferValues.slice(bufferValues.length - len);
        const prefix = sequence.slice(0, len);
        if (tail.every((val, i) => val === prefix[i])) {
            return len;
        }
    }
    return 0;
}