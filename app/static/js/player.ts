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
		if (this.deck === []) {
			this.deck = this.discard;
			this.discard = [];
		}
		else {
			// Full/semi-full deck shuffling code to be added
		}

		for (let deckSpot = this.deck.length-1; deckSpot > 0; deckSpot --) {
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

	displayActives() {
		let sprMed = loader.resources["static/img/images.json"].textures;

		let numActives = 0;
		if (this.hand.length < 3) {
			numActives = 3;
		}
		else { numActives = this.hand.length; }

		for (let activeSpot = 0; activeSpot < numActives; activeSpot++) {
			let xPos = 0;
			let yPos = 0;
			if ((activeSpot % 3) === 0) {
				xPos = 100 - (glbHWidth / 2);
				// Y positioning uses hex width in order to create an even margin on  both 
				//  top and sides
				yPos = 100 - (glbHWidth / 2) + ((activeSpot/3) * glbHHeight);
			}
			else if (((activeSpot-1) % 3) === 0) {
				xPos = 100 - glbHWidth - (glbHWidth/2);
				yPos = 100 - glbHHeight - (glbHWidth / 2) + 
					(((activeSpot-1)/3) * glbHHeight);
			}
			else if (((activeSpot-2) % 3) === 0) {
				xPos = 100 + (glbHWidth/2);
				yPos = 100 - glbHHeight - (glbHWidth / 2) + 
					(((activeSpot-2)/3) * glbHHeight);
			}
			else {
				console.log("Error, unexpected development hand value.");
			}
			// Corect for position of sidebar
			xPos = renderer.width - 200 + xPos;

			
			let tSprite = new Sprite(sprMed["whitehex.png"]);
			tSprite.scale.set(0.2, 0.2);
			tSprite.position.set(xPos, yPos);
			stage.addChild(tSprite);
			this.activeSprArray[activeSpot] = tSprite;
		}
	}
}