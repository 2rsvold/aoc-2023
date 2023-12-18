const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

let hashes = [];

lineReader.onLine((l) => {
    hashes = l.split(',');
});

lineReader.onClose(() => {
    let sum = 0;
    hashes.forEach((w) => {
        sum += process(w);
    });

    console.log(sum);
});

lineReader.onClose(() => {
    let boxes = Array(256);

    hashes.forEach((w) => {
        let add = w.indexOf('=');
        let remove = w.indexOf('-');

        // Remove operator
        w = w.replace(/=|-/, ' ');

        // Get index
        let l = w.split(' ')[0];
        let i = process(l);

        if (add != -1) {
            if (!boxes[i]) boxes[i] = [];

            let exists = boxes[i].filter(e => e.startsWith(l));

            if (exists.length > 0) {
                boxes[i] = boxes[i].map(e => e.startsWith(l) ? w : e);
            } else {
                boxes[i].push(w);
            }
        } else if (remove != -1) {
            if (boxes[i] != undefined)
                boxes[i] = boxes[i].filter(e => !e.startsWith(l));
        } else {
            console.log("ERROR! Wrong operator:", w);
        }
    });

    let total = 0;
    boxes.forEach((b, i) => {
        b.forEach((e, s) => {
            let box = i + 1;
            let slot = s + 1;
            let focal = e.split(' ')[1];

            total += box * slot * focal;
        });
    });

    console.log(total);
});

function process(word) {
    let total = 0;
    word.split('').forEach(c => {
        total += toASCII(c);
        total = modulo(total);
    });

    return total;
}

function toASCII(i) {
    return i.charCodeAt(0);
}

function modulo(i) {
    return (i * 17) % 256;
}