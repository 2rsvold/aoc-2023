const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

let platform = [];
lineReader.onLine(l => {
	// y, x
	platform.push(l.split(''));
});

lineReader.onClose(() => {
	let iterations = 1000000000;
	for (let i = 0; i < iterations; i++) {
		let steps = 0;
		while (tilt(moveNorth)) { steps++; }
		while (tilt(moveWest)) { steps++; }
		while (tiltReverse(moveSouth)) { steps++; }
		while (tiltReverse(moveEast)) { steps++; }

		if (steps == 0) break;
		console.log(iterations - i, steps);
	}

	load();
});

function tilt(move) {
	let movement = false;
	platform.forEach((v, y) => {
		v.forEach((_, x) => {
			if (move(y, x)) movement = true;
		});
	});

	return movement;
}

function tiltReverse(move) {
	let movement = false;
	
	for (let y = platform.length - 1; y >= 0; y--) {
		for (let x = platform[y].length - 1; x >= 0; x--) {
			if (move(y, x)) movement = true;
		}
	}

	return movement;
}

function load() {
	let load = 0;
	platform.forEach((l, i) => {
		load += l.filter(e => e === 'O').length * (platform.length - i);
	});

	return load;
}

function moveEast(y, x) {
	if (platform[y][x] !== 'O') return false;
	if (platform[y][x + 1] === undefined) return false;
	if (platform[y][x + 1] !== '.') return false;

	platform[y][x + 1] = platform[y][x];
	platform[y][x] = '.';

	return true;
}

function moveSouth(y, x) {
	if (platform[y][x] !== 'O') return false;
	if (platform[y + 1] === undefined) return false;
	if (platform[y + 1][x] !== '.') return false;

	platform[y + 1][x] = platform[y][x];
	platform[y][x] = '.';

	return true;
}

function moveWest(y, x) {
	if (platform[y][x] !== 'O') return false;
	if (platform[y][x - 1] === undefined) return false;
	if (platform[y][x - 1] !== '.') return false;

	platform[y][x - 1] = platform[y][x];
	platform[y][x] = '.';

	return true;
}

function moveNorth(y, x) {
	if (platform[y][x] !== 'O') return false;
	if (platform[y - 1] === undefined) return false;
	if (platform[y - 1][x] !== '.') return false;

	platform[y - 1][x] = platform[y][x];
	platform[y][x] = '.';

	return true;
}

function visualzie() {
	let map = [];
	platform.forEach((e) => {
		map += e.join('') + '\n';
	});

	console.log(map);
}