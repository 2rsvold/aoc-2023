const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

// Cords: y, x
// x: horizontal
// y: vertical
let map = [];
let y = 0;

lineReader.onLine(l => {
	l = l.split('');
	l = l.map((e, i) => {
		map.push({
			value: e,
			x: i,
			y: y
		});
	});
	y++;
});

lineReader.onClose(() => {
	let start = map.filter(e => e.value == 'S')[0];
	visualize(map, start);

	let counted = [...map];
	let possible = getPossibleDirections(start);
	console.log(possible[1]);

	console.log(getNext(possible[1]));
});

function getNext(node) {
	switch(node.value) {
		case '-':
			return getDirection(node, node.prev);
		default:
			return;
	}
}

function highlight(value) {
	return '\033[44m\033[37m' + value + '\033[0m';
}

function getDirection(node, direction) {
	let x = node.x;
	let y = node.y;

	switch(direction) {
		case 'W':
			x--;
			break;
		case 'E':
			x++;
			break;
		case 'N':
			y++;
			break;
		case 'S':
			y--;
			break;
	}

	let dir = map.filter(e => e.x == x && e.y == y)[0] ?? null;

	if (node.value == 'S' && canConnect(node, dir)) {
		return {...dir, prev: direction};
	} else {
		return {...dir, prev: direction};
	}
}

function canConnect(from, to) {
	switch(from.value) {
		case 'S':
			switch(to.value) {
				case '|':
				case '-':
				case 'L':
				case 'J':
				case '7':
				case 'F':
					return true;
				default:
					return false;
			}
		case '|':
			switch(to.value) {
				case 'L':
					return true;
				default:
					return false;
			}
	}
}

function getPossibleDirections(node) {
	let possible = [];
	// Is this an S node, check all directions
	if (getDirection(node, 'N')) {
		possible.push(getDirection(node, 'N'));
	}

	if (getDirection(node, 'S')) {
		possible.push(getDirection(node, 'S'));
	}

	if (getDirection(node, 'E')) {
		possible.push(getDirection(node, 'E'));
	}

	if (getDirection(node, 'W')) {
		possible.push(getDirection(node, 'W'));
	}

	return possible;
}

function visualize(map, cursor = null) {
	let counter = 4;

	for(let y = 0; y <= counter; y++) {
		let line = '';
		for (let x = 0; x <= counter; x++) {
			if (cursor !== null && cursor.x == x && cursor.y == y) {
				line += highlight(cursor.value);
			} else {
				line += map.filter(e => e.x == x && e.y == y)[0].value;
			}
		}

		console.log(line);
	}
}