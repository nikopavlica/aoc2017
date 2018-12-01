const TEST = `
../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`;


const PROD = require("./21.prod.js");

const STARTING = `
.#.
..#
###
`.trim().split('\n').map(row => row.split(''));

function run() {
    console.time('magic');
    // console.log(doMagic(sanitize(TEST)));
    console.log(doMagic(sanitize(PROD)));
    console.timeEnd('magic');
}

function sanitize(aa) {
    return aa
        .trim()
        .split('\n').map((pi, ix) => {
            const [i, o] = pi.split(' => ');
            return {
                input: i.split('/').map(row => row.split('')),
                output: o.split('/').map(row => row.split('')),
            }
        });
}

function doesMatch(input, pattern) {
    let l = input.length;
    if (pattern.length !== l) return false;

    let X = l - 1;
    let i = 0, j = 0;

    let match = true;
    outer: for (i = 0; i < l; i++) {
        for (j = 0; j < l; j++) {
            if (input[i][j] !== pattern[i][j]) {
                match = false;
                break outer;
            }
        }
    }

    if (!match) {
        match = true;
        outer: for (i = 0; i < l; i++) {
            for (j = 0; j < l; j++) {
                if (input[i][j] !== pattern[i][X - j]) {
                    match = false;
                    break outer;
                }
            }
        }
    }

    if (!match) {
        match = true;
        outer: for (i = 0; i < l; i++) {
            for (j = 0; j < l; j++) {
                if (input[i][j] !== pattern[X - i][j]) {
                    match = false;
                    break outer;
                }
            }
        }
    }

    if (!match) {
        match = true;
        outer: for (i = 0; i < l; i++) {
            for (j = 0; j < l; j++) {
                if (input[i][j] !== pattern[X - i][X - j]) {
                    match = false;
                    break outer;
                }
            }
        }
    }

    if (!match) {
        match = true;
        outer: for (i = 0; i < l; i++) {
            for (j = 0; j < l; j++) {
                if (input[i][j] !== pattern[j][i]) {
                    match = false;
                    break outer;
                }
            }
        }
    }

    if (!match) {
        match = true;
        outer: for (i = 0; i < l; i++) {
            for (j = 0; j < l; j++) {
                if (input[i][j] !== pattern[j][X - i]) {
                    match = false;
                    break outer;
                }
            }
        }
    }

    if (!match) {
        match = true;
        outer: for (i = 0; i < l; i++) {
            for (j = 0; j < l; j++) {
                if (input[i][j] !== pattern[X - j][i]) {
                    match = false;
                    break outer;
                }
            }
        }
    }

    if (!match) {
        match = true;
        outer: for (i = 0; i < l; i++) {
            for (j = 0; j < l; j++) {
                if (input[i][j] !== pattern[X - j][X - i]) {
                    match = false;
                    break outer;
                }
            }
        }
    }

    // if (!match) {
    //     printtable(pattern);
    // }
    return match;
}

function extract(table, startI, startJ, size) {
    const r = [];
    for (let i = 0; i < size; i++) {
        r.push(table[startI + i].slice(startJ, startJ + size));
    }
    return r;
}

function createMiniTables(table) {
    let size;
    if (table.length % 2 === 0) {
        size = 2;
    } else if (table.length % 3 === 0) {
        size = 3;
    }

    const parts = table.length / size;

    const output = [];
    for (let i = 0; i < parts; i++) {
        for (let j = 0; j < parts; j++) {
            if (!output[i]) output[i] = [];
            output[i][j] = extract(table, i * size, j * size, size);
        }
    }
    return output;
}

function replaceTable(input, patterns) {
    const pl = patterns.length;

    for (let k = 0; k < pl; k++) {
        if (doesMatch(input, patterns[k].input)) {
            return patterns[k].output;
        }
    }
    printtable(input);
    throw 'nothing matches';
}

function replacetables(tables, patterns) {
    const l = tables.length;
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l; j++) {
            tables[i][j] = replaceTable(tables[i][j], patterns);
        }
    }
}

function createMastertable(tables) {
    const result = [];


    const parts = tables.length;
    const innerLen = tables[0][0].length;
    for (let i = 0; i < parts; i++) {
        for (let j = 0; j < parts; j++) {
            let t = tables[i][j];
            let startI = i * innerLen;
            for (let k = 0; k < innerLen; k++) {
                if (!result[startI + k]) {
                    result[startI + k] = [...t[k]];
                } else {
                    result[startI + k].splice(result[startI + k].length, 0, ...t[k])
                }
            }
        }
    }

    return result;
}

function printtable(t) {
    t.forEach(r => console.log(r.join('')))
    console.log('-')
}

function howManyOn(t) {
    return t.reduce((r, t1) => t1.reduce((r2, t2) => r2 + (t2 === '#' ? 1 : 0), r), 0);
}

function doMagic(rules) {

    const iterations = 18;

    let mastertable = STARTING;

    for (let i = 0; i < iterations; i++) {
        let temptables = createMiniTables(mastertable);
        // create new mini tables

        replacetables(temptables, rules);

        // replace mini tables with big ones
        mastertable = createMastertable(temptables);
        // printtable(mastertable);
    }

    return howManyOn(mastertable);
}


run();
