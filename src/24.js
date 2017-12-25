const TEST = `
0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10
`;


const PROD = require("./24.prod.js");

function run() {
    console.time('magic');
    // console.log(doMagic(sanitize(TEST)));
    console.log(doMagic(sanitize(PROD)));
    console.timeEnd('magic');
}

function sanitize(aa) {
    return aa
        .trim()
        .split('\n')
        .map((r, ix) => {
            let [a, b] = r.split('/').map(s => parseInt(s, 10));
            return { a, b, ix };
        });
}

function printBridge(p) {
    console.log(p.map(b => `${b.a}/${b.b}`).join('-'));
}

function doMagic(input) {

    let longestBridgeLenght = 0;
    let heaviestBridge;
    let heaviestBridgeWeight = 0;

    function tryBuildABridge(src, weight, freePortInLastCmp, remainingParts) {
        // printBridge(src);
        const lastCmp = src[src.length - 1];
        const pinsInFreePort = lastCmp[freePortInLastCmp];
        remainingParts.forEach(cmp => {
            if (cmp.a === pinsInFreePort || cmp.b === pinsInFreePort) {
                let newWeight = weight + cmp.a + cmp.b;
                let newBridge = [...src, cmp]
                if (newBridge.length >= longestBridgeLenght) {
                    if (newWeight > heaviestBridgeWeight) {
                        heaviestBridge = newBridge;
                        heaviestBridgeWeight = newWeight;
                    }
                    longestBridgeLenght = newBridge.length;
                }
                tryBuildABridge(newBridge, newWeight, cmp.a === pinsInFreePort ? 'b' : 'a', remainingParts.filter(c => c.ix !== cmp.ix))
            }
        })
    }


    input.forEach(cmp => {
        if (cmp.a === 0 || cmp.b === 0) {
            tryBuildABridge([cmp], cmp.a + cmp.b, cmp.a === 0 ? 'b' : 'a', input.filter(c => c.ix !== cmp.ix));
        }
    })

    printBridge(heaviestBridge);

    return heaviestBridgeWeight;
}


run();
