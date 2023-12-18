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
	let color = l[2].replace(/\(|\)/g, '');
	let current = { ...border[border.length - 1] };
	current.color = color;

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

	show(100, 110);
});

function show(w, l) {
	for (let y = 0; y < l; y++) {
		let line = '';
		for (let x = 0; x < w; x++) {
			let found = border.filter(e => e.x == x && e.y == y);

			let v = found.length == 0 ? '.' : '#';
			line += v;
		}
		console.log(line);
	}
}