
const TEST = `
s1,x3/4,pe/b
`;

const PROD = require("./16.prod.js");

function run() {
    // console.log(doMagic(sanitize(TEST), 'abcde'));
    console.time('magic');
    console.log(doMagic(sanitize(PROD), 'abcdefghijklmnop'));
    console.timeEnd('magic');
}

function sanitize(aa) {
    return aa
        .trim().split(',').map(cmd => {
            let c = cmd.substr(0,1);
            let args = cmd.substr(1);
            return {
                cmd: c,
                args: args.split('/').map(a => parseInt(a, 10) || a)
            }
        });
}

function dance(input, str) {
    const positions = str.split('');
    const strLen = str.length;
    for (let i = 0, l = input.length; i < l; i++) {
        let {cmd, args} = input[i];
        switch(cmd) {
            case 's': 
                var end = positions.splice(-args[0]);
                positions.splice(0,0, ...end);
            break;
            case 'x':
                var tmp = positions[args[0]];
                positions[args[0]] = positions[args[1]];
                positions[args[1]] = tmp;
            break;
            case 'p':
                var used = 0;
                for (var j = 0; j < strLen && used < 2; j++) {
                    if (positions[j] === args[0]) {
                        positions[j] = args[1];
                        used++;
                    } else if (positions[j] === args[1]) {
                        positions[j] = args[0];
                        used++;
                    }
                }
            break;
            default:
                throw 'unknown command ' + JSON.stringify(input[i]);
        }
        // console.log(positions, cmd, args);
    }
    return positions.join('');
}

function doMagic(danceMoves, positions) {
    let newPositions = positions;
    const positionsHash = {};
    const storedPositions = {};
    let loopSize;
    let i = 1;
    let target = 1000000000;
    while (i <= target) {
        newPositions = dance(danceMoves, newPositions);
        if (positionsHash[newPositions]) {
            if (!loopSize)
                loopSize = i - 1;
            break;
        } else {
            positionsHash[newPositions] = i;
            storedPositions[i] = newPositions;
        }
        i++;
    }

    if (loopSize) {
        let b = (target % loopSize);
        newPositions = storedPositions[b];
        // newPositions = positions;
        // for (let j = 0; j < b; j++) {
            // newPositions = dance(danceMoves, newPositions);
            // console.log(target - (b - j - 1), newPositions);
        // }
    }
    return newPositions;
}


run();
