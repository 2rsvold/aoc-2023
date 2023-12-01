const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

// Variables
let linedigits = [];
let verbalDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
let verbalStartsWith = 'otfsen';

// Handle lines
lineReader.onLine((line) => {
	let digits = [];

	// Search for digits
	line.split('').forEach((d, k) => {
		if (verbalStartsWith.split('').indexOf(d) !== -1) {
			let r = lookForVerbalDigit(line, k);
			if (r != 0) {
				digits.push(r);
				console.log("Found word digit:", r);
			}
		} else if (parseInt(d)) {
			digits.push(d);
			console.log("Found digit: ", d);
		}
	});

	// Add digits to
	linedigits.push(digits[0] + digits[digits.length - 1]);
});

lineReader.onClose(() => {
	let sum = linedigits.reduce((a, b) => {
		return parseInt(a) + parseInt(b);
	}, 0);

	console.log("Sum: " + sum);
});


function lookForVerbalDigit(line, start) {
	let result = 0;
	verbalDigits.forEach((v, k) => {
		// Check if the first letter of the word is at the starting search point
		if (v.split('')[0] == line[start]) {
			let possibleWord = line.split('').splice(start, v.split('').length);
			if (v == possibleWord.join('')) {
				console.log("Found a word digit in line", line, ':', v, k + 1);
				result = (k + 1).toString();
			}
		}
	});

	return result;
}