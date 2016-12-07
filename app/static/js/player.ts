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
	ownedTiles: number[] = [];
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
			this.color = [242, 58, 48];
		}
		else if (this.playerID === 1) {
			this.color = [66, 134, 244];
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

	addTerritory(tTileId: number) {
		let tTile = currLand.tileArray[tTileId];
		tTile.development = glbDevelSel;
		tTile.ownedBy = currPlayer.playerID;
		currPlayer.ownedTiles.push(tTileId);
		currPlayer.discard.push(tTileId);
		if (!(inArr(this.territory, tTileId))) {
			this.territory.push(tTileId)
		}
		let neighbors = tTile.getNeighbors();
		this.addNeighboringTerritory(tTileId);
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
						this.ownedTiles.push(neighbors[cNeigh]);
						currPlayer.discard.push(currLand.getID(neighbors[cNeigh]));
						this.addNeighboringTerritory(currLand.getID(neighbors[cNeigh]));
						tNTile.reDrawTile();
					}
				}
			}
		}
	}

	addNeighboringTerritory(tTileId: number) {
		let neighbors = currLand.tileArray[tTileId].getNeighbors();
		for (let cNeigh = 0; cNeigh < neighbors.length; cNeigh++) {
			if (!(inArr(this.territory, neighbors[cNeigh]))) {
				this.territory.push(currLand.getID(neighbors[cNeigh]));
			}
		}
	}

	destroyTerritory(tTileId: number) {
		let tTile = currLand.tileArray[tTileId];

		this.remTerritory(tTileId);

		this.trash.push(tTile.development);

		// Remove properties from the tile
		tTile.development = null;
		tTile.reDrawTile();

		// If black developments have become disconnected, remove them from the player's
		//  control
		let neighCoordArray: number[][] = tTile.getNeighbors();
		let neighIdArray: number[] = [];
		for (let iii = 0; iii < neighCoordArray.length; iii++) {
			neighIdArray.push(currLand.getID(neighCoordArray[iii]));
		}
		for (let tId = 0; tId < neighIdArray.length; tId++) {
			let tNeigh = currLand.tileArray[tId];
			if (tNeigh.development != null) {
				if (develArray[tNeigh.development].color === eDCLR.Black) {
					if (!this.checkConnected(tId)) {
						this.remTerritory(tId);
					}
				}
			}
		}
	}

	remTerritory(tTileId) {
		let tTile = currLand.tileArray[tTileId];

		// Remove the development's card from its current location
		if (this.findDev(tTileId) === "hand") {
			this.hand = exclMem(this.hand, tTileId);
			glbSideBar.removeBar();
			glbSideBar.formBar();
		}
		else if (this.findDev(tTileId) === "discard") {
			this.discard = exclMem(this.discard, tTileId);
		}
		else if (this.findDev(tTileId) === "deck") {
			this.deck = exclMem(this.deck, tTileId);
		}
		else {
			console.log("Unexpected destroyed card location.");
		}

		// Rebuild the player's owned tiles, excluding the removed tile
		if (inArr(this.ownedTiles, tTileId)) {
			this.ownedTiles = exclMem(this.ownedTiles, tTileId);
		}

		// Remove any now unconnected tiles from the player's territory
		let neighCoordArray: number[][] = tTile.getNeighbors();
		for (let iii = 0; iii < neighCoordArray.length; iii++) {
			let neighborId = currLand.getID(neighCoordArray[iii]);
			let neighbor = currLand.tileArray[neighborId];
			if (neighbor.ownedBy != this.playerID) {
				if (!this.checkConnected(neighborId)) {
					if (inArr(this.territory, tTileId)) {
						this.territory = exclMem(this.territory, neighborId);
					}
				}
			}
		}

		// Remove properties from the tile
		tTile.ownedBy = null;
	}

	findDev(tTileId) {
		if (inArr(this.hand, tTileId)) { return "hand"; }
		else if (inArr(this.discard, tTileId)) { return "discard"; }
		else if (inArr(this.deck, tTileId)) { return "deck"; }
		else { return "unfound"; }
	}

	// Check whether this development is disconnected from any other developments
	//  controlled by the player
	checkConnected(tileId: number) {
		let neighCoordArray: number[][] = currLand.tileArray[tileId].getNeighbors();
		let neighIdArray: number[] = [];
		for (let iii = 0; iii < neighCoordArray.length; iii++) {
			neighIdArray.push(currLand.getID(neighCoordArray[iii]));
		}
		for (let tId = 0; tId < neighIdArray.length; tId++) {
			let tNeigh: Tile = currLand.tileArray[neighIdArray[tId]];
			if ((tNeigh.development != null) && (tNeigh.ownedBy === this.playerID)) {
				return true;
			}
		}

		return false;
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