const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

let section = [];
let sections = [];
let lowestLocation = 9999999999999999;

lineReader.onLine(l => {
	if (l == '') {
		sections.push(section);
		section = [];
	} else {
		let digits = l.match(/[0-9]+/g);
		if (digits == null)
			// Add title if needed
			// section.push(l);
			return;
		else
			section.push(digits.map(e => parseInt(e)));
	}
});

lineReader.onClose(() => {
	// Add the latest section
	sections.push(section);

	// Setup seeds
	seeds = sections[0][0];
	maps = sections.slice(1);

	// Part 1
	getLowestLocation(seeds);
	console.log("Part 1:", lowestLocation);

	// Part 2
	let ranges = [];
	lowestLocation = 9999999999999999;
	for (let i = 0; i < seeds.length; i += 2) {
		ranges = [];
		console.log(seeds[i], seeds[i + 1]);
		for (let y = 0; y < seeds[i + 1]; y++) {
			getLowestLocation([seeds[i] + y]);
		}
	}

	console.log("Part 2:", lowestLocation);
});

function getLowestLocation(input) {
	console.log(input);
	input.forEach(s => {
		let location = getLocation(maps, s);
		if (location < lowestLocation) lowestLocation = location;
	});
}

function getIndexInMap(map, seed) {
	let found = seed;

	map.forEach(m => {
		let dest = m[0];
		let src = m[1];
		let rang = m[2];

		if (seed >= src && seed <= src + rang && found == seed) {
			found = seed + (dest - src);
		}
	});

	return found;
}

function getLocation(maps, index) {
	let location = index;

	maps.forEach(m => {
		location = getIndexInMap(m, location);
	});

	return location;
}