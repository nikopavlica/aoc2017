const data = require("./8.data.js");

function run() {
    // console.log(doMagic(sanitize(data.TEST)));
    console.log(doMagic(sanitize(data.PROD)));
}

function sanitize(aa) {
    return aa
        .trim()
        .split("\n")
        .filter(n => n)
        .map(s =>
            s
                .trim()
                .split(/\s+/)
                .map(s => s.trim())
        );
}

function isOK(registers, register, operator, value) {
    let regVal = registers[register];
    let val = parseInt(value, 10);
    switch (operator) {
        case ">":
            return regVal > val;
        case "<":
            return regVal < val;
        case "!=":
            return regVal != val;
        case "<=":
            return regVal <= val;
        case ">=":
            return regVal >= val;
        case "==":
            return regVal == val;
    }
    throw "unknown operator " + operator;
}

function doMagic(input) {
    const registers = {};

    let highestVal = Number.MIN_VALUE;

    input.forEach(command => {
        let [target, incdec, addition, , checkTarget, checkOperator, checkValue] = command;

        if (!registers[checkTarget]) registers[checkTarget] = 0;
        if (!registers[target]) registers[target] = 0;

        if (isOK(registers, checkTarget, checkOperator, checkValue)) {
            console.log("using", command);

            if (incdec === "inc") {
                registers[target] += parseInt(addition, 10);
            } else if (incdec === "dec") {
                registers[target] -= parseInt(addition, 10);
            } else {
                throw "unknown incdec " + incdec;
            }

            if (registers[target] > highestVal) highestVal = registers[target];
        } else {
            console.log("skipping", command);
        }
    });

    return highestVal;
    return max;
}

run();
