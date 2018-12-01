const data = require("./9.data.js");

function run() {
    // console.log(doMagic(sanitize(data.TEST)));
    console.log(doMagic(sanitize(data.PROD)));
}

function sanitize(aa) {
    return aa
        .trim()
        .split("\n")
        .map(s => s.trim())
        .filter(n => n);
}

function doMagic(input) {
    input.forEach(i => {
        countGroups(i);
    });
}

function countGroups(stream) {
    const tokens = stream;

    let groups = 0;
    let currentScore = 0;
    let totalScore = 0;

    let i = 0;
    let l = tokens.length;

    let withinGarbage = false;
    let garbageCount = 0;

    for (; i < l; i++) {
        let c = tokens[i];

        if (c === "!") {
            // skip next one
            i++;
        } else if (withinGarbage) {
            if (c === ">") {
                withinGarbage = false;
            } else {
                garbageCount++;
            }
        } else if (c === "{") {
            groups++;
            currentScore++;
            totalScore += currentScore;
        } else if (c === "}") {
            currentScore--;
        } else if (c === "<") {
            withinGarbage = true;
        }
    }

    console.log(groups, totalScore, garbageCount);
}

run();
