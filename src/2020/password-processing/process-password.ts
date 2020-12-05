type Password = {[key:string]: string};

export function calculateValidPasswordsSimple(input: string): number {
    const passwords = parsePasswords(input);
    return passwords.filter(isPasswordValidSimple).length;
}

function isPasswordValidSimple(password: Password) {
    return password["byr"] && password["iyr"] && password["eyr"] && password["hgt"] && password["hcl"] && password["ecl"] && password["pid"];
}

export function calculateValidPasswordsComplex(input: string): number {
    const passwords = parsePasswords(input);
    return passwords.filter(isPasswordValidComplex).length;
}

function isPasswordValidComplex(password: Password) {
    return isByrValid(password) &&
    isIyrValid(password) &&
    isEyrValid(password) &&
    isHgtValid(password) &&
    isHclValid(password) &&
    isEclValid(password) &&
    isPidValid(password);
}

function isByrValid(password: Password): boolean {
    if (!password["byr"]) {
        return false;
    }
    const byr = +password["byr"];
    return (byr !== NaN && byr >=1920 && byr <= 2002);
}

function isIyrValid(password: Password): boolean {
    if (!password["iyr"]) {
        return false;
    }
    const iyr = +password["iyr"];
    return (iyr !== NaN && iyr >=2010 && iyr <= 2020);
}

function isEyrValid(password: Password): boolean {
    if (!password["eyr"]) {
        return false;
    }
    const eyr = +password["eyr"];
    return (eyr !== NaN && eyr >=2020 && eyr <= 2030);
}

function isHgtValid(password: Password): boolean {
    if (!password["hgt"]) {
        return false;
    }
    const hgt = password["hgt"];
    const measure = hgt.slice(-2);
    const num = +hgt.slice(0, hgt.length - 2);
    if (measure === "cm") {
        return num !== NaN && num >= 150 && num <= 193;
    } else if (measure === "in") {
        return num !== NaN && num >= 59 && num <= 76;
    }
    return false;
}

function isHclValid(password: Password): boolean {
    if (!password["hcl"]) {
        return false;
    }
    const hcl = password["hcl"];
    return /^#[0-9a-f]{6}$/.test(hcl);
}

function isEclValid(password: Password): boolean {
    if (!password["ecl"]) {
        return false;
    }
    const ecl = password["ecl"];
    return (ecl === "amb" ||ecl === "blu" ||ecl === "brn" ||ecl === "gry" ||ecl === "grn" ||ecl === "hzl" ||ecl === "oth");
}

function isPidValid(password: Password): boolean {
    if (!password["pid"]) {
        return false;
    }
    const pid = password["pid"];
    return /^\d\d\d\d\d\d\d\d\d$/.test(pid);
}

function parsePasswords(input: string): Password[] {
    const lines = input.split("\n\n");
    return lines.map(parsePassword);
}

function parsePassword(str: string): Password {
    const result:Password = {};
    const fields = str.split(/[\n ]/);
    fields.forEach(f => {
        const [k, v] = f.split(':');
        result[k] = v;
    })
    return result;
}
