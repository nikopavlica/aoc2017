function run() {
    // console.log(doMagic(3, 10));
    console.time('magic');
    console.log(doMagic(394, 50000000));
    console.timeEnd('magic');
    
}

function doMagic(stepsPerCycle, targetValue) {
    let currentValue = 1;
    let valueAtOne = 0;
    let bufferLen = 1;
    let currentIx = 0;

    for (; currentValue <= targetValue; currentValue++) {
        currentIx = ((currentIx + stepsPerCycle) % currentValue) + 1;
        if (currentIx === 1) {
            valueAtOne = currentValue;
        }
    }


    return valueAtOne;
}


run();
