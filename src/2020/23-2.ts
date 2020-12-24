type Cup = {
    value: number;
    // prev: Cup;
    next: Cup;
};

type NodeIndex = {[key: number]: Cup};

function step(nodes: NodeIndex, currentCupNumber: number, totalLength: number): number {
    const currentCup = nodes[currentCupNumber];
    const removed = currentCup.next;
    currentCup.next = currentCup.next.next.next.next;

    let possibleDestinations = [
        currentCupNumber - 1 <= 0 ? totalLength + currentCupNumber - 1 : currentCupNumber - 1,
        currentCupNumber - 2 <= 0 ? totalLength + currentCupNumber - 2 : currentCupNumber - 2,
        currentCupNumber - 3 <= 0 ? totalLength + currentCupNumber - 3 : currentCupNumber - 3,
        currentCupNumber - 4 <= 0 ? totalLength + currentCupNumber - 4 : currentCupNumber - 4,
    ];

    const removedValues = [removed.value, removed.next.value, removed.next.next.value];

    const destination = possibleDestinations.filter(d => //removedValues.indexOf(d) !== -1)[0];
        removed.value !== d &&
        removed.next.value !== d &&
        removed.next.next.value !== d)[0];

    const destinationNode = nodes[destination];
    const temp = destinationNode.next;

    destinationNode.next = removed;
    removed.next.next.next = temp;

    return nodes[currentCupNumber].next.value;
}

function buildInput(strInput: string, length: number): NodeIndex {
    const numbers = strInput.split('').map(v => +v);
    const nodeIndex: NodeIndex = {};
    let lastCup: Cup = {
        value: numbers[0],
        next: null
    }
    nodeIndex[lastCup.value] = lastCup;

    for (let i = 1; i < length; i++) {
        let newValue;
        if (i < numbers.length) {
            newValue = numbers[i]
        } else {
            newValue = i + 1;
        }

        const newCup: Cup = {
            value: newValue,
            next: null
        }

        nodeIndex[newCup.value] = newCup;
        lastCup.next = newCup;
        lastCup = newCup;
    }

    lastCup.next = nodeIndex[numbers[0]];
    return nodeIndex;
}

const totalLength = 1000000;
const nodeIndex = buildInput("326519478", totalLength);

let currentValue = 3;

for (let i = 0; i < 100000000; i++) {
    if (i % 10000 === 0) {
        console.log(i);
    }
    // console.log(`before step ${i+1}: `);
    // print(nodeIndex, totalLength);
    currentValue = step(nodeIndex, currentValue, totalLength);
}
// print(nodeIndex, 2);

function print(_nodeIndex: NodeIndex, length: number) {
    let cup = _nodeIndex[1];
    const arr: number[] = [];
    for (let i = 0; i <= length; i++) {
        arr.push(cup.value);
        cup = cup.next;
    }
    console.log(arr);
}