const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

function calculateTravelTime(duration, hold) {
    return (duration - hold) * hold;
}

function getNewRecords(duration, record) {
    let options = [];
    for (let i = 0; i <= duration; i++) {
        if (calculateTravelTime(duration, i) > record)
            options.push(i);
    }

    return options;
}

function calculateTotal(duration, record) {
    return getNewRecords(duration, record).length;
}

let lines = [];
lineReader.onLine((l) => {
    l = l.split(/ +/);
    lines.push(l.slice(1).map(e => parseInt(e)));
});

lineReader.onClose(() => {
    let times = lines[0];
    let records = lines[1];
    let total = 1;

    times.forEach((t, i) => {
        total *= calculateTotal(t, records[i]);
    });

    console.log("Part 1:", total);

    let time = parseInt(times.reduce((a, b) => a + '' + b));
    let record = parseInt(records.reduce((a, b) => a + '' + b));

    console.log("Part 2:", calculateTotal(time, record));
});
