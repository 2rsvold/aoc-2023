const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

// Variables
let max = 0;
let current = 0;

// Handle lines
lineReader.onLine((line) => {
	if (line === '') {
		if (current > max) max = current;
		current = 0;
	} else {
		current += parseInt(line);
	}
});

lineReader.onClose(() => {
	console.log(max);
});
