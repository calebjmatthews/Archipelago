/// <reference path="references.ts" />

var playerIncrement = 0; // Global incrementing variable used to set playerID
class Player {
	// playerID is defined as a de facto default, playerOrder is determined by a coin 
	//  toss analogue and is used in practice for the rest of the game
	playerID: number;
	playerOrder: number = 0;
	food: number = 2;
	material: number = 2;
	treasure: number = 0;
	ships: number = 0;
	territory: number[] = [];
	ownedDevs: number[]= [];
	deck: number[] = [];
	hand: number[] = [];
	discard: number[] = [];
	trash: number[] = [];
	activeEffects: string;

	constructor() {
		this.playerID = playerIncrement;
		playerIncrement ++;
	}

	addTerritory(tTileID) {
		let tTile = currLand.tileArray[tTileID];
		tTile.development = glbBuildSel;
		tTile.ownedBy = currPlayer.playerID;
		currPlayer.ownedDevs.push(tTile.development);
		currPlayer.discard.push(tTileID);
		if (!(inArr(this.territory, tTileID))) {
			this.territory.push(tTileID)
		}
		let neighbors = tTile.getNeighbors();
		for (let cNeigh = 0; cNeigh < neighbors.length; cNeigh++) {
			if (!(inArr(this.territory, neighbors[cNeigh]))) {
				this.territory.push(currLand.getID(neighbors[cNeigh]));
				let tNTile = currLand.tileArray[currLand.getID(neighbors[cNeigh])];
				// If the neighboring tile has an ownerless black development, add it to the
				//  territory
				if (tNTile.development != null) {
					if ((develArray[tNTile.development].color === eDCLR.Black) && 
						(tNTile.ownedBy === null))
					tNTile.ownedBy = currPlayer.playerID;
					currPlayer.ownedDevs.push(tNTile.development);
					currPlayer.discard.push(currLand.getID(neighbors[cNeigh]));
				}
			}
		}
	}

	shuffleDeck() {
		if (this.deck.length === 0) {
			this.deck = this.discard;
			this.discard = [];
		}
		// If deck is full/semi-full, add existing discard to deck and empty discard
		else {
			for (let tDiscSpot = 0; tDiscSpot < this.discard.length; tDiscSpot++) {
				this.deck.push(this.discard[tDiscSpot]);
			}
			this.discard = [];
		}

		for (let deckSpot = this.deck.length-1; deckSpot >= 0; deckSpot --) {
			// randDev ← random integer such that 0 ≤ randDev ≤ deckSpot
			let randDev = Math.floor(Math.random() * (deckSpot+1));
			let dsValue = this.deck[deckSpot];
			let rdValue = this.deck[randDev];
			// Exchange values
			this.deck[deckSpot] = rdValue;
			this.deck[randDev] = dsValue;
		}
	}

	drawDev() {
		let removedDev = this.deck[this.deck.length-1];
		this.hand.push(removedDev);

		// Rebuild the deck, excluding the removed card
		let newDeck = [];
		for (let deckSpot = 0; deckSpot < this.deck.length-1; deckSpot++) {
			newDeck[deckSpot] = this.deck[deckSpot];
		}
		this.deck = newDeck;
	}
}