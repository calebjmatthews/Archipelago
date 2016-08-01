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
	canClick: boolean = false;
	activeSprArray: Sprite[] = [];

	constructor() {
		this.playerID = playerIncrement;
		playerIncrement ++;
	}

	addTerritory(tTileID) {
		let tTile = currLand.tileArray[tTileID];
		if (!(inArr(this.territory, tTileID))) {
			this.territory.push(tTileID)
		}
		let neighbors = tTile.getNeighbors();
		for (let cNeigh = 0; cNeigh < neighbors.length; cNeigh++) {
			if (!(inArr(this.territory, neighbors[cNeigh]))) {
				this.territory.push(neighbors[cNeigh]);
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

	// Returns the x,y position of the active hexagon button
	getActivePos(activeSpot) {
		let xPos = 0;
			let yPos = 0;
			if ((activeSpot % 3) === 0) {
				xPos = 100 - (glbHWidth / 2);
				// Y positioning uses hex width in order to create an even margin on  both 
				//  top and sides
				yPos = (glbHWidth / 2) + (((activeSpot*1.3)/3) * glbHHeight);
			}
			else if (((activeSpot-1) % 3) === 0) {
				xPos = 100 - glbHWidth - (glbHWidth/2);
				yPos = 110 - glbHHeight - (glbHWidth / 2) + 
					((((activeSpot-1)*1.3)/3) * glbHHeight);
			}
			else if (((activeSpot-2) % 3) === 0) {
				xPos = 100 + (glbHWidth/2);
				yPos = 110 - glbHHeight - (glbHWidth / 2) + 
					((((activeSpot-2)*1.3)/3) * glbHHeight);
			}
			else {
				console.log("Error, unexpected development hand value.");
			}
			// Corect for position of sidebar
			xPos = renderer.width - 200 + xPos;

			return [xPos, yPos];
	}

	displayActives() {
		let numActives = 0;
		if (this.hand.length = 3) {
			numActives = 3;
		}
		else { numActives = this.hand.length; }

		for (let activeSpot = 0; activeSpot < numActives; activeSpot++) {
			
			let tSprite = new Sprite(sprMed["whitehex.png"]);
			tSprite.scale.set(0.2, 0.2);
			let sprPos = currPlayer.getActivePos(activeSpot);
			tSprite.position.set(sprPos[0], sprPos[1]);
			stage.addChild(tSprite);
			this.activeSprArray[activeSpot] = tSprite;
		}
	}

	inActiveHex(activePos, corPoint) {
		// 1. Is the point within the possible range of any active hex?
		// 2. Is the point in this hex's bounding box?
		// 3. Which quadrant?  If not in upper right, translate point to upper right
		// 4. Is it outside the rectangular portion?
		// 5. Is it in the triangular point segment?
		// A "no" to any step (other than 3) ends the function and returns false

		// Is the cursor point within the hex's bounding box?
		if ((corPoint[0] > activePos[0]) && (corPoint[0] < (activePos[0] + glbHWidth)) && 
				(corPoint[1] > activePos[1]) && (corPoint[1] < (activePos[1] + glbHHeight))) {
			return currPlayer.inActiveRect(activePos, corPoint);
		}
		else { return false; }
	}

	inActiveRect(activePos, corPoint) {
		// Which quadrant?  If not in upper right, translate point to upper right
		let diffX = Math.abs((activePos[0] + (glbHWidth/2)) - corPoint[0]);
		let diffY = Math.abs((activePos[1] + (glbHHeight/2)) - corPoint[1]);
		// Is the point within the rectangular segment?
		if (diffX < ((glbHWidth/2) - (glbHHeight/2))) {
			return true;
		}
		else {
			return currPlayer.inActiveTri(diffX, diffY);
		}
	}

	inActiveTri(diffX, diffY) {
		// Is the point within the triangular segment?
		// Begin by mirroring the x point horizontally
		let mirrX = (glbHHeight/2) - diffY;
		if (mirrX > diffY) { return true; }
		else { return false; }
	}
}