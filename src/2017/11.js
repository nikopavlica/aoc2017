const TEST = `
    ne,ne,ne
ne,ne,sw,sw
ne,ne,s,s
se,sw,se,sw,sw
`;

const PROD = require("./11.prod.js");

function run() {
    // console.log(sanitize(TEST).map(directions => doMagic(directions)));
    console.log(sanitize(PROD).map(directions => doMagic(directions)));
}

function sanitize(aa) {
    return aa
        .trim()
        .split("\n")
        .map(s => s.trim().split(","))
        .filter(n => n);
}

function doMagic(input) {
    let x = 0;
    let y = 0;

    let i = 0;
    let l = input.length;

    let maxDistance = 0;

    for (; i < l; i++) {
        switch (input[i]) {
            case "n":
                y += 1;
                x -= 1;
                break;
            case "ne":
                x--;
                break;
            case "se":
                y--;
                break;
            case "s":
                y -= 1;
                x += 1;
                break;
            case "sw":
                x++;
                break;
            case "nw":
                y++;
                break;
            default:
                throw "burek";
        }

        let d = hexDistance(x, y);
        if (d > maxDistance) maxDistance = d;
    }

    console.log(maxDistance);
    // return hexDistance(x, y);
}

function hexDistance(x, y) {
    let distance = 0;

    while (x < 0 && y > 0) {
        x++;
        y--;
        distance++;
    }

    while (x > 0 && y < 0) {
        y++;
        x--;
        distance++;
    }

    return distance + Math.abs(x) + Math.abs(y);
}

run();
