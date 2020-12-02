export function findValuesWithTheSumOf2020(allValues: Set<number>): [number, number] {
    for (let value of allValues) {
        if (allValues.has(2020-value)) {
            return [value, 2020-value];
        }
    }
    return [0,0];
}

export function findThreeValuesWithTheSumOf2020(allValues: Set<number>): [number, number, number] {
    for (let value1 of allValues) {
        for (let value2 of allValues) {
            if (allValues.has(2020-value1-value2)) {
                return [value1, value2, 2020-value1-value2];
            }
        }
    }
    return [0,0,0];
}