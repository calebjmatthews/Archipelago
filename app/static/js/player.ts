/// <reference path="references.ts" />

var playerIncrement = 0; // Global incrementing variable used to set playerID
class Player {
	// playerID is defined as a de facto default, playerOrder is determined by a coin 
	//  toss analogue and is used in practice for the rest of the game
	playerID: number;
	playerOrder: number = 0;
	color: number[] = [255, 255, 255];
	food: number = 2;
	material: number = 2;
	treasure: number = 0;
	ships: number = 0;
	territory: number[] = [];
	ownedDevs: number[]= [];
	deck: number[] = [];
	hand: number[] = [];
	inPlay: number[] = [];
	discard: number[] = [];
	trash: number[] = [];
	activeEffects: number[] = [];
	actions: number = 3;
	actionHistory: ArcHistory[] = [];

	constructor() {
		this.playerID = playerIncrement;
		playerIncrement ++;

		if (this.playerID === 0) {
			this.color = [255, 0, 0];
		}
		else if (this.playerID === 1) {
			this.color = [0, 0, 255];
		}
	}

	getResource(resource) {
		if (resource === eCOST.Food) { return this.food; }
		else if (resource === eCOST.Material) { return this.material; }
		else if (resource === eCOST.Treasure) { return this.treasure; }
		else { console.log("Error: Unexpected resource request to Player."); }
	}

	giveResource(resource, amount) {
		if (resource === eCOST.Food) { this.food += amount; }
		else if (resource === eCOST.Material) { this.material += amount; }
		else if (resource === eCOST.Treasure) { this.treasure += amount; }
		else { console.log("Error: Unexpected resource request to Player."); }
	}

	addTerritory(tTileID) {
		let tTile = currLand.tileArray[tTileID];
		tTile.development = glbDevelSel;
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
						(tNTile.ownedBy === null)) {
						tNTile.ownedBy = currPlayer.playerID;
						currPlayer.ownedDevs.push(tNTile.development);
						currPlayer.discard.push(currLand.getID(neighbors[cNeigh]));
					}
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
			// randDev is a random integer such that 0 ≤ randDev ≤ deckSpot
			let randDev = Math.floor(Math.random() * (deckSpot+1));
			let dsValue = this.deck[deckSpot];
			let rdValue = this.deck[randDev];
			// Exchange values
			this.deck[deckSpot] = rdValue;
			this.deck[randDev] = dsValue;
		}
	}

	drawContainer() {
		if ((currPlayer.deck.length === 0) && (currPlayer.discard.length === 0)) {
			return;
		}
		else if (currPlayer.deck.length === 0) {
			currPlayer.shuffleDeck();
			currPlayer.drawDev();
		}
		else {
			currPlayer.drawDev();
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

	discardHand() {
		for (let tHandCard = 0; tHandCard < this.hand.length; tHandCard++) {
			this.discard.push(this.hand[tHandCard]);
		}
		this.hand = [];
	}

	discardInPlay() {
		for (let tPlayCard = 0; tPlayCard < this.inPlay.length; tPlayCard++) {
			this.discard.push(this.inPlay[tPlayCard]);
		}
		this.inPlay = [];
	}

	removeCard(tileID: number) {
		let handSpot: number = null;
		for (let tCard = 0; tCard < this.hand.length; tCard++) {
			if (this.hand[tCard] === tileID) { handSpot = tCard; }
		}
		if (handSpot === null) { console.log("Error: Tile not found in hand."); }

		this.inPlay.push(this.hand[handSpot]);

		let newHand: number[] = this.hand.slice(0, handSpot);
		for (let tCard = (newHand.length + 1); tCard < this.hand.length; tCard++) {
			newHand.push(this.hand[tCard]);
		}
		this.hand = newHand;
	}
}