export function calculateSumOfUniqueAnswersPerGroup(input: string): number {
    const groups = input.split('\n\n');
    return groups.map(numberOfUniqueAnswersPerGroup).reduce<number>((a,b) => a+b, 0);
}

function numberOfUniqueAnswersPerGroup(group: string): number {
    const singleLineArray = group.replace(/\n/g, '').split('');
    const set = new Set(singleLineArray);
    const result = set.size;
    return result;
}

export function calculateSumOfCommonAnswersPerGroup(input: string): number {
    const groups = input.split('\n\n');
    return groups.map(numberOfCommonAnswersPerGroup).reduce<number>((a,b) => a+b, 0);
}

function numberOfCommonAnswersPerGroup(group: string): number {
    const lines = group.split('\n');
    const uniqueAnswers = new Set(lines[0].split(''));
    for(let i = 1; i < lines.length; i++) {
        const lineSet = new Set(lines[i].split(''));
        for (let c of uniqueAnswers.keys()) {
            if (!lineSet.has(c)) {
                uniqueAnswers.delete(c);
            }
        }
    }
    return uniqueAnswers.size;
}