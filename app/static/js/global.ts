/// <reference path="references.ts" />

// Global gameplay variables
var glbState = edit;
var glbBoundary = 18;
var glbOrigin = [508, 288]; // Approximation of origin until renderer is available
var glbHHeight = 30;
var glbHWidth = 60;
var glbPainting = null;
var glbNumLscps = 6;
var glbNumBlkDevels = 3;
var glbMonth = 0;
var glbBuildSel = null;
var glbTileSelArray = [];

// Initiate visual effect variables
var glbPulseArray = [];

// Enumerates the convention of how hex direction is ordered within this program
enum eHEXD { SouthEast, SouthWest, West, NorthWest, NorthEast, East }

// Enumerates land size options
enum eSIZE { Small, Medium, Large, Gigantic }

// Enumerates land shape options
enum eSHAPE { Round, Bay, Twin, Jagged, Thin }

// Enumerates land climate options
enum eCLIMATE { Grassy, Forested, Rocky, Desert, Varied, Jungle, Wet, Mountain }

// Enumerates landscape types for individual tiles
enum eLSCP { Grassy, Forested, Rocky, Desert, Sea, Shore }

// Enumerates options for developments
enum eDEVEL { Jungle, Freshwater, Cave, BaseCamp, FireCrew, LaborPort, SeasSideParade, 
	TradeHarbor, AuctionHouse, EnvoyHarbor, RicePaddy, BoarRanch, HuntingCamp, 
	SmokeHouse, PeachOrchard, Woodcutters, SilverMine, StoneQuarry, CharcoalFurnace, 
	CobaltMine, WorkerVillage, TeaHouse, Demolition, ShepherdVillage, Town, 
	MerchantShip, VentureShip, WorkmanShip, OpulentVessel, AbundantVessel, SteadyVessel };

// Enumerates development color options
enum eDCLR { Black, Blue, Green, Orange, Red, Violet }

// Enumerates development costs
enum eCOST { Food, Material, Treasure, DestroyBlue, DestroyGreen, DestroyOrange }

// Enumerates the requirement of development effects
enum eREQ { Food, Material, Treasure, Ship, Active, Destroy }

// Enumerates the result of development effects
enum eRES { Food, Material, Treasure, Ship, Active, Destroy, BlueTreasure, RedActive }

// ~~~~ General purpose functions ~~~~
	function rgbToHclr(rgb: number[]) {
		let result = [];
		for (let iii=0; iii<3; iii++) {
			let hClr = rgb[iii].toString(16);
			result[iii] = hClr.length == 1 ? "0" + hClr : hClr;
		}
		return parseInt("0x" + result[0] + result[1] + result[2]);
	}

	function inArr(array: any[], query: any) {
		if (array === undefined) {
			return false;
		}
		else if (array === null) {
			return false;
		}
		else if (array === []) {
			return false;
		}
		for (let iii=0; iii < array.length; iii++) {
			if (array[iii] === query) {
				return true;
			}
		}
		return false;
	}

// ~~~~ Hex functions ~~~~

	function hexToCube(tHex: [number, number]) {
		let axialRow = tHex[0]; let axialCol = tHex[1];
		let zPos = axialCol;
		let xPos = axialRow;
		let yPos = -xPos - zPos;
		return [xPos, yPos, zPos];
	}

	function cubeToHex(tCube: number[]) {
		let xPos = tCube[0]; let yPos = tCube[1]; let zPos = tCube[2];
		let axialCol = xPos;
		let axialRow = zPos;
		return [axialRow, axialCol];
	}

	function cubeRound(tCube: number[]) {
		let xPos = tCube[0]; let yPos = tCube[1]; let zPos = tCube[2];
		let rX = Math.round(xPos);
		let rY = Math.round(yPos);
		let rZ = Math.round(zPos);

		let xDiff = Math.abs(rX - xPos);
		let yDiff = Math.abs(rY - yPos);
		let zDiff = Math.abs(rZ - zPos);

		if ((xDiff > yDiff) && (xDiff > zDiff)) {
			rX = -rY - rZ;
		} 
		else if (yDiff > zDiff) {
			rY = -rX - rZ;
		} 
		else {
			rZ = -rX - rY;
		}
		return [rX, rY, rZ];
	}

	function hexRound(tHex: [number, number]) {
		let tCube = hexToCube(tHex);
		let roundedCube = cubeRound(tCube);
		let roundedHex = cubeToHex(roundedCube);
		return roundedHex;
	}

	// Function to convert a hex poision into an anchor point for a tile sprite
	function hexToPoint(tHex: number[]) {
		let axialRow = tHex[0]; let axialCol = tHex[1];

		// Set sprite width and height, to accomidate for pixel rounding?
		let sWidth = glbHWidth;
		let sHeight = glbHHeight * 1.15;
		let xPos = this.glbOrigin[0] + ((sWidth/2) * 1.5 * axialRow) - sWidth/2;
		let yPos = this.glbOrigin[1] + 
			((sHeight/2) * Math.sqrt(3) * (axialCol+axialRow/2)) - sHeight/2;
		return [xPos, yPos];
	}

	// Function to convert an x,y point into corresponding hex
	function pointToHex(tPoint: number[]) {
		let xPos = tPoint[0]; let yPos = tPoint[1];

		// Set sprite width and height, to accomidate for pixel rounding?
		let sWidth = glbHWidth;
		let sHeight = glbHHeight * 0.86956522;
		let axialCol = xPos * (2/3) / (sWidth/2);
		let axialRow = (-xPos/6.8 + (Math.sqrt(3)/2) * yPos/2) / (sHeight/2);
		return hexRound([axialRow, axialCol]);
	}

	// Returns an axial coordinate based on a given coordinate, a direction in which
	//  to move, and the magnitude of the movement.
	//  Example: From the point [-2, 2], move South East (i.e. 0) by a magnitude of
	//  3 to return the axial coordinates [1, 2]
	function moveHex(tHex: number[], direction: number, magnitude: number) {
		if (direction === eHEXD.SouthEast) {
			return [(tHex[0]+magnitude), tHex[1]];
		}
		else if (direction === eHEXD.SouthWest) {
			return [(tHex[0]+magnitude), (tHex[1]-magnitude)];
		}
		else if (direction === eHEXD.West) {
			return [tHex[0], (tHex[1]-magnitude)];
		}
		else if (direction === eHEXD.NorthWest) {
			return [(tHex[0]-magnitude), tHex[1]];
		}
		else if (direction === eHEXD.NorthEast) {
			return [(tHex[0]-magnitude), (tHex[1]+magnitude)];
		}
		else if (direction === eHEXD.East) {
			return [tHex[0], (tHex[1]+magnitude)];
		}
		else {
			console.log("Error: Unexpected hex movement direction.");
		}
	}