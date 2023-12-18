const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

let border = [{
	value: '#',
	x: 0,
	y: 0,
	color: 'red'
}];

lineReader.onLine((l) => {
	l = l.split(' ');
	let dir = l[0];
	let steps = l[1];
	let color = l[2].replace(/\(|\)|#/g, '');
	let current = { ...border[border.length - 1] };
	current.color = color;

	let instruction = color.split('');
	let direction = instruction[instruction.length - 1];
	instruction.splice(5, 1);
	instruction = parseInt(instruction.join(''), 16);

	steps = instruction;

	switch (direction) {
		case '0':
			dir = 'R';
			break;
		case '1':
			dir = 'D';
			break;
		case '2':
			dir = 'L';
			break;
		case '3':
			dir = 'U';
			break;
		default:
			console.log("ERROR: Unknwon instrution");
	}

	for (let i = 0; i < steps; i++) {
		switch (dir) {
			case 'R':
				current.x++;
				break;
			case 'L':
				current.x--;
				break;
			case 'U':
				current.y--;
				break;
			case 'D':
				current.y++;
				break;
			default:
				console.log("ERROR! Wrong direction!");
		}

		border.push({ ...current });
	}
});

lineReader.onClose(() => {
	border.splice(0, 1);

	setImmediate(() => flood(1, 1));
});

function show(w, l) {
	for (let y = 0; y < l; y++) {
		let line = '';
		for (let x = 0; x < w; x++) {
			let found = border.filter(e => e.x == x && e.y == y);

			let v = found.length == 0 ? '.' : found[0].value;
			line += v;
		}
		console.log(line);
	}
}

function flood(x, y) {
	let found = border.filter(e => e.x == x && e.y == y);

	if (found.length == 0) {
		border.push({
			value: '+',
			x: x,
			y: y
		});

		// Since we flooded, keep on adding floods
		setImmediate(() => {
			flood(x - 1, y);
			flood(x + 1, y);
			flood(x, y - 1);
			flood(x, y + 1);
		});
	} else {
		console.log(border.length);
	}
}