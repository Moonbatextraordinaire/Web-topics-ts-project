import { getFxrand } from "./LinkHashing";

export function rand(max: number = 1, min: number = 0): number {
    if (min > max) {
        let temp = min;
        min = max;
        max = temp;
    }
    return fxrand() * (max - min) + min;
}
