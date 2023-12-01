const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

// Variables
let digits = [];
let verbalDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function lookForVerbalDigit(l, s) {
	let r = 0;

	// Check if the first letter of the word is at the starting search point
	verbalDigits.forEach((v, k) => {
		if (v.split('')[0] == l[s]) if (v == l.split('').splice(s, v.split('').length).join('')) r = (k + 1).toString();
	});

	return r;
}

// Handle lines
lineReader.onLine((line) => {
	let lineDigits = [];

	// Search for digits on each line
	line.split('').forEach((d, k) => {
		// Look for the first letter of our words
		if (verbalDigits.map((v) => v = v.split('')[0]).indexOf(d) !== -1) {
			// This could be one of the words, try and look for it
			let r = lookForVerbalDigit(line, k);
			if (r != 0) lineDigits.push(r);
		} else if (parseInt(d)) {
			// This is a digit we can just add
			lineDigits.push(d);
		}
	});

	// Add the first and last digits to our memory
	digits.push(lineDigits[0] + lineDigits[lineDigits.length - 1]);
});

// Sum up all the digits and print on close
lineReader.onClose(() => console.log("Sum:", digits.reduce((a, b) => parseInt(a) + parseInt(b), 0)));
