const TEST = `
0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5
`;

const PROD = require("./12.prod.js");

function run() {
    // console.log(doMagic(sanitize(TEST)));
    console.log(doMagic(sanitize(PROD)));
    // console.log(sanitize(PROD).map(directions => doMagic(directions)));
}

function sanitize(aa) {
    return aa
        .trim()
        .split("\n")
        .map(s => s.trim().split(" <-> "))
        .filter(n => n);
}

class Node {
    constructor(id) {
        this.id = id;
        this.children = [];
    }

    addChild(c) {
        this.children.push(c);
    }

    getAllChildren(res) {
        if (!res) {
            res = {};
        }
        if (res[this.id]) return res;

        res[this.id] = 1;
        return this.children.reduce((res, c) => c.getAllChildren(res), res);
    }
}

function doMagic(input) {
    // it's a kind of maagiiiic

    const nodes = {};

    input.forEach(([nodeId]) => {
        nodes[nodeId] = new Node(nodeId);
    });

    input.forEach(([nodeId, childrenRaw]) => {
        if (!childrenRaw) {
            console.log(nodeId, childrenRaw);
        }
        const children = childrenRaw.split(",").map(s => s.trim());
        const n = nodes[nodeId];
        children.forEach(c => {
            n.addChild(nodes[c]);
        });
    });

    let numOfGroups = 1;
    let allNodesInGroup = nodes[0].getAllChildren();
    let whosOut = input.filter(([nodeId]) => !allNodesInGroup[nodeId]).map(([nodeId]) => nodeId);

    while (whosOut.length) {
        numOfGroups++;

        nodes[whosOut[0]].getAllChildren(allNodesInGroup);
        whosOut = input.filter(([nodeId]) => !allNodesInGroup[nodeId]).map(([nodeId]) => nodeId);
    }

    console.log(numOfGroups);
}

run();
