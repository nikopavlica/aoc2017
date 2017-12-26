const TEST = `
Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
`;


const PROD = require("./25.prod.js");

function run() {
    console.time('magic');
    // console.log(doMagic(sanitize(TEST)));
    console.log(doMagic(sanitize(PROD)));
    console.timeEnd('magic');
}

function getStateDecision(action, where, after) {
    let val = parseInt(action.match(/\d+/)[0], 10);
    let nextIx = where.match(/(left|right)/)[1];

    let r = {
        val,
        ixDiff: nextIx === 'left' ? -1 : 1,
        nextState: after.match(/state (.+)\./)[1]
    };
    console.log(r)
    return r;
}
function sanitize(aa) {
    return aa
        .trim()
        .split('\n\n')
        .reduce((r, txt, ix) => {
            if (ix === 0) {
                let [statetxt, stepstxt] = txt.split('\n');

                r.currentState = statetxt.match(/in state (.+)\./)[1];
                r.numOfSteps = parseInt(stepstxt.match(/\d+/)[0], 10);
            } else {
                let [statetxt, if0, whenif0, whereif0, afterif0, if1, whenif1, whereif1, afterif1] = txt.split('\n');

                let state = statetxt.match(/state (.+):/)[1];
                const resp0 = getStateDecision(whenif0, whereif0, afterif0);
                const resp1 = getStateDecision(whenif1, whereif1, afterif1);
                r.states[state] = s => s === 0 ? resp0 : resp1;
            }
            return r;
        }, {
            states: {},
            currentState: null,
            numOfSteps: null,
        });
}

function doMagic(input) {

    let states = { 0: 0 };
    let ix = 0;
    let remainingSteps = input.numOfSteps;
    let currentState = input.currentState;

    while (remainingSteps--) {
        const { val, ixDiff, nextState } = input.states[currentState](states[ix] || 0);
        states[ix] = val;

        currentState = nextState;
        ix += ixDiff;
    }


    return Object.values(states).reduce((r, v) => r + v);
}


run();
