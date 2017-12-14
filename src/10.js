function createList(num) {
    const r = [];

    for (let i = 0; i <= num; ++i) {
        r[i] = i;
    }

    return r;
}

function solveStuff(lengths, itemsCnt) {
    let list = createList(itemsCnt);

    let ix = 0;
    let skipCnt = 0;

    let bla = 0;

    for (let rix = 0; rix < 64; rix++) {
        for (let lix = 0; lix < lengths.length; lix++) {
            let l = lengths[lix];
            // take some part of the list
            let startIx = ix;
            let endIx = ix + l;
            let rotationRequired = endIx > list.length;

            if (rotationRequired) {
                // rotate the list so we don't have to deal with concatenating stuff later
                let part1 = list.splice(0, startIx);
                list.splice(list.length, 0, ...part1);

                startIx = 0;
                endIx = l;
            }

            // reverse it
            if (l > 0) {
                let subarr = list.splice(startIx, l).reverse();
                list.splice(startIx, 0, ...subarr);
            }

            if (rotationRequired) {
                let part1 = list.splice(0, list.length - ix);
                list.splice(list.length, 0, ...part1);
            }

            ix += l + skipCnt;
            skipCnt++;

            while (ix >= list.length) ix -= list.length;
        }
    }

    // TODO: create dense hash
    const condensed = getDenseHash(list);

    return condensed;
}

function getDenseHash(input) {
    let ix = 0;

    let r = [...input];

    while (ix < 16) {
        let condensedNumber = r.splice(ix, 16).reduce((r, num) => r ^ num, 0);

        r.splice(ix, 0, condensedNumber);
        ix++;
    }

    return r
        .map(n => {
            let res = n.toString(16);
            if (res.length < 2) return "0" + res;
            return res;
        })
        .join("");
}

function stringToArrayOfAsciiCodes(str) {
    const r = [];

    for (let i = 0; i < str.length; i++) {
        r[i] = str.charCodeAt(i);
    }

    return r.concat([17, 31, 73, 47, 23]);
}

// solveStuff("3, 4, 1, 5".split(", ").map(i => parseInt(i, 10)), 4);
// solveStuff(stringToArrayOfAsciiCodes("1,2,3"), 255);
solveStuff(stringToArrayOfAsciiCodes("165,1,255,31,87,52,24,113,0,91,148,254,158,2,73,153"), 255);
// solveStuff(stringToArrayOfAsciiCodes(""), 255);


module.exports = function(input) {
    return solveStuff(stringToArrayOfAsciiCodes(input), 255);
};