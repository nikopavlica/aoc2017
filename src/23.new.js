let b = 67;
let c = b;
b *= 100
b -= -100000
c = b;
c -= -17000
let h = 0;

let first = 0;
do {
    if (first++) b += 17;
    let doCountH = false;
    let d = 2
    do {
        doCountH = (b % d) === 0;
        if (doCountH)
            break;
        // do {
        //     if ((d * e) === b) doCountH = true
        //     e++;
        //     // } while (e - b !== 0)
        // } while (e < b)
        d++;
    } while (d < b)

    if (doCountH) h++;
} while (b < c);
console.log(h);

