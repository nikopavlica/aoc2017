const TEST = `
flqrgnkx
`;

const PROD = `
stpzcrnm
`

const knotHash = require('./10');

function run() {
    // console.log(doMagic(sanitize(TEST)));
    console.log(doMagic(sanitize(PROD)));
    // console.log(sanitize(PROD).map(directions => doMagic(directions)));
}

function sanitize(aa) {
    return aa
        .trim();
}

function hexToBin(hex) {
    let r = '';
    for (let i = 0; i < hex.length -1; i+=2) {
        r += ("00000000" + (parseInt(hex.slice(i, i+2), 16)).toString(2)).substr(-8);
    }
    return r;
}

function doMagic(input) {
    let freeSpace = 0;
    let usedSpace = 0;
    let mainmap = [];
    let l = 128
    for(let i = 0; i < l; i++) {
        let map = hexToBin(knotHash(input + '-' + i));
        mainmap.push(map.split('').map(x => x === '1' ? '#' : ''));
    }


    let currentRegionMarker = 1;

    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l; j++) {
            if (tryColorTheRegion(mainmap, i, j, currentRegionMarker)) {
                ++currentRegionMarker;
            }
        }
    }
    
    return currentRegionMarker;
}

function tryColorTheRegion(map, i, j, marker) {
    if (map[i] && map[i][j] === '#') {
        map[i][j] = marker;
        
        tryColorTheRegion(map, i, j+1, marker);
        tryColorTheRegion(map, i, j-1, marker);
        tryColorTheRegion(map, i+1, j, marker);
        tryColorTheRegion(map, i-1, j, marker);
        return true;
    }
    
}

run();
