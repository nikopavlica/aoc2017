const TEST = `
..#
#..
...
`;


const PROD = require("./22.prod.js");

function run() {
    console.time('magic');
    // console.log(doMagic(sanitize(TEST)));
    console.log(doMagic(sanitize(PROD)));
    console.timeEnd('magic');
}


const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

const CLEAN = 0;
const WEAK = 1;
const FLAG = 2;
const INF = 3;

function sanitize(aa) {
    return aa
        .trim()
        .split('\n').reduce((doc, row, rix) => {
            const l = row.length;
            for (let i = 0; i < l; i++) {
                if (row[i] === '#') {
                    doc.infectedNodesMap[`${i}-${rix}`] = INF;
                }
            }

            if (rix > doc.maxIx) doc.maxIx = rix;

            return doc;
        }, {
            infectedNodesMap: {},
            maxIx: 0
        });
}


function doMagic({ infectedNodesMap, maxIx }) {

    let x = maxIx / 2;
    let y = x;
    let infectedNodesCnt = 0;
    let dir = UP;

    let iterations = 10000000;
    while (iterations--) {
        let k = `${x}-${y}`;
        let nodeStatus = infectedNodesMap[k] || CLEAN;

        if (nodeStatus === CLEAN) {
            if (--dir < 0) dir = 3;
        } else if (nodeStatus === INF) {
            if (++dir > 3) dir = 0;
        } else if (nodeStatus === FLAG) {
            dir += 2;
            if (dir > 3) dir -= 4;
        }

        if (nodeStatus === CLEAN) {
            infectedNodesMap[k] = WEAK;
        } else if (nodeStatus === INF) {
            infectedNodesMap[k] = FLAG;
        } else if (nodeStatus === FLAG) {
            infectedNodesMap[k] = CLEAN;
        } else if (nodeStatus === WEAK) {
            infectedNodesMap[k] = INF;
            infectedNodesCnt++;
        }

        switch (dir) {
            case UP: --y; break;
            case DOWN: ++y; break;
            case LEFT: --x; break;
            case RIGHT: ++x; break;
        }
    }

    // console.log(infectedNodesMap);

    return infectedNodesCnt
}


run();
