const TEST =
    `     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ `;

const PROD = require("./19.prod.js");

const DOWN = 'down';
const RIGHT = 'right';
const LEFT = 'left';
const UP = 'up';

function run() {
    console.time('magic');
    // console.log(doMagic(sanitize(TEST)));
    console.log(doMagic(sanitize(PROD)));
    console.timeEnd('magic');
}

function sanitize(aa) {
    return aa
        .split('\n').map(cmd => {
            return cmd.split('')
        });
}

function doMagic(input) {

    const width = input[0].length;
    const height = input.length;
    for (let i = 0; i < input.length; i++) {
        if (input[i].length !== width) {
            throw "parsing error at " + i;
        }
        console.log(input[i].join(''));
    }

    let currentSpot = '|'
    let y = 0;
    let x = input[y].indexOf(currentSpot);
    let dir = DOWN;

    const maxX = width - 1;
    const maxY = height - 1;
    const collectedLetters = [];
    let finished = false;

    function tryMove(newY, newX, validPath, desiredDir) {
        if (newX < 0 || newX > maxX || newY < 0 || newY > maxY) return false;

        currentSpot = input[newY][newX];
        if (/[A-Z]/.test(currentSpot)) {
            collectedLetters.push(currentSpot);

            dir = desiredDir;
            return true;
        }

        if (currentSpot === '+' || currentSpot === validPath) {
            dir = desiredDir;
            return true;
        } else if (currentSpot !== ' ') {
            // crossing a path
            return true;
        }
        return false;
    }

    function tryDown() {
        if (tryMove(y + 1, x, '|', DOWN)) {
            y++;
            return true;
        }
    }
    function tryUp() {
        if (tryMove(y - 1, x, '|', UP)) {
            y--;
            return true;
        }
    }
    function tryLeft() {
        if (tryMove(y, x - 1, '-', LEFT)) {
            x--;
            return true;
        }
    }
    function tryRight() {
        if (tryMove(y, x + 1, '-', RIGHT)) {
            x++;
            return true;
        }
    }

    function done() {
        finished = true;
    }

    let s = 0;
    while (!finished) {
        // console.log(x, y, currentSpot);
        switch (dir) {
            case DOWN: tryDown() || tryRight() || tryLeft() || done(); break;
            case UP: tryUp() || tryLeft() || tryRight() || done(); break;
            case LEFT: tryLeft() || tryDown() || tryUp() || done(); break;
            case RIGHT: tryRight() || tryUp() || tryDown() || done(); break;
            default: throw 'unknwown dir ' + dir;
        }
        s++
    }

    console.log(s);
    return collectedLetters.join('');
}


run();
