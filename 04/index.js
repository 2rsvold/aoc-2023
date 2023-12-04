const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

let sum = 0;
let sum2 = 0;
let cards = [];
let copies = [];

let iterrations = 0;

lineReader.onLine((l) => {
	cards.push(l);
});

lineReader.onClose(() => {
	cards.forEach((l, k) => {
		let wins = processCard(l);
		sum += Math.floor(Math.pow(2, wins - 1));
	});

	console.log("Result part 1: ", sum);

	copies = [...cards];
	addCopies(0);
});

function addCopies(i) {
	iterrations++;

	// Add original card
	let c = processCard(copies[i]);
	let id = parseInt(copies[i].split(':')[0].replace('Card ', ''));

	// Add a range to the array
	for (let y = 0; y < c; y++) {
		if (cards[id+y] !== undefined) copies.push(cards[id+y]);
	}

	if (copies[i+1] !== undefined) {
		setImmediate(() => addCopies(i+1));
	} else {
		setImmediate(() => {
			console.log("Completed after:", iterrations);
			console.log("Calculating from copies:", copies.length);

			copies.forEach((l) => {
				let wins = processCard(l);
				sum2 += Math.floor(Math.pow(2, wins - 1));
			});
			
			console.log("Result part 2:", sum2);
		});
	}
}

function processCard(l) {
	l = l.split(' | ');
	let winners = l[0].split(/ +|: +/).slice(2);
	let our = l[1].split(/ +|: +/);
	our = our.filter(v => winners.includes(v) );

	return our.length;
}