function getEncryptionKey(publicKeys: number[]) {
    const [doorPublicKey, cardPublicKey] = publicKeys;
    let value = 1;
    let subjectNumber = 7;
    let doorLoopSize = 0, cardLoopSize = 0;
    for (let i = 1; (!doorLoopSize || !cardLoopSize) && i < 150000000; i++) {
        value *= subjectNumber;
        value = value % 20201227;

        if (value === doorPublicKey) {
            doorLoopSize = i;
        }
        if (value === cardPublicKey) {
            cardLoopSize = i;
        }
    }

    // console.log(`cardLoopSize=${cardLoopSize}, doorLoopSize=${doorLoopSize}`);
    let cardEncryptionKey = 1;
    subjectNumber = doorPublicKey;
    for (let i = 0; i < cardLoopSize; i++) {
        cardEncryptionKey *= subjectNumber;
        cardEncryptionKey = cardEncryptionKey % 20201227;
    }

    let doorEncryptionKey = 1;
    subjectNumber = cardPublicKey;
    for (let i = 0; i < doorLoopSize; i++) {
        doorEncryptionKey *= subjectNumber;
        doorEncryptionKey = doorEncryptionKey % 20201227;
    }

    if (doorEncryptionKey !== cardEncryptionKey) {
        throw `${doorEncryptionKey} !== ${cardEncryptionKey}`
    }
    return doorEncryptionKey;
}

console.log(`5764801, 17807724 => ${getEncryptionKey([5764801, 17807724])}`)
console.log(`12092626, 4707356 => ${getEncryptionKey([12092626, 4707356])}`)