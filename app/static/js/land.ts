/// <reference path="references.ts" />

var landIncrement = 0; // Global incrementing variable used to set landID
class Land {
	landID: number;
	lSize: number;
	lShape: number;
	lClimate: number;
	tileArray: Tile[];
	spriteArray: Sprite[];
	sprDevArray: Sprite[];

	constructor(sentSettings: [number, number, number]) {
		this.landID = landIncrement;
		landIncrement ++;
		this.lSize = sentSettings[0];
		this.lShape = sentSettings[1];
		this.lClimate = sentSettings[2];
	}

	// Returns the tile's place in the array (tileID) given its row and column position
	getID(givPos: number[]) {
		for (var cTile = 0; cTile < this.tileArray.length; cTile++) {
			if ((this.tileArray[cTile].axialRow === givPos[0]) &&
					(this.tileArray[cTile].axialCol === givPos[1])) {
				return cTile;
			}
		}
		return null;
	}

	// Returns an array of applicable tileIDs when given a player's territory and
	//  an array of landscape types
	getSel(sTerr: number[], sLscp: number[]) {
		let landWidth = (this.lSize+2)*2;
		let selResult = [];
		for (var ringWidth = 0; ringWidth < (landWidth+12); ringWidth++) {
			var thisRing = [];
			if (ringWidth === 0) { thisRing[0] = [0, 0]; }
			else { thisRing = this.tileArray[0].getRing(ringWidth); }

			for (var ringTile = 0; ringTile < thisRing.length; ringTile++) {
				if (((inArr(sTerr, thisRing[ringTile])) || (sTerr === null)) && 
					(inArr(sLscp, currLand.tileArray[thisRing[ringTile]].landscape))) {
					selResult.push(thisRing[ringTile]);
				}
			}

		}
		return selResult;
	}

	// Read land tile data from json file
	readLand() {

	}

	// Randomly alter an individual tile, based on neighbors and land's climate
	genTileLscp(tileSnapShot: Tile[], axialCoord: number[]) {
		var probArray = [1, 1, 1, 1, 0, 0]; 
		var neighbors = [];
		var seaCount = 0;
		var tTile = this.tileArray[this.getID(axialCoord)];
		neighbors = tTile.getNeighbors();
		for (var tNeigh = 0; tNeigh < neighbors.length; tNeigh++) {
			let tSnapTile = tileSnapShot[this.getID(neighbors[tNeigh])];
			if (tSnapTile === undefined) {
				seaCount++;
			}
			else if (tSnapTile.landscape === eLSCP.Desert) {
				probArray[eLSCP.Desert] += 0.2;
			}
			else if (tSnapTile.landscape === eLSCP.Forested) {
				probArray[eLSCP.Forested] += 0.2;
			}
			else if (tSnapTile.landscape === eLSCP.Grassy) {
				probArray[eLSCP.Grassy] += 0.0;
			}
			else if (tSnapTile.landscape === eLSCP.Rocky) {
				probArray[eLSCP.Rocky] += 0.2;
			}
			else if (tSnapTile.landscape === eLSCP.Sea) {
				seaCount++;
			}
			else {
				console.log("Error, unexpected neighbor landscape type.")
			}
		}

		var probSum = 0;
		for (let iii = 0; iii < 4; iii++) {
			// Multiply the current neighbor probability by the climate's probability
			let climateProb = climateArray[this.lClimate].prob
			probArray[iii] *= climateProb[iii];
			probSum += probArray[iii];
		}

		// If the total of the probabilities is above 0.5, adjust downwards
		if (probSum >= 0.15) {
			for (let jjj = 0; jjj < 4; jjj++) {
				probArray[jjj] *= (0.15 / probSum);
			}
		}

		// If a non-sea tile borders the sea, calculate probability of change (n/6/2)
		if ((tTile.landscape != eLSCP.Sea) && (seaCount > 0)) {
			if (Math.random() < (seaCount/12)) {
				return eLSCP.Sea;
			}
		}

		// If a sea tile borders the land, calculate probability of change (6-n/6/2)
		else if (tTile.landscape === eLSCP.Sea) {
			if (Math.random() > (((6-seaCount)/6) * 0.5)) {
				return eLSCP.Sea;
			}
		}

		// Use the probability array to determine the tile's landscape fate
		probSum = 0;
		var rand = Math.random();
		for (var tLSCP=0; tLSCP < 4; tLSCP++) {
			probSum += probArray[tLSCP];
			if (rand < probSum) {
				return tLSCP;
			}
		}
		// If the above for-loop does not trigger a return, give the original landscape
		return tTile.landscape;
	}

	genTileDev(tileSnapShot: Tile[], axialCoord: number[]) {
		var tTile = this.tileArray[this.getID(axialCoord)];
		var neighbors = [];
		neighbors = tTile.getNeighbors();
		var clustered = false;

		// If there are two similar landscapes clustered together, allow the possibility of
		//  a black development
		for (var tNeigh = 0; tNeigh < neighbors.length; tNeigh++) {
			let tSnapTile = tileSnapShot[this.getID(neighbors[tNeigh])];
			if (tSnapTile != undefined) {
				if (tSnapTile.landscape === tTile.landscape) {
					clustered = true;
				}
			}
		}

		if ((clustered) && (lscpArray[tTile.landscape].black != null)) {
			if (Math.random() < climateArray[this.lClimate].devel) {
				return lscpArray[tTile.landscape].black;
			}
		}
	}

	genShore(landWidth: number) {
		for (var stepWidth = 0; stepWidth < (landWidth+12); stepWidth++) {
			var thisRing = [];
			if (stepWidth === 0) { thisRing[0] = [0, 0]; }
			else { thisRing = this.tileArray[0].getRing(stepWidth); }

			for (var ringTile = 0; ringTile < thisRing.length; ringTile++) {
				let tTile = this.tileArray[this.getID(thisRing[ringTile])];
				let neighbors = []; 
				neighbors = tTile.getNeighbors();
				let bordersSea = false;
				// Check to see if any of the six neighbors are sea
				for (let cNeigh = 0; cNeigh < neighbors.length; cNeigh++) {
					if ((this.tileArray[this.getID(neighbors[cNeigh])] === undefined) || 
						(this.tileArray[this.getID(neighbors[cNeigh])].landscape === eLSCP.Sea)) {
						bordersSea = true;
					}
				}
				// If at least one is sea, and the tile is grassy or desert, make it into shore
				if (((bordersSea) && (tTile.landscape === eLSCP.Grassy)) || 
						((bordersSea) && (tTile.landscape === eLSCP.Desert))) {
					this.tileArray[this.getID(thisRing[ringTile])].landscape = eLSCP.Shore;
				}
			}

		}
	}

	// Modification to each tile in a series of rings, performed multiple times
	genLandStep(landWidth: number) {
		var tileSnapShot = this.tileArray;
		for (var stepWidth = 0; stepWidth < (landWidth+12); stepWidth++) {
			var thisRing = [];
			if (stepWidth === 0) { thisRing[0] = [0, 0]; }
			else { thisRing = this.tileArray[0].getRing(stepWidth); }

			for (var ringTile = 0; ringTile < thisRing.length; ringTile++) {
				let result = this.genTileLscp(tileSnapShot, thisRing[ringTile]);
				this.tileArray[this.getID(thisRing[ringTile])].landscape = result;
			}

		}
	}

	genDevStep(landWidth: number) {
		var tileSnapShot = this.tileArray;
		for (var stepWidth = 0; stepWidth < (landWidth+12); stepWidth++) {
			var thisRing = [];
			if (stepWidth === 0) { thisRing[0] = [0, 0]; }
			else { thisRing = this.tileArray[0].getRing(stepWidth); }

			for (var ringTile = 0; ringTile < thisRing.length; ringTile++) {
				let result = this.genTileDev(tileSnapShot, thisRing[ringTile]);
				this.tileArray[this.getID(thisRing[ringTile])].development = result;
			}

		}
	}

	// Procedurally generate land tiles based on selected land properties
	generateLand() {
		let landWidth = (this.lSize+2)*2;
		let landTiles = [];
		let tileCounter = 0;

		// Create grass/sea template
		for (var currWidth = 0; currWidth < (landWidth+12); currWidth++) {
			// Make grassy center
			if (currWidth === 0) {
				landTiles[0] = new Tile(0, [0, 0]);
				landTiles[0].landscape = eLSCP.Grassy;
				tileCounter++;
			}
			else{
				let thisRing = landTiles[0].getRing(currWidth);
				for (var ringTile = 0; ringTile < thisRing.length; ringTile++) {
					landTiles[tileCounter] = new Tile(tileCounter, thisRing[ringTile]);
					if (currWidth <= landWidth) {
						landTiles[tileCounter].landscape = eLSCP.Grassy;
					}
					else {
						landTiles[tileCounter].landscape = eLSCP.Sea;
					}
					tileCounter++;
				}
			}
		}

		this.tileArray = landTiles;

		// Step through templated tiles, modifying landscape and black development
		for (var tStep = 0; tStep < 5; tStep++) {
			this.genLandStep(landWidth);
		}
		this.genShore(landWidth);
		this.genDevStep(landWidth);
	}

	genTestLand() {
		// Generate a small debug land
		let landWidth = 3;
		let landTiles = [];
		let tileCounter = 0;
		for (var currWidth = 0; currWidth < (landWidth+12); currWidth ++) {
			// Make grassy center
			if (currWidth === 0) {
				landTiles[0] = new Tile(0, [0, 0]);
				landTiles[0].landscape = eLSCP.Grassy;
				tileCounter++;
			}
			else{
				let thisRing = landTiles[0].getRing(currWidth);
				for (var ringTile=0; ringTile < thisRing.length; ringTile++ ) {
					landTiles[tileCounter] = new Tile(tileCounter, thisRing[ringTile]);
					if (currWidth < landWidth) {
						landTiles[tileCounter].landscape = eLSCP.Grassy;
					}
					else if (currWidth === landWidth) {
						landTiles[tileCounter].landscape = eLSCP.Shore;
					}
					else {
						landTiles[tileCounter].landscape = eLSCP.Sea;
					}
					tileCounter++;
				}
			}
		}

		this.tileArray = landTiles;
	}

	displayLand() {
		// Create an intermediate sprite ID alias
		let sprMed = loader.resources["static/img/images.json"].textures;
		let lTiles = this.tileArray;
		let landSprites = [];
		let landDevSprs = [];
		for (var currX=(-1 * glbBoundary); currX < glbBoundary; currX++) {
			for (var currY=(-1 * glbBoundary); currY < glbBoundary; currY++) {
				let arraySpot = this.getID([currX, currY]);
				if (arraySpot != null) {
					let tTile = lTiles[arraySpot];
					let tSprite = new Sprite(sprMed[lscpArray[tTile.landscape].sprID]);
					tSprite.scale.set(tTile.scale, tTile.scale);

					let sPos = hexToPoint([currX, currY]);
					tSprite.position.set(sPos[0], sPos[1]);

					let tDevSpr = null;
					// If there is no development for this tile, insert an empty hex as placeholder
					if (tTile.development === undefined) {
						tDevSpr = new Sprite(sprMed["tallhex.png"]);
					}
					else {
						tDevSpr = new Sprite(sprMed[develArray[tTile.development].sprID[0]]);
					}
					tDevSpr.scale.set(tTile.scale, tTile.scale);
					let sdPos = hexToPoint([currX, currY]);
					tDevSpr.position.set(sdPos[0], (sdPos[1] - glbHHeight));

					stage.addChild(tSprite);
					landSprites[arraySpot] = tSprite;
					stage.addChild(tDevSpr);
					landDevSprs[arraySpot] = tDevSpr;
				}
			}
		}
		this.spriteArray = landSprites;
		this.sprDevArray = landDevSprs;
		renderer.render(stage);
	}
}