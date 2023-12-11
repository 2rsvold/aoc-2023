const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

let instructions;
let map = [];

function goLeft(position) {
	return getPosition(position)[1] ?? null;
}

function goRigth(position) {
	return getPosition(position)[2] ?? null;
}

function getPosition(position) {
	return map.filter(e => e[0] === position)[0] ?? null;
}

function getAllStartPositions(map) {
	return map.filter(e => e[0].split('')[2] == 'A').map(e => e[0]);
}

function stepsFromStartToEnd(start, end) {
	let out = false;
	let iterations = 0;
	let current = start;

	// Part one
	while (out == false) {
		let i = instructions[iterations % instructions.length];

		// Directions
		switch (i) {
			case 'L':
				current = goLeft(current);
				break;
			case 'R':
				current = goRigth(current);
				break;
		}

		iterations++;

		if (current == end) out = true;
	}

	return iterations;
}

function simultaneousNavigation(starts) {
	let out = false;
	let iterations = 0;
	let current = starts;

	// Part one
	while (out == false) {
		let i = instructions[iterations % instructions.length];

		current.forEach((c, k) => {
			// Directions
			switch (i) {
				case 'L':
					current[k] = goLeft(c);
					break;
				case 'R':
					current[k] = goRigth(c);
					break;
			}
		});

		iterations++;

		
		let notZ = current.filter(e => e.split('')[2] != 'Z').length;
		if (notZ == 0) out = true;
		console.log(notZ, current, iterations);
	}

	return iterations;
}

lineReader.onLine((l) => {
	if (instructions == null) instructions = l.split('');
	else if (l != '') map.push(l.replace(')', '').split(/ = \(|, |\)/));
});

lineReader.onClose(() => {
	let starts = getAllStartPositions(map);
	console.log(starts);

	console.log(simultaneousNavigation(starts));
});