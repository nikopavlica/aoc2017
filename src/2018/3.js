//@flow
const { TEST, TEST2, PROD } = require('./3.data');

function run() {
    console.time('magic');
    console.log(doMagic(sanitize(PROD)));
    console.timeEnd('magic');
}

function sanitize(aa) {
    return aa
        .trim().split('\n').map(p => {
            const [id, , posstr, sizestr] = p.split(' ');

            const [left, top] = posstr.split(',').map(s => parseInt(s, 10));
            const [width, height] = sizestr.split('x').map(s => parseInt(s, 10));

            return { id, top, left, width, height };
        });
}

function doMagic(input) {
    let overlap = 0;
    let rows = [];

    let nonOverlappingRects = {};

    input.forEach(rect => {
        const { top, left, height, width, id } = rect;
        nonOverlappingRects[id] = true;
        // console.log(rect);
        for (var y = top, h = top + height; y < h; ++y) {
            for (let x = left, w = left + width; x < w; ++x) {
                rows[y] = rows[y] || [];

                let val = rows[y][x];

                if (val) {
                    if (val !== '?') {
                        delete nonOverlappingRects[val];
                        overlap++;
                        rows[y][x] = '?'
                    }
                    delete nonOverlappingRects[id];
                } else {
                    rows[y][x] = id;
                }
            }
        }
    });

    return `${overlap}, ${Object.keys(nonOverlappingRects).join(',')}`;
}

run();
