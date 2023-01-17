export function* IdGenerator(): Generator<number> {
    const INT_MAX_VALUE = 9_007_199_254_740_991;
    for (let currentId = 0; currentId < INT_MAX_VALUE; currentId++) {
        yield currentId;
    }
    return INT_MAX_VALUE;
}

export function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateArray<T>(length: number, initializer: (index: number) => T) {
    return Array.from(Array(length), initializer);
}
