const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

const bag = {
	red: 12,
	green: 13,
	blue: 14
}

let sum = 0;
let lowest = 0;

lineReader.onLine((line) => {
	let game = gameAnalyze(line);
	let isPossible = true;

	let fewest = {
		red: 0,
		green: 0,
		blue: 0
	}

	game.sets.forEach((e) => {
		if (e.red > bag.red || e.green > bag.green || e.blue > bag.blue) {
			isPossible = false;
		}

		if (e.red > fewest.red) fewest.red = e.red;
		if (e.green > fewest.green) fewest.green = e.green;
		if (e.blue > fewest.blue) fewest.blue = e.blue;
	});

	// Part 1
	if (isPossible) sum += game.id;
	
	// Part 2
	let power = fewest.red * fewest.green * fewest.blue;
	lowest += power;
});

lineReader.onClose(() => {
	console.log("Part one:", sum);
	console.log("Part two:", lowest);
});

function gameAnalyze(line) {
	let content = line.split(': ');
	let id = content[0];
	let sets = content[1].split('; ');

	let game = {
		id: parseInt(id.split(' ')[1]),
		sets: []
	}

	// Split and count set
	sets.forEach(set => {
		let result = {
			red: 0,
			green: 0,
			blue: 0
		};

		// Read each entry
		set.split(', ').forEach((e) => {
			let entry = e.split(' ');
			result[entry[1]] += parseInt(entry[0]);
		});

		// Add to final object
		game.sets.push(result);
	});

	return game;
}