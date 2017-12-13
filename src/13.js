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

function guaranteedCollision(delayedSeconds) {
    // based on my data... should be more generic :)
    return delayedSeconds % 2 === 0;
}

function moveScanners(scannerLocations, scannerDirections, levelLimits, levels) {
    for (let i = 0, l = levels.length; i <= l; i++) {
        const level = levels[i];
        const loc = (scannerLocations[level] += scannerDirections[level]);
        if (loc >= levelLimits[level] || loc <= 1) {
            scannerDirections[level] *= -1;
        }
    }
}

function doMagic(input) {
    // it's a kind of maagiiiic
    const levelLimits = {};
    const scannerLocations = {};
    const scannerDirections = {};
    const scannerLevels = [];
    let maxLevel = 0;
    input.forEach(([level, range]) => {
        levelLimits[level] = range;
        scannerLevels.push(level);
        scannerLocations[level] = 1;
        scannerDirections[level] = 1;
        if (level > maxLevel) maxLevel = level;
    });

    // let delayedSeconds = 60443;
    let delayedSeconds = 0;
    let skipUntil = 0;
    let d;
    do {
        if (delayedSeconds >= skipUntil) {
            d = getsCaught(input, 0, levelLimits, scannerLocations, scannerDirections, scannerLevels, maxLevel);
        }
        if (d !== false) {
            console.log("not good at ", delayedSeconds, "caught at ", d);
            do {
                delayedSeconds++;
                moveScanners(scannerLocations, scannerDirections, levelLimits, scannerLevels);
            } while (guaranteedCollision(delayedSeconds));
        }
    } while (d !== false);

    console.log(delayedSeconds + 1);
}

function getsCaught(input, delayedSeconds, levelLimits, inscannerLocations, inscannerDirections, scannerLevels, maxLevel) {
    const scannerLocations = { ...inscannerLocations };
    const scannerDirections = { ...inscannerDirections };
    let damage = 0;
    let packetLoc = -1;
    let maxDamage = 0;

    let steps = 0;
    do {
        if (steps > delayedSeconds) {
            // move packet
            packetLoc++;
        }
        steps++;

        // check if caught
        if (scannerLocations[packetLoc] === 1) {
            return packetLoc;
        }

        // move scanners
        moveScanners(scannerLocations, scannerDirections, levelLimits, scannerLevels);
        // console.log(JSON.stringify(scannerLocations));
    } while (packetLoc < maxLevel);

    return false;
}

run();
