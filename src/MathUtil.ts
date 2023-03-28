export class MathUtil {
    static RandomRange(min: number, max: number): number {
        console.log(`RandomRange(${min}, ${max})`);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static Shuffle<T>(array: T[]): T[] {
        console.log(`Shuffle(${array})`);
        let clonedArray = [...array];
        let currentIndex = clonedArray.length, temporaryValue: T, randomIndex: number;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = clonedArray[currentIndex];
            clonedArray[currentIndex] = clonedArray[randomIndex];
            clonedArray[randomIndex] = temporaryValue;
        }

        return clonedArray;
    }
}