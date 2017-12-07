const TEST = sanitize(`

0   2   7   0

`);

const PROD = sanitize(`
4	10	4	1	8	4	9	14	5	1	14	15	0	15	3	5

`);

function sanitize(aa) {
    return aa
        .trim()
        .split(/\s+/)
        .map(i => parseInt(i, 10));
}

function getKey(a) {
    return a.join("-");
}

function findMaxIx(a) {
    let max = a[0];
    let maxIx = 0;
    const l = a.length;

    for (let i = 1; i < l; ++i) {
        if (a[i] > max) {
            maxIx = i;
            max = a[i];
        }
    }

    return maxIx;
}

function distribute(arr, loc, value) {
    let ix = loc;
    const l = arr.length;
    while (value > 0) {
        if (ix >= l) ix -= l;
        ++arr[ix];
        --value;
        ix++;
    }
}

function RUN(input) {
    const variationscache = {};
    let key = getKey(input);
    let step = 0;
    for (key = getKey(input); !variationscache[key]; key = getKey(input)) {
        variationscache[key] = step;
        step++;

        const maxIx = findMaxIx(input);
        const value = input[maxIx];

        input[maxIx] = 0;
        distribute(input, maxIx + 1, value);
    }
    console.log(key);

    return step - variationscache[key];
}

const t = Date.now();
// const result = RUN(TEST);
const result = RUN(PROD);
console.log(Date.now() - t);
console.log(result);
