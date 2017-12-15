const TEST = `
65 8921
`;

const PROD = `
289 629
`

function run() {
    // console.log(doMagic(sanitize(TEST)));
    console.log(doMagic(sanitize(PROD)));
    // console.log(sanitize(PROD).map(directions => doMagic(directions)));
}

function sanitize(aa) {
    return aa
        .trim().split(' ').map(i => parseInt(i, 10));
}


function doMagic(input) {
    const factorA = 16807;
    const factorB = 48271;
    const mask = parseInt("1111111111111111", 2);

    function nextAVal(v) {
        do {
            v = v * factorA % 2147483647 
        } while (v % 4 !== 0);
        return v;
    }

    function nextBVal(v) {
        do {
            v = v * factorB % 2147483647;
        } while (v % 8 !== 0);
        return v;
    }

    function tolast16Bits(n) {
        return n & mask;
    }

    let [a, b] = input;
    let astr, bstr, count = 0;
    let limit = 5000000
    console.time('start');
    for (let i = 0; i < limit; i++) {
        a = nextAVal(a);
        b = nextBVal(b);

        astr = tolast16Bits(a);
        bstr = tolast16Bits(b);

        if (astr === bstr) {
            // console.log('fount at ', i);
            count++;
        }
        // console.log(a, b);
        // console.log(tolast16Bits(a), tolast16Bits(b));
    }
    console.timeEnd('start');
    

    return count;
}


run();
