const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

let possible = [];

function iterate(unknown) {
	possible = [];
	unknown.forEach(e => {
		let dot = e.replace(/\?/, '.');
		let hash = e.replace(/\?/, '#');
		
		possible.push(dot);
		possible.push(hash);
	});

	let remaining = possible.filter(e => e.indexOf('?') !== -1);
	if (remaining.length !== 0) iterate(remaining);
}

function getPattern(line) {
	line = line.split(/\.+/g).map(e => e.split('').length);
	return line.join(',');
}

function isPattern(line, pattern) {
	line = getPattern(line);
	if (getPattern(line).indexOf(pattern) == -1) false;

	// Remove noise
	line = line.replace(pattern, '').replace(/0|,/g, '');
	return line.length === 0 ? true : false;
}

function process(line, pattern) {
	possible = [line];
	iterate(possible.filter(e => e.indexOf('?') !== -1));

	return possible.filter(e => isPattern(e, pattern)).length;
}

let total = 0;
lineReader.onLine((l) => {
	l = l.split(' ');
	let c = process(l[0], l[1]);
	total += c;
	console.log(c, l[0], l[1]);
});

lineReader.onClose(() => {
	console.log("Sum:", total);
});