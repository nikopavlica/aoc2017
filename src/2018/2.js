//@flow
const { TEST, TEST2, PROD } = require('./2.data');

function run() {
    console.time('magic');
    console.log(doMagic2(sanitize2(PROD)));
    // console.log(doMagic(sanitize(PROD)));
    console.timeEnd('magic');
}

function sanitize(aa) {
    return aa
        .trim().split('\n').map(p => Object.values(p.split('').reduce((r, char) => {
            r[char] = r[char] + 1 || 1;
            return r;
        }, {})));
}

function sanitize2(aa) {
    return aa
        .trim().split('\n');
}

// function doMagic(input) {
//     return input.reduce((r, i) => r + i, 0);
// }

function doMagic(input) {
    let count2 = 0;
    let count3 = 0;

    input.forEach((counts) => {
        if (counts.includes(2)) count2++;
        if (counts.includes(3)) count3++;
    });

    return count2 * count3;
}

function doMagic2(input) {
    for (var i = 0, l = input.length; i < l; ++i) {
        const txt = input[i];

        for (var j = i + 1; j < l; ++j) {
            if (isTheSame(txt, input[j])) {
                return `${getTheSame(txt, input[j])}`;
            }
        }
    }
    return 'NADA'
}

function getTheSame(str1, str2) {
    let same = '';
    for (var i = 0, l = str1.length; i < l; ++i) {
        if (str1[i] == str2[i]) {
            same += str1[i];
        }
    }
    return same;
}

function isTheSame(str1, str2) {
    let changes = 0;
    for (var i = 0, l = str1.length; i < l; ++i) {
        if (str1[i] != str2[i]) {
            ++changes;
        }
    }
    console.log(str1, str2, changes)

    return changes === 1;
}

run();
