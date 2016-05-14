/*

Main menu with selection between:
Single player
	Player vs computer
	Player vs 2-3 computers, possible teams
	Player vs no one (peaceful)
Local multi player
	Player vs player
	Three players (with possible 1 computer)
	Four players (with possible 1-2 computers)
	Player vs player on separate islands (peaceful)

After selection load pre-created island or generate new island
For random generation can select: size, shape (round, bay, twin, jagged, thin),
	climate (grassy, forested, rocky, desert)
Load development options based on pre-created island choice or randomly select new 
	options
Player who moves first is randomly selected
First player chooses where to place their base camp
Second player chooses where to place their base camp, then begins first month
First month only has base camp avaialble with 1 Food and 1 Material
Turns work like this:
	Three developments are randomly selected and become active
	Active developments can be used, can give additional actions
	If an additional action is given, an unused development is randomly selected
	Developments which have been used cannot be re-used until next month
		Development effects (for now) have these possibilites:
		-Resources / +Resources
		Destroy a developments
		Build a development
		Build a development irregardless of distance
		For remainer of month, other developments effects are changed
		Copy the effect of an adjacent development
		Some allow the user a choice between multiple effects
	Once all developments are used up or the player passes, the player can build
	Building is unlimited, but consumes Food/Material/Treasure
		Building should be done with a function that takes option and cost variables
		Option can be the normal set for the game, could be something specific (if triggered
		by a development effect)
		Cost (for now) could only be normal or none (if triggered by a development effect)
		Normally, developments can only be built next to existing developments
		Some developments require special action to build
		Can build a ship, which sails away
	Once building is finished, the player's month is over
The gave ends after month ten
The player with the most ships built wins
In the case of a tie, the player with the most treasures wins, then materials, then food

*/

enum eSIZE { Small, Medium, Large, Gigantic }

enum eSHAPE { Round, Bay, Twin, Jagged, Thin }

enum eCLIMATE { Grassy, Forested, Rocky, Desert, Varied }

enum eLAND { Grassy, Shore, Forested, Rocky, Desert }

class Hex {
	// Defines the graphical height/width of all hexagons in game
	height: number;
	width: number;

	// Axial column and axial row define individual hexagon position
	axialRow: number;
	axialCol: number;
	hexID: string;

	constructor(setPos: [number, number]) {
		this.axialRow = setPos[0];
		this.axialCol = setPos[1];
		this.hexID = setPos[0] + "," + setPos[1];
	}

	// method to return the expected hexID of the instance's six neighbors.  Non-existant
	//  hexIDs are included in this.  The method starts with the horizontal-right nieghbor
	//  and proceeds clockwise
	getNeighbors() {
		let aNeighbors = [];
		aNeighbors[0] = [this.axialRow, (this.axialCol+1)];
		aNeighbors[1] = [(this.axialRow+1), this.axialCol];
		aNeighbors[2] = [(this.axialRow+1), (this.axialCol-1)];
		aNeighbors[3] = [this.axialRow, (this.axialCol-1)];
		aNeighbors[4] = [(this.axialRow-1), this.axialCol];
		aNeighbors[5] = [(this.axialRow-1), (this.axialCol+1)];
		return aNeighbors;
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
	development: number = 0;
	ownedBy: number = 0;
}

var playerIncrement = 0; // Global incrementing variable used to set playerID
class Player {
	// playerID is defined as a defacto default, playerOrder is determined by a coin 
	//  toss analogue and is used in practice for the rest of the game
	playerID: number;
	playerOrder: number = 0;
	food: number = 2;
	material: number = 2;
	treasure: number = 0;
	ships: number = 0;
	activeEffects: string;
	canClick: boolean = false;

	constructor() {
		this.playerID = playerIncrement;
		playerIncrement ++;
	}
}

class Land {
	lSize: number;
	lShape: number;
	lClimate: number;
	tileArray: Tile[][];

	constructor(setSize: number, setShape: number, setClimate: number) {
		this.lSize = setSize;
		this.lShape = setShape;
		this.lClimate = setClimate;
	}

	debugLand() {
		console.log("This island's numbers are: " + this.lSize + " + " + this.lShape + 
			" + " + this.lClimate);
	}

	describeLand() {
		console.log("This island is " + eSIZE[this.lSize] + ", " + eSHAPE[this.lShape] + 
			", and " + eCLIMATE[this.lClimate]);
	}

	readLand() {
		// Read land tile data from json file

	}

	generateLand() {
		// Procedurally generatre land tiles based on selected land properties

	}

	genTestLand() {
		// Generate a small debug land
		let landWidth = 3;

	}
}

// Set up pixi.js
// Create an new instance of a pixi stage with a grey background
var stage = new PIXI.Stage(0x888888);
// Create a renderer instance width=640 height=480
var renderer = PIXI.autoDetectRenderer(640,480);
// Importing a texture atlas
var tileAtlas = ["images.json"];
var loader = new PIXI.AssetLoader(tileAtlas);
var gameContainer = new PIXI.DisplayObjectContainer();
stage.addChild(gameContainer);
document.body.appendChild(renderer.view);
// Use callback
loader.onComplete = onTilesLoaded
loader.load();


var littleLand = new Land(eSIZE.Small, eSHAPE.Round, eCLIMATE.Varied);
littleLand.tileArray = [];
littleLand.tileArray[0] = [];
littleLand.tileArray[0][0] = new Tile([7, 7]);
littleLand.tileArray[-1] = [];
littleLand.tileArray[-1][6] = new Tile([-1, 6]);
console.log(littleLand.tileArray[0][0].getNeighbors());
console.log(littleLand.tileArray[-1][6].getNeighbors());