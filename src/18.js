const TEST = `
set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2
`;
const TEST2 = `
snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d
`

const PROD = require("./18.prod.js");

function run() {
    // console.log(doMagic(sanitize(TEST2)));
    console.time('magic');
    console.log(doMagic(sanitize(PROD)));
    console.timeEnd('magic');
}

function sanitize(aa) {
    return aa
        .trim().split('\n').map(cmd => { 
            let [c, reg, val] = cmd.split(' ')
            return {
                cmd: c,
                reg: reg !== undefined ? parseInt(reg, 10) || reg : null,
                val: val !== undefined ? parseInt(val, 10) || val : null
            }
        });
}

class Program {
    constructor(PROGRAM_ID, commands) {
        const registers = {
            p: PROGRAM_ID
        };
        const receiveQueue = [];
        // let queueIx = 0;
        let commandIx = 0;
        let sendCounter = 0;

        function getVal(v) {
            if (isNaN(v)) {
                return registers[v] || 0;
            }
            return v || 0;
        }

        let terminated = false;

        this.next = function(targetProgram) {
            if (terminated) return 0;
            
            let stepsTaken = 0;
            while (commandIx < commands.length && commandIx >= 0) {
                const {cmd, reg, val} = commands[commandIx];
                switch(cmd) {
                    case 'set':
                        registers[reg] = getVal(val);
                        break;
                    case 'add':
                        registers[reg] = getVal(reg) + getVal(val);
                        break;
                    case 'mul':
                        registers[reg] = getVal(reg) * getVal(val);
                        break;
                    case 'mod':
                        registers[reg] = getVal(reg) % getVal(val);
                        break;
                    case 'snd': {
                        sendCounter++;
                        targetProgram.receive(getVal(reg));
                        break;
                    }
                    case 'rcv':
                        if (receiveQueue.length) {
                            registers[reg] = receiveQueue.shift();
                        } else {
                            console.log('PROGRAM', PROGRAM_ID, 'waiting after ', stepsTaken, 'steps');
                            return stepsTaken;
                        }
                        break;
                    case 'jgz': {
                        let v = getVal(val);
                        if (getVal(reg) && v) {
                            commandIx += v - 1
                        }
                        break;
                    }
                    default:
                        throw 'unknown ' + cmd;
                    
                }
                // console.log(PROGRAM_ID, commandIx, commands[commandIx], registers, receiveQueue.length);
                stepsTaken++;
                commandIx++;
            }
            terminated = true;
            return stepsTaken;
        }

        this.receive = function(val) {
            // console.log('PROGRAM', PROGRAM_ID, 'received ', val);
            receiveQueue.push(val);
            // return this.next(from);
        }

        this.getSendCounter = function() {
            return sendCounter +' ' + commandIx;
        }
    }


}

function doMagic(commands) {
    
    const program0 = new Program(0, commands);
    const program1 = new Program(1, commands);
    let i = 0;
    while (program0.next(program1) || program1.next(program0)) {
        console.log(i++, program1.getSendCounter(), program0.getSendCounter());
    }
    console.log('DONE');

    return program1.getSendCounter();
}


run();
