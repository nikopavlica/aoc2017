const TEST = `
0: 3
1: 2
4: 4
6: 4
`;

const PROD = require("./13.prod.js");

function run() {
    // console.log(doMagic(sanitize(TEST)));
    console.log(doMagic(sanitize(PROD)));
    // console.log(sanitize(PROD).map(directions => doMagic(directions)));
}

function sanitize(aa) {
    return aa
        .trim()
        .split("\n")
        .map(s =>
            s
                .trim()
                .split(": ")
                .map(i => parseInt(i, 10))
        );
}

function doMagic(input) {
    // it's a kind of maagiiiic
    const scannerLevels = [];
    input.forEach(([level, range]) => {
        scannerLevels[level] = range;
    });

    let delayedSeconds = 0;
    while (true) {
        if (!getsCaught(scannerLevels, delayedSeconds)) {
            break;
        }
        delayedSeconds++;
    }

    console.log(delayedSeconds);
}

function getsCaught(scannerLevels, delayedSeconds) {
    return scannerLevels.some((limit, packetLoc) => limit && (packetLoc + delayedSeconds) % (2 * limit - 2) === 0);
}

run();
