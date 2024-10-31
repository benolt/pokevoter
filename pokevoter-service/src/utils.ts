// Returns a random number between min (inclusive) and max (inclusive).
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Returns an array of distinct random numbers between min (inclusive) and max (inclusive).
export function getDistinctRandomNumbers(
    min: number,
    max: number,
    count: number
): number[] {
    const numbers = new Set<number>()
    while (numbers.size < count) {
        numbers.add(getRandomInt(min, max))
    }
    return Array.from(numbers)
}
