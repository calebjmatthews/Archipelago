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

enum eLAND { Grassy, Shore, Forested, Rocky, Desert, Sea }

// Global gameplay variables
var glbBoundary = 14;
var glbOrigin = [508, 288];
var glbHHeight = 30;
var glbHWidth = 60;
var glbPaintingLand = null;

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

class Hex {
	// Defines the graphical height/width of all hexagons in game
	height: number = 30;
	width: number = 60;

	scale: number = 0.2;

	// Axial column and axial row define individual hexagon position
	axialRow: number;
	axialCol: number;

	constructor(setPos: [number, number]) {
		this.axialRow = setPos[0];
		this.axialCol = setPos[1];
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

	getSpriteId() {
		if (this.landscape === eLAND.Desert) { return "desert.png"; }
		else if (this.landscape === eLAND.Forested) { return "forested.png"; }
		else if (this.landscape === eLAND.Grassy) { return "grassy.png"; }
		else if (this.landscape === eLAND.Rocky) { return "rocky.png"; }
		else if (this.landscape === eLAND.Sea) { return "sea.png"; }
		else if (this.landscape === eLAND.Shore) { return "shore.png"; }
		else { return "hex.png"; }
	}
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
	spriteArray: Sprite[][];

	constructor(sentSettings: [number, number, number]) {
		this.lSize = sentSettings[0];
		this.lShape = sentSettings[1];
		this.lClimate = sentSettings[2];
	}

	readLand() {
		// Read land tile data from json file

	}

	generateLand() {
		// Procedurally generate land tiles based on selected land properties

	}

	genTestLand() {
		// Generate a small debug land
		let landWidth = 2;
		let landTiles = [];
		for (var currWidth = 0; currWidth < landWidth; currWidth ++) {
			// Make grassy center
			if (currWidth === 0) {
				landTiles[0] = [];
				landTiles[0][0] = new Tile([0, 0]);
				landTiles[0][0].landscape = eLAND.Grassy;
			} 
			// Make surrounding shore
			else if (currWidth === 1) {
				let centerNeighbors = landTiles[0][0].getNeighbors();
				for (var currNbr = 0; currNbr < centerNeighbors.length; currNbr++) {
					let tNbr = centerNeighbors[currNbr];
					if (landTiles[tNbr[0]] === undefined) { 
						landTiles[tNbr[0]] = []; 
					}
					landTiles[tNbr[0]][tNbr[1]] = new Tile([tNbr[0], tNbr[1]]);
					landTiles[tNbr[0]][tNbr[1]].landscape = eLAND.Shore;
				}
			}
		}
		// Fill the rest with sea
		for (var currX = (-1*glbBoundary); currX < glbBoundary; currX++) {
			for (var currY = (-1*glbBoundary); currY < glbBoundary; currY++) {
				if (landTiles[currX] === undefined) {
					landTiles[currX] = [];
				}
				if (landTiles[currX][currY] === undefined) {
					landTiles[currX][currY] = new Tile([currX, currY]);
					landTiles[currX][currY].landscape = eLAND.Sea;
				}
			}
		}
		this.tileArray = landTiles;
	}

	displayLand() {
		// Create an intermediate sprite ID alias
		let sprId = loader.resources["static/img/images.json"].textures;
		let lTiles = this.tileArray;
		let landSprites = [];
		for (var currX=(-1 * glbBoundary); currX < glbBoundary; currX++) {
			for (var currY=(-1 * glbBoundary); currY < glbBoundary; currY++) {
				let tTile = lTiles[currX][currY];
				let tSprite = new Sprite(sprId[tTile.getSpriteId()]);

				tSprite.scale.set(tTile.scale, tTile.scale);

				let sPos = hexToPoint([currX, currY]);

				tSprite.position.set(sPos[0], sPos[1]);
				stage.addChild(tSprite);
				if (landSprites[currX] === undefined) {
					landSprites[currX] = [];
				}
				landSprites[currX][currY] = tSprite;
			}
		}
		this.spriteArray = landSprites;
		renderer.render(stage);
	}
}

// ~~~~ Set up pixi.js ~~~~
	// PIXI Aliases
	var Container = PIXI.Container,
	    autoDetectRenderer = PIXI.autoDetectRenderer,
	    loader = PIXI.loader,
	    resources = PIXI.loader.resources,
	    Sprite = PIXI.Sprite,
	    TextureCache = PIXI.utils.TextureCache,
	    Graphics = PIXI.Graphics,
	    Text = PIXI.Text;

	// Create renderer
	var renderer = autoDetectRenderer();
	renderer.backgroundColor = 0x061639;
	renderer.view.style.position = "absolute";
	renderer.view.style.display = "block";
	renderer.autoResize = true;
	renderer.resize(window.innerWidth, window.innerHeight);

	// Apply renderer
	document.body.appendChild(renderer.view);
	var stage = new Container();

	loader
		.add("static/img/images.json")
		.load(onImageLoad);

// Create global Pixi and Tink variables
var tb = null;
// Set the default game state to 'play'
var state = play;
var pointer = null;

let littleLand = new Land([eSIZE.Small, eSHAPE.Round, eCLIMATE.Varied]);
var msgPoint = null;
var msgAxial = null;
var msgLastAx = null;

var buttonArray = [];
function formEditBar() {
	for (var cButton=0; cButton<6; cButton++) {
		let sprId = loader.resources["static/img/images.json"].textures;
		let chosenPng = null;
		let chosenText = null;
		if (cButton === eLAND.Desert) { 
			chosenPng = "desert.png"; 
			chosenText = "Desert";
		}
		else if (cButton === eLAND.Forested) { 
			chosenPng = "forested.png"; 
			chosenText = "Forested";
		}
		else if (cButton === eLAND.Grassy) { 
			chosenPng = "grassy.png"; 
			chosenText = "Grassy";
		}
		else if (cButton === eLAND.Rocky) { 
			chosenPng = "rocky.png"; 
			chosenText = "Rocky";
		}
		else if (cButton === eLAND.Sea) { 
			chosenPng = "sea.png"; 
			chosenText = "Sea";
		}
		else if (cButton === eLAND.Shore) { 
			chosenPng = "shore.png"; 
			chosenText = "Shore";
		}
		else { 
			chosenPng = "hex.png"; }
		let bScale = 0.2;
		buttonArray[cButton] = new Sprite(sprId[chosenPng]);
		tb.makeInteractive(buttonArray[cButton]);
		
		buttonArray[cButton].scale.set(bScale, bScale);
		buttonArray[cButton].position.set((stage.width-340), (20+40*cButton));
		buttonArray[cButton].tap = () => {
			glbPaintingLand = cButton;
			console.log("Clicked the " + cButton + " button.");
		}
		stage.addChild(buttonArray[cButton]);
		let msgLand = new Text((chosenText), {font: "16px sans-serif", fill: "white"});
		msgLand.position.set((stage.width-260), (25+40*cButton));
		stage.addChild(msgLand);		
	}
}

function formDebugBar() {
	// Display text
	msgPoint = new Text(
		("Coords: "),
		{font: "16px sans-serif", fill: "white"}
	);
	msgPoint.position.set((stage.width-280), 20);
	stage.addChild(msgPoint);
	msgAxial = new Text(
		("Hex: "),
		{font: "16px sans-serif", fill: "white"}
	);
	msgAxial.position.set((stage.width-280), 60);
	stage.addChild(msgAxial);
}

function onClick(clkPoint) {

	console.log("The pointer was clicked at: " + clkPoint);
	console.log("Current painting ID: " + glbPaintingLand);
}

function onImageLoad() {

	// Create the Tink instance
	tb = new Tink(PIXI, renderer.view);
	pointer = tb.makePointer();

	// This code runs when the texture atlas has loaded
	littleLand.genTestLand();
	littleLand.displayLand();

	// Create design bar on right
	var designBG = new Graphics();
	designBG.beginFill(0x000000);
	designBG.drawRect(0, 0, 205, (stage.height));
	designBG.endFill();
	designBG.x = stage.width-200;
	designBG.y = 0;
	stage.addChild(designBG);
	formEditBar();

	// Test button positions
	for (var pButton=0; pButton<=5; pButton++) {
		console.log("Button positions: " + buttonArray[pButton].position);
	}
	
	// Start the game loop
	gameLoop();
}

function gameLoop() {

	requestAnimationFrame(gameLoop);

	// Update Tink
	tb.update();

	// Utilize the current game state
	state();

	renderer.render(stage);
}

// Executes on loop when game is in 'play' state
let lastHex = null;
function play() {

	// Edit bar buttons
	for (var pButton=0; pButton<=5; pButton++) {
		buttonArray[pButton].press = () => {
			console.log("Clicked the " + pButton + " button.");
			glbPaintingLand = pButton;
		}
	}
	// Normal cursor when hovering over final edit bar button
	if (pointer.hitTestSprite(buttonArray[5])) {pointer.cursor = "auto";}

	// Click event handling
	let corPoint = [(pointer.x - glbOrigin[0]), (pointer.y - glbOrigin[1])];
	pointer.tap = () => {
		onClick(corPoint);
	}
	pointer.release = () => {
		onClick(corPoint);
	}

	// Highlight hovered hex
	let hovAxial = pointToHex(corPoint);
	if (hovAxial != undefined) {
		if (littleLand.spriteArray[hovAxial[0]] != undefined) {
			if (littleLand.spriteArray[hovAxial[0]][hovAxial[1]] != undefined) {
				if (lastHex != undefined) {
					if (littleLand.spriteArray[lastHex[0]][lastHex[1]] != undefined) {
						littleLand.spriteArray[lastHex[0]][lastHex[1]].tint = 0xffffff;
					}
				}
				littleLand.spriteArray[hovAxial[0]][hovAxial[1]].tint = 0x424949;
				lastHex = hovAxial;
			}
			else {
				if (lastHex != undefined) {
					if (littleLand.spriteArray[lastHex[0]][lastHex[1]] != undefined) {
						littleLand.spriteArray[lastHex[0]][lastHex[1]].tint = 0xffffff;
					}
				}
			}
		}
		else {
			if (lastHex != undefined) {
				if (littleLand.spriteArray[lastHex[0]][lastHex[1]] != undefined) {
					littleLand.spriteArray[lastHex[0]][lastHex[1]].tint = 0xffffff;
				}
			}
		}
	}

	// msgPoint.text = ("Coords: " + corPoint);
	// msgAxial.text = ("Hex: " + hovAxial);
}