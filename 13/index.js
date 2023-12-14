const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

let reflactions = [[]];
lineReader.onLine((l) => {
	if (l === '') {
		reflactions.push([]);
		return;
	}

	reflactions[reflactions.length-1].push(l.split(''));
});

lineReader.onClose(() => {
	let total = 0;
	reflactions.forEach(r => {
		total += scan(r);
	});

	console.log(total);

	total = 0;
	reflactions.forEach(r => {
		let s = smudge(r);
		s === undefined ? total += scan(r) : total += s;
	});
	
	console.log(total);
});

function smudge(r) {
	for (let y = 0; y < r.length; y++) {
		for (let x = 0; x < r[x].length; x++) {
			let smudge = [...r];
			smudge[y][x] = smudge[y][x] == '.' ? '#' : '.';

			if (scan(smudge) !== undefined) return scan(smudge);
		}
		
		x = 0; // Reset X
	}
}

function scan(current) {
	let reflectionId;

	// Loop horizontal
	for (let i = 0; i < current.length - 1; i++) {
		if (getHorizontal(current, i) == getHorizontal(current, i + 1)) {
			if (verifyHorizontal(current, i, i+1)) reflectionId = i+1;
		}
	}

	if (reflectionId !== undefined) return reflectionId * 100;
	
	// Loop vertical
	for (let i = 0; i < current[0].length - 1; i++) {
		if (getVertical(current, i) == getVertical(current, i + 1)) {
			if (verifyVertical(current, i, i+1)) reflectionId = i+1;
		}
	}

	return reflectionId;
}

function verifyHorizontal (current, i1, i2) {
	return verify(getHorizontal, current, i1, i2);
}

function verifyVertical (current, i1, i2) {
	return verify(getVertical, current, i1, i2);
}

function verify(get, current, i1, i2) {
	let c1 = get(current, i1);
	let c2 = get(current, i2);
	
	// Loop
	let counter = 0;
	while (c1 !== undefined && c2 !== undefined) {
		if (c1 !== c2) return false;

		c1 = get(current, i1 - counter);
		c2 = get(current, i2 + counter);

		counter++;
	}

	return true;
}

function getHorizontal(r, i) {
	if (!r[i]) return undefined;

	return r[i].join('');
}

function getVertical(r, i) {
	if (!r[0][i]) return undefined;

	let result = '';
	r.forEach(e => { result += e[i]; });
	return result;
}