//@flow
const { TEST, PROD } = require('./1.data');

function run() {
    console.time('magic');
    console.log(doMagic(sanitize(TEST)));
    // console.log(doMagic(sanitize(PROD)));
    console.timeEnd('magic');
}

function sanitize(aa) {
    return aa
        .trim().split('\n');
}

function doMagic(input) {
    input.
}

run();
