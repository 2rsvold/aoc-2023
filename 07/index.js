const createLineReader = require('../lib/reader.js');
const lineReader = createLineReader('input.txt');

function getPairs(hand) {
	let result = [];
	hand = hand.split('');

	hand.forEach(e => {
		if (result.filter(c => c.card == e).length == 0) {
			result.push({ card: e, count: hand.filter(h => e == h).length });
		}
	});

	// Sort the results
	result.sort((a, b) => {
		if (a.count > b.count) return -1;
		else if (a.count < b.count) return 1;
		else return 0;
	});

	// Contains jokers
	let jokers = result.filter(e => e.card == 'J');
	if (jokers.length !== 0) {
		// Remove jokers, if not all are jokers, and add to the best hand
		if (jokers[0].count != 5) {
			result = result.filter(e => e.card != 'J');
			result[0].count += jokers[0].count;
		}
	}

	result = addValues(result);
	result = addCardNumber(result);
	console.log(result.reduce((a, b) => a.count + b.count, 0));
	console.log(result);
	if (result.reduce((a, b) => a.count + b.count, 0)) console.log("Checksum failed!");

	return result;
}

function addValues(hand) {
	return hand.map(h => {
		if (parseInt(h.card)) return { ...h, value: parseInt(h.card) };

		// 	// Switch numbers
		switch (h.card) {
			case 'A':
			case 'K':
			case 'Q':
			case 'J':
				return { ...h, value: 11 };
			case 'T':
				return { ...h, value: 10 };
		}
	});
}

function addCardNumber(hand) {
	return hand.map(h => {
		return { ...h, number: getCardNumber(h.card) }
	});
}

function getCardNumber(card) {
	if (parseInt(card)) return parseInt(card);

	// 	// Switch numbers
	switch (card) {
		case 'A':
			return 14;
		case 'K':
			return 13;
		case 'Q':
			return 12;
		case 'T':
			return 10;
		case 'J':
			return 1;
	}
}

function getRank(hand) {
	// Five of a kind
	if (hand.length == 1) return 1;

	// Four of a kind
	if (hand[0].count == 4) return 2;

	// Full house
	if (hand[0].count == 3 && hand[1].count == 2) return 3;

	// Three of a kind
	if (hand[0].count == 3) return 4;

	// Two pair
	if (hand[0].count == 2 && hand[1].count == 2) return 5;

	// One pair
	if (hand[0].count == 2) return 6;

	// No other combination results in highcard
	return 7;
}

function sortSameRankByHand(a, b) {
	let result = 0;
	a = a.split('');
	b = b.split('');
	a.forEach((v, k) => {
		// The values are the same, move on
		if (v == b[k]) return;

		if (result == 0) {
			if (getCardNumber(v) > getCardNumber(b[k])) {
				result = 1;
			} else {
				result = -1;
			}
		}
	});

	return result;
}

function sortRank(match) {
	match.sort((a, b) => {
		if (a.rank < b.rank) {
			return 1;
		} else if (a.rank > b.rank) {
			return -1;
		} else {
			// They are equal
			console.log("Same hand:", a, b);
			return sortSameRankByHand(a.hand, b.hand);
		}
	});

	return match;
}

let match = [];
lineReader.onLine(l => {
	l = l.split(' ');
	let pairs = getPairs(l[0]);
	let rank = getRank(pairs);
	match.push({ rank: rank, hand: l[0], bid: parseInt(l[1]) });
});

function totalWinnings(matches) {
	let total = 0;
	matches.forEach((m, k) => {
		total += m.bid * (k + 1);
	});

	return total;
}

lineReader.onClose(() => {
	match = sortRank(match);
	console.log(totalWinnings(match));
});