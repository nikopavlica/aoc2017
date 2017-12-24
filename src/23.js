const TEST = `
`;

const PROD = require("./23.prod.js");

function run() {
    console.time('magic');
    // console.log(doMagic(sanitize(TEST)));
    console.log(doMagic(sanitize(PROD)));
    console.timeEnd('magic');
}


function sanitize(aa) {
    return aa
        .trim().split('\n').map(cmd => {
            let [c, reg, val] = cmd.split(' ')
            return {
                cmd: c,
                reg: isNaN(reg) ? reg : parseInt(reg, 10),
                val: isNaN(val) ? val : parseInt(val, 10)
            }
        });
}

class Program {
    constructor(PROGRAM_ID, commands) {
        const registers = {
            a: 1
            // a: 1, b: 106700, c: 123700, f: 0, d: 879,
            // a: 1, b: 123700, c: 123700, f: 0, d: 122951, e: 3, g: -749, h: 500
            // a: 1, b: 106700, c: 123700, f: 0, d: 3143, e: 98366, g: 309057638
        };
        const receiveQueue = [];
        // let queueIx = 0;
        let commandIx = 0;
        let sendCounter = 0;
        let counters = {};

        function getVal(v) {
            if (isNaN(v)) {
                return registers[v] || 0;
            }
            return v || 0;
        }

        let terminated = false;
        let prevH;

        this.next = function (targetProgram) {
            if (terminated) return 0;

            let stepsTaken = 0;
            while (commandIx < commands.length && commandIx >= 0) {
                const { cmd, reg, val } = commands[commandIx];
                switch (cmd) {
                    case 'set':
                        registers[reg] = getVal(val);
                        break;
                    case 'add':
                        registers[reg] = getVal(reg) + getVal(val);
                        break;
                    case 'mul':
                        registers[reg] = getVal(reg) * getVal(val);

                        break;
                    case 'sub':
                        registers[reg] = getVal(reg) - getVal(val);
                        break;
                    case 'mod':
                        registers[reg] = getVal(reg) % getVal(val);
                        break;
                    // case 'snd': {
                    //     sendCounter++;
                    //     targetProgram.receive(getVal(reg));
                    //     break;
                    // }
                    // case 'rcv':
                    //     if (receiveQueue.length) {
                    //         registers[reg] = receiveQueue.shift();
                    //     } else {
                    //         console.log('PROGRAM', PROGRAM_ID, 'waiting after ', stepsTaken, 'steps');
                    //         return stepsTaken;
                    //     }
                    //     break;
                    case 'jnz': {
                        let v = getVal(val);
                        if (getVal(reg) !== 0 && v) {
                            commandIx += v - 1
                        }
                        break;
                    }
                    // case 'jgz': {
                    //     let v = getVal(val);
                    //     if (getVal(reg) > 0 && v) {
                    //         commandIx += v - 1
                    //     }
                    //     break;
                    // }
                    default:
                        throw 'unknown ' + cmd;

                }
                // console.log(PROGRAM_ID, commandIx, commands[commandIx], registers, receiveQueue.length);
                counters[cmd] = (counters[cmd] || 0) + 1
                stepsTaken++;
                commandIx++;
                if (registers.h !== prevH) {
                    console.log(commandIx, stepsTaken, registers);
                    prevH = registers.h;
                }
            }

            console.log(commandIx, stepsTaken, registers);

            terminated = true;
            return stepsTaken;
        }

        this.receive = function (val) {
            // console.log('PROGRAM', PROGRAM_ID, 'received ', val);
            receiveQueue.push(val);
            // return this.next(from);
        }

        this.getSendCounter = function () {
            return sendCounter + ' ' + commandIx;
        }

        this.getCounter = function (cmd) {
            return counters[cmd] || 0
        }
    }


}

function doMagic(commands) {

    const program0 = new Program(0, commands);
    program0.next();
    // let i = 0;
    // while (program0.next()) {

    // }
    console.log('DONE');

    return program0.getCounter('mul');
}

run();
