const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

let sum = 0;
lineReader.onLine((l) => {
	l = l.split(' | ');
	let winners = l[0].split(/ +|: +/).slice(2);
	let our = l[1].split(/ +|: +/);

	our = our.filter(v => winners.includes(v) );

	console.log("Card value:", Math.floor(Math.pow(2, our.length - 1)));
	sum += Math.floor(Math.pow(2, our.length - 1));
});

lineReader.onClose(() => {
	console.log("Result part 1: ", sum);
});