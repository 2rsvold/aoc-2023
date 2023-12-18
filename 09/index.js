const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');



// Get diff array
function processDiff(line) {
	let diff = [];

	for (let i = 1; i < line.length; i++) {
		diff.push(line[i] - line[i - 1]);
	}

	return diff;
}

function iterate(matrix) {
	for (let x = 1; x < matrix.length; x++) {
		let next = matrix[x][matrix[x].length - 1];
		let prev = matrix[x-1][matrix[x-1].length - 1];
		matrix[x].push(next + prev);
	}

	return matrix;
}

function subtrate(matrix) {
	for (let x = 1; x < matrix.length; x++) {
		let next = matrix[x][0];
		let prev = matrix[x-1][0];
		matrix[x].unshift(next - prev);
	}

	return matrix;
}

function getHistory(matrix) {
	return matrix[matrix.length-1][matrix[matrix.length-1].length-1];
}

function processMatrix(matrix) {
	while (matrix[matrix.length - 1].filter(e => e != 0).length != 0) {
		matrix.push(processDiff(matrix[matrix.length - 1]));
	}

	return matrix;
}

// Read file
let total = 0;
let part2 = 0;
lineReader.onLine((l) => {
	let input = l.split(' ').map(e => parseInt(e));
	let matrix = [input];
	let another = [input];

	matrix = processMatrix(matrix);
	matrix.reverse();
	matrix = iterate(matrix);
	total += getHistory(matrix);

	// Part 2
	another = processMatrix(another);
	another.reverse();
	another = subtrate(another);
	part2 += another[another.length-1][0];
});

lineReader.onClose(() => {
	console.log(total);
	console.log(part2);
});