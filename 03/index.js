const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

let grid = [];
let numbers = [];
let numberStart = null;
let number = '';

lineReader.onLine((line) => {
	grid.push(line.split(''));
});

lineReader.onClose(() => {
	grid.forEach((entry, y) => {
		entry.forEach((v, x) => {

			if (parseInt(v)) {
				if (numberStart == null) numberStart = x;
				number += v;
			}

			if (!parseInt(v)) {
				if (numberStart != null) {
					numbers.push({
						start: {
							x: numberStart,
							y: y
						},
						end: {
							x: numberStart + number.split('').length - 1,
							y: y,
						},
						partNumber: parseInt(number)
					});

					// Reset
					numberStart = null;
					number = '';
				}
			}
		});
	});

	let sum = 0;

	numbers.forEach((n) => {
		if (isPartNumber(n)) {
			sum += n.partNumber;
		}
	});

	console.log("Sum part 1:", sum);
});

function isPartNumber(entry) {
	let isPartNumber = false;

	let x = entry.start.x-1;
	let y = entry.start.y;
	let e = entry.end.x+1;

	// Middle
	let before = grid[y][x] ?? '.';
	let after = grid[y][e] ?? '.';
	if (before != '.' && after != '.') { partNumber = true; }

	return isPartNumber || checkLine(x, e, y+1) || checkLine(x, e, y-1);
}

function checkLine(x, e, y) {
	let isPartNumber = false;
	
	for (let i = x; i <= e; i++) {
		let value = grid[y] ?? '.';
		if (value !== '.') value = value[i];
		if (value !== '.') isPartNumber = true;
	}

	return isPartNumber;
}