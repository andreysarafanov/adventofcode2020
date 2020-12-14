const input = `7,13,x,x,59,x,31,19`;

function part2(input: string): {value: number, offset: number}[] {
    let arr = input.split(',')
        .map((v, i) => ({value: v === "x" ? -1 :+v, offset: i}))
        .filter(v => v.value !== -1)
        .map(v => ({value: v.value, offset: v.offset % v.value}))
        .sort((a,b) => a.offset - b.offset);

    console.log(arr);
    return arr;
}
part2(input);

// [ { value: 7, offset: 0 },
//     { value: 13, offset: 1 },
//     { value: 59, offset: 4 },
//     { value: 31, offset: 6 },
//     { value: 19, offset: 7 } ]

for (let k = 0; k < 7; k++) {
    let x = k;
    if (x % 7 === 0) {
        console.log(k, x);
        break;
    }
}
// 0 0 - 0 это первая минута, на которой автобус 7 в правильном положении
//дальше рассматриваем только циклы, в которых автобус 7 на строках вида 0+7*k, т.е. цикл стал не по 7 минут, а по 13*7 минут

//================================================
for (let k = 0; k < 13; k++) {
    let x = 0 + (7*k) + 1;
    if (x % 13 === 0) {
        console.log(k, x);
        break;
    }
}

//11 78 - 78 это первая минута, на которой автобус 13 в правильном положении, а автобус 7 был минуту назад
//автобус 7 приехал в минуту 77
//дальше рассматриваем только циклы, в которых автобус 7 на строках вида 77+13*7*k, т.е. цикл стал не по 7 минут, а по 13*7 минут
// 77+13*7*k = 7*(11+13*k)

// Проверка формулы 77+13*7*k
for (let i = 0; i < 100000; i++) {
    let x = 77+13*7*i;
    if((x+1) % 13 !== 0) {
        throw i;
    } 
}

//================================================
// ищем цикл для следующего прибывшего автобуса
for (let k = 0; k < 59; k++) {
    let x = 77+13*7*k + 4;
    if (x % 59 === 0) {
        console.log(k, x);
        break;
    }
}

// 3 354 - 354 это первая строка, на которой автобус 59 в правильном положении, автобус 7 был 4 минуты назад, а автобус 13 был 3 минуты назад 
// автобус 7 приехал в минуту 350, а автобус 13 - в минуту 351
// дальше рассматриваем только циклы, в которых автобус 7 на строках вида 354+7*13*59*k, т.е. цикл стал не по 7*13 минут, а по 7*13*59 минут
// 7*(11+13*(3+59*k)) = 77+91*(3+59*k) == 77+273+91*59*k = 350 + 7*13*59*k

// проверка, что 350 первое такое число
for (let i = 0; i < 1000; i++) {
    if ((i+4) % 59 === 0 && i % 7 === 0 && (i+1) % 13 === 0) {
        if (i !== 350) {
            throw i;
        }
        break;
    }
}

// Проверка формулы 350 + 7*13*59*k
for (let i = 0; i < 100000; i++) {
    let x = 350 + 7*13*59*i;
    if(x % 7 !== 0) {
        throw i;
    } 
    if((x+1) % 13 !== 0) {
        throw i;
    } 
    if((x+4) % 59 !== 0) {
        throw i;
    } 
}

//================================================
for (let k = 0; k < 31; k++) {
    let x = 350 + 7*13*59*k + 6;
    if (x % 31 === 0) {
        console.log(k, x);
        break;
    }
}

// 13 70153 - 70153 это первая строка, на которой автобус 31 в правильном положении, автобус 59 был 2 минуты назад, автобус 13 был 5 минут назад,
// а автобус 7 был 6 минут назад
// автобус 7 приехал в минуту 70147
// 70147 + 7*13*59*31*k

// проверка, что 70147 первое такое число
for (let i = 0; i < 100000; i++) {
    if ((i+6) % 31 === 0 && (i+4) % 59 === 0 && i % 7 === 0 && (i+1) % 13 === 0) {
        if (i !== 70147) {
            throw i;
        }
        break;
    }
}

// Проверка формулы 70147 + 7*13*59*31*k
for (let i = 0; i < 100000; i++) {
    let x = 70147 + 7*13*59*31*i;
    if(x % 7 !== 0) {
        throw i;
    } 
    if((x+1) % 13 !== 0) {
        throw i;
    } 
    if((x+4) % 59 !== 0) {
        throw i;
    }
    if((x+6) % 31 !== 0) {
        throw i;
    } 
}
//================================================
for (let k = 0; k < 19; k++) {
    let x = 70147 + 7*13*59*31*k + 7;
    if (x % 19 === 0) {
        console.log(k, x);
        break;
    }
}
// 6 1068788
// автобус 7 прибыл в 1068781, а это и ответ!!