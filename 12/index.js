const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

let input = '???.###'.split('');
let possible = [];

input.forEach((e, i) => {
    if (e == '?') {
        input[i] = '.';
        possible.push(input.join(''));
        input[i] = '#';
        possible.push(input.join(''));
    }
});

console.log(possible);