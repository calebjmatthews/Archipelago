/// <reference path="references.ts" />

class Hex {
	// Defines the graphical height/width of all hexagons in game
	height: number = glbHHeight;
	width: number = glbHWidth;

	scale: number = 0.2;

	// Axial column and axial row define individual hexagon position, parentID stores
	//  the landID for the parent land
	hexID: number;
	parentID: number;
	axialRow: number;
	axialCol: number;

	constructor(arraySpot: number, setPos: [number, number]) {
		this.hexID = arraySpot;
		this.parentID = currLand.landID;
		this.axialRow = setPos[0];
		this.axialCol = setPos[1];
	}

	// Method to return the expected axial coordinates of the instance's six neighbors.  
	//  Axial coordinates of non-existant tiles are included in this.  The method starts 
	//  with the north-east neightbor and proceeds clockwise
	getNeighbors() {
		let aNeighbors = [];
		aNeighbors[0] = [(this.axialRow-1), (this.axialCol+1)];
		aNeighbors[1] = [this.axialRow, (this.axialCol+1)];
		aNeighbors[2] = [(this.axialRow+1), this.axialCol];
		aNeighbors[3] = [(this.axialRow+1), (this.axialCol-1)];
		aNeighbors[4] = [this.axialRow, (this.axialCol-1)];
		aNeighbors[5] = [(this.axialRow-1), this.axialCol];
		return aNeighbors;
	}

	// Method to return the expected axial coordinates of the instance, using the given
	//  radius. Axial coordinates of non-existant tiles are included in this.  The method 
	//  starts with the north-east ring member and proceeds clockwise
	getRing(radius) {
		let ringMembers = [];

		if (radius === 0) {
			console.log ("Error: radius cannot equal 0.");
			return ringMembers;
		}

		// Begin in the North East corner of the ring
		let tAxial = [-radius, radius];
		// Move in six directions, corresponding to the six sides of the ring
		for (var tDirec=0; tDirec < 6; tDirec++) {
			// The number of ring members on each side equals the radius of the ring
			for (var tFace=0; tFace < radius; tFace++) {
				ringMembers.push(tAxial);
				// Move one hex around the current face of the ring
				tAxial = moveHex(tAxial, tDirec, 1);
			}
		}

		return ringMembers;
	}

	// Returns the distance between this Hex and a specified target Hex
	getDistance(targetHex) {
		return (Math.abs(this.axialCol - targetHex.axialCol) + 
						Math.abs(this.axialCol + this.axialRow - 
							targetHex.axialCol - targetHex.axialCol) + 
						Math.abs(this.axialRow - targetHex.axialRow)) / 2;
	}
}

class Tile extends Hex {
	// Landscape and development define the contents of the hexagon, these use Enums
	landscape: number = 0;
	development: number = null;
	ownedBy: number = null;

	reDrawTile() {
		let sprMed = loader.resources["static/img/images.json"].textures;
		let arraySpot = currLand.getID([this.axialRow, this.axialCol]);
		let tSprite = currLand.spriteArray[arraySpot];
		let tDevSpr = currLand.sprDevArray[arraySpot];
		tSprite.texture = sprMed[lscpArray[this.landscape].sprID];
		if (this.development != null) {
			tDevSpr.texture = sprMed[develArray[this.development].sprID];
		}
	}
}