const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

const bag = {
	red: 12,
	green: 13,
	blue: 14
}

let sum = 0;

lineReader.onLine((line) => {
	let game = gameAnalyze(line);
	let isPossible = true;

	game.sets.forEach((e) => {
		if (e.red > bag.red || e.green > bag.green || e.blue > bag.blue) {
			isPossible = false;
			console.log(game.id, 'not possible!');
		}
	});

	if (isPossible) sum += game.id;
});

lineReader.onClose(() => {
	console.log(sum);;
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

/*
{
	id: 1,
	sets: [[{
		color: blue,
		amount: 12
	}, {
		color: red,
		amount: 12
	}], [
		co
	]]
}
*/