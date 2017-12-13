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
    const calculations = [];

    // sort the input so that definition with lowest range are at the beginning (so we fail fast)
    input.sort((a, b) => {
        return a[1] - b[1];
    });

    input.forEach(([level, range]) => {
        let modus = (2 * range - 2)
        calculations.push((seconds) => (seconds + level) % modus === 0)
    });
    
    let delayedSeconds = 0;
    const itsEvenPossibleToComplete = c => c(delayedSeconds);

    let d = Date.now();
    while (true) {
        if (!calculations.some(itsEvenPossibleToComplete)) {
            break;
        }
        delayedSeconds++;
    }

    console.log('delayed seconds:', delayedSeconds, 'ms required:', Date.now() - d);
}

run();
