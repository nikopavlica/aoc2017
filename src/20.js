const TEST = `
p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>    
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>
`;


const PROD = require("./20.prod.js");

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

function ensure(x) {
    if (x.x !== undefined && x.y !== undefined && x.z !== undefined) {
        return x;
    }
    throw "parsing error";
}

function mhtn(n) {
    return Math.abs(n.x) + Math.abs(n.y) + Math.abs(n.z);
}

function sum(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    };
}

class Particle {
    constructor(position, velocity, acceleration, ix) {
        this.p = ensure(position);
        this.v = ensure(velocity);
        this.a = ensure(acceleration);
        this.ix = ix;
    }

    getManhattanAcc() {
        return mhtn(this.a);
    }
}

function sanitize(aa) {
    return aa
        .trim()
        .split('\n').map((pi, ix) => {
            let [p, v, a] = pi.split(', ').map(c => {
                let [x, y, z] = c.split('=<')[1].split(',').map(s => parseInt(s.trim(), 10));
                return { x, y, z }
            })
            return new Particle(p, v, a, ix);
        });
}

function getClosestParticle(input) {
    let input2 = [...input];
    input2.sort(function (a, b) {
        let diff = mhtn(a.a) - mhtn(b.a);
        if (diff) return diff;

        // if accelerations are the same, calculate headstart using manhattn of (pos+vel)
        diff = mhtn(sum(a.p, a.v)) - mhtn(sum(b.p, b.v));
        if (diff) return diff;

        // console.log('equal');
        // console.log(a);
        // console.log(b);
    });

    return input2[0];
}

function doMagic(input) {

    let closestIx = 0;

    let closestParticle = getClosestParticle(input);

    let ultimatelyClosestParticleIx = closestParticle.ix;
    console.log('closest particle ', ultimatelyClosestParticleIx);
    let closestParticleIx = 0;
    let mmm = 0;
    do {
        let closestParticleDistance = Number.MAX_VALUE;
        let positionsHash = {};
        let keysForRemovalHash = {};
        input.forEach((p, inputIx) => {
            p.v = sum(p.v, p.a);
            p.p = sum(p.p, p.v);

            let m = mhtn(p.p);
            if (m < closestParticleDistance) {
                closestParticleIx = p.ix;
                closestParticleDistance = m;
            }

            // let k = `${p.p.x}-${p.p.y}-${p.p.z}`;
            // p.key = k;
            // if (!positionsHash[k]) {
            //     positionsHash[k] = 1;
            // } else {
            //     keysForRemovalHash[k] = p;
            // }
        });
        // if (Object.keys(keysForRemovalHash).length) {
        //     let findClosest = false;
        //     let findUltimateClosest = false;
        //     input = input.filter(p => {
        //         if (keysForRemovalHash[p.key]) {
        //             if (p.ix === closestParticleIx) {
        //                 findClosest = true;
        //             }
        //             if (p.ix === ultimatelyClosestParticleIx) {
        //                 findUltimateClosest = true;
        //             }
        //             return false;
        //         }
        //         return true;
        //     });

        //     // if (findClosest) {
        //     //     closestParticleDistance = Number.MAX_VALUE;
        //     //     input.forEach((p, inputIx) => {
        //     //         let m = mhtn(p.p);
        //     //         if (m < closestParticleDistance) {
        //     //             closestParticleIx = p.ix;
        //     //             closestParticleDistance = m;
        //     //         }
        //     //     });
        //     //     console.log('new closest particle', closestParticleIx);
        //     // }
        //     // if (findUltimateClosest) {
        //     //     ultimatelyClosestParticleIx = getClosestParticle(input).ix;
        //     //     console.log('new ultimate closest particle', ultimatelyClosestParticleIx);

        //     // }
        // }
        console.log(closestParticleIx);
    } while (true)

    console.log('done');

    return input.length;
}


run();
