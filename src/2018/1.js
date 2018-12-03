//@flow
const { TEST, PROD } = require('./1.data');

function run() {
    console.time('magic');
    // console.log(doMagic(sanitize(TEST)));
    console.log(doMagic(sanitize(PROD)));
    console.timeEnd('magic');
}

function sanitize(aa) {
    return aa
        .trim().split('\n').map(p => parseInt(p, 10));
}

// function doMagic(input) {
//     return input.reduce((r, i) => r + i, 0);
// }

function doMagic(input) {
    let r = 0;
    let freqHash = {};
    while (true) {
        for (var i = 0, l = input.length; i < l; i++) {
            if (freqHash[r]) {
                return r;
            }
            freqHash[r] = true;
            r += input[i];
            // console.log(r);
        }
    }
}

run();
