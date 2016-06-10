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
		Destroy a development
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
The game ends after month ten
The player with the most ships built wins
In the case of a tie, the player with the most treasures wins, then materials, then food

*/

// Global gameplay variables
var glbBoundary = 14;
var glbOrigin = [508, 288];
var glbHHeight = 30;
var glbHWidth = 60;
var glbPainting = null;
var glbNumLscps = 6;
var glbNumBlkDevels = 3;

// Enumerates the convention of how hex direction is ordered within this program
enum eHEXD { SouthEast, SouthWest, West, NorthWest, NorthEast, East }

// Enumerates land size options
enum eSIZE { Small, Medium, Large, Gigantic }

// Enumerates land shape options
enum eSHAPE { Round, Bay, Twin, Jagged, Thin }

// Enumerates land climate options
enum eCLIMATE { Grassy, Forested, Rocky, Desert, Varied }

// Enumerates landscape types for individual tiles
enum eLSCP { Grassy, Shore, Forested, Rocky, Desert, Sea }

// Enumerates options for developments
enum eDEVEL { Jungle, Freshwater, Cave, FireCrew, LaborPort, SeasSideParade }

// Enumerates development color options
enum eDCLR { Black, Blue, Green, Orange, Red, Violet }

// Enumerates development costs
enum eCOST { Food, Material, Treasure, DestroyBlue, DestroyGreen, DestroyOrange }

// Enumerates the requirement of development effects
enum eREQ { Food, Material, Treasure, Ship, Active, Destroy }

// Enumerates the result of development effects
enum eRES { Food, Material, Treasure, Ship, Active, Destroy, BlueTreasure, RedActive }

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
		tSprite.texture = sprMed[lscpArray[this.landscape].sprID];
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

var landIncrement = 0; // Global incrementing variable used to set landID
class Land {
	landID: number;
	lSize: number;
	lShape: number;
	lClimate: number;
	tileArray: Tile[];
	spriteArray: Sprite[];

	constructor(sentSettings: [number, number, number]) {
		this.landID = landIncrement;
		landIncrement ++;
		this.lSize = sentSettings[0];
		this.lShape = sentSettings[1];
		this.lClimate = sentSettings[2];
	}

	// Returns the tile's place in the array (tileID) given its row and column position
	getID(givPos: [number, number]) {
		for (var cTile = 0; cTile < this.tileArray.length; cTile++) {
			if ((this.tileArray[cTile].axialRow === givPos[0]) &&
					(this.tileArray[cTile].axialCol === givPos[1])) {
				return cTile;
			}
		}
		return null;
	}

	readLand() {
		// Read land tile data from json file

	}

	generateLSCP() {
		// Procedurally generate land tiles based on selected land properties

	}

	genTestLand() {
		// Generate a small debug land
		let landWidth = 2;
		let landTiles = [];
		for (var currWidth = 0; currWidth < landWidth; currWidth ++) {
			// Make grassy center
			if (currWidth === 0) {
				landTiles[0] = new Tile(0, [0, 0]);
				landTiles[0].landscape = eLSCP.Grassy;
			} 
			// Make surrounding shore
			else if (currWidth === 1) {
				let centerNeighbors = landTiles[0].getNeighbors();
				for (var currNbr = 0; currNbr < centerNeighbors.length; currNbr++) {
					let tNbr = centerNeighbors[currNbr];
					landTiles[currNbr+1] = new Tile(currNbr+1, [tNbr[0], tNbr[1]]);
					landTiles[currNbr+1].landscape = eLSCP.Shore;
				}
			}
		}
		// Fill the rest with sea
		for (var currX = (-1*glbBoundary); currX < glbBoundary; currX++) {
			for (var currY = (-1*glbBoundary); currY < glbBoundary; currY++) {
				let currTile = landTiles.length;
				landTiles[currTile] = new Tile(currTile, [currX, currY]);
				landTiles[currTile].landscape = eLSCP.Sea;
			}
		}
		this.tileArray = landTiles;
	}

	displayLand() {
		// Create an intermediate sprite ID alias
		let sprMed = loader.resources["static/img/images.json"].textures;
		let lTiles = this.tileArray;
		let landSprites = [];
		for (var currX=(-1 * glbBoundary); currX < glbBoundary; currX++) {
			for (var currY=(-1 * glbBoundary); currY < glbBoundary; currY++) {
				let arraySpot = this.getID([currX, currY]);
				let tTile = lTiles[arraySpot];
				let tSprite = new Sprite(sprMed[lscpArray[tTile.landscape].sprID]);

				tSprite.scale.set(tTile.scale, tTile.scale);

				let sPos = hexToPoint([currX, currY]);

				tSprite.position.set(sPos[0], sPos[1]);
				stage.addChild(tSprite);
				landSprites[arraySpot] = tSprite;
			}
		}
		this.spriteArray = landSprites;
		renderer.render(stage);
	}
}

class Landcape {
	id: number;
	sprID: string;
	name: string;

	constructor(setID: number, setSprID: string, setName: string) {
		this.id = setID;
		this.sprID = setSprID;
		this.name = setName;
	}
}

var lscpArray = [];
lscpArray[eLSCP.Desert] = new Landcape(eLSCP.Desert, "desert.png", "Desert");
lscpArray[eLSCP.Forested] = new Landcape(eLSCP.Desert, "forested.png", "Forested");
lscpArray[eLSCP.Grassy] = new Landcape(eLSCP.Desert, "grassy.png", "Grassy");
lscpArray[eLSCP.Rocky] = new Landcape(eLSCP.Rocky, "rocky.png", "Rocky");
lscpArray[eLSCP.Sea] = new Landcape(eLSCP.Sea, "sea.png", "Sea");
lscpArray[eLSCP.Shore] = new Landcape(eLSCP.Shore, "shore.png", "Shore");

class Development {
	id: number;
	sprID: string;
	name: string;
	color: number;
	lscpRequired: number[];
	description: string;
	cost: number[];
	requirement: number[];
	result: number[];

	constructor(setID: number, setSprID: string, setName: string, setColor: number,
		setLscpRequired: number[], setDescription: string) {
		this.id = setID;
		this.sprID = setSprID;
		this.name = setName;
		this.color = setColor;
		this.lscpRequired = setLscpRequired;
		this.description = setDescription;
	}
}

var develArray = [];

develArray[eDEVEL.Jungle] = new Development(eDEVEL.Jungle, "jungle.png", 
	"Jungle", eDCLR.Black, [eLSCP.Forested], "No effect");

develArray[eDEVEL.Freshwater] = new Development(eDEVEL.Freshwater, "freshwater.png", 
	"Freshwater", eDCLR.Black, [eLSCP.Grassy], "No effect");

develArray[eDEVEL.Cave] = new Development(eDEVEL.Cave, "cave.png", "Cave", 
	eDCLR.Black, [eLSCP.Rocky], "No effect");

develArray[eDEVEL.FireCrew] = new Development(eDEVEL.FireCrew, "firecrew.png", 
	"Fire Crew", eDCLR.Blue, [eLSCP.Shore], "res: Destroy Development; res: +1 Active");
develArray[eDEVEL.FireCrew].cost = [];
develArray[eDEVEL.FireCrew].cost[eCOST.Material] = 1;
develArray[eDEVEL.FireCrew].requirement = null;
develArray[eDEVEL.FireCrew].result = [];
develArray[eDEVEL.FireCrew].result[eRES.Destroy] = 1;
develArray[eDEVEL.FireCrew].result[eRES.Active] = 1;

develArray[eDEVEL.LaborPort] = new Development(eDEVEL.LaborPort, "laborport.png", 
	"Labor Port", eDCLR.Blue, [eLSCP.Shore], "req: -1 Treasure; res: +3 Actives");
develArray[eDEVEL.LaborPort].cost = [];
develArray[eDEVEL.LaborPort].cost[eCOST.Material] = 1;
develArray[eDEVEL.LaborPort].cost[eCOST.Treasure] = 1;
develArray[eDEVEL.LaborPort].requirement = []
develArray[eDEVEL.LaborPort].requirement[eREQ.Treasure] = 1;
develArray[eDEVEL.LaborPort].result = [];
develArray[eDEVEL.LaborPort].result[eRES.Active] = 3;

develArray[eDEVEL.SeasSideParade] = new Development(eDEVEL.SeasSideParade, 
	"seassideparade.png", "Sea Side Parade", eDCLR.Blue, [eLSCP.Shore], 
	("req: -1 Material; res: For the rest of the month, all Blue developments " + 
		"give an additional +1 Treasure"));
develArray[eDEVEL.SeasSideParade].cost = [];
develArray[eDEVEL.SeasSideParade].cost[eCOST.Food] = 2;
develArray[eDEVEL.SeasSideParade].cost[eCOST.Material] = 2;
develArray[eDEVEL.SeasSideParade].cost[eCOST.Treasure] = 2;
develArray[eDEVEL.SeasSideParade].requirement = []
develArray[eDEVEL.SeasSideParade].requirement[eREQ.Material] = 1;
develArray[eDEVEL.SeasSideParade].result = [];
develArray[eDEVEL.SeasSideParade].result[eRES.BlueTreasure] = 1;

develArray[eDEVEL.Cave].sprID = "hex.png";
develArray[eDEVEL.FireCrew].sprID = "hex.png";
develArray[eDEVEL.Freshwater].sprID = "hex.png";
develArray[eDEVEL.Jungle].sprID = "hex.png";
develArray[eDEVEL.LaborPort].sprID = "hex.png";
develArray[eDEVEL.SeasSideParade].sprID = "hex.png";


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

let littleLSCP = new Land([eSIZE.Small, eSHAPE.Round, eCLIMATE.Varied]);
let currLand = littleLSCP;
var msgPoint = null;
var msgAxial = null;
var msgLastAx = null;

var buttonArray = [];
function formEditBar() {
	// Since the edit bar includes both landscapes and some black developments, the
	//  for loop needs to be compensate for the total number of landscapes when iterating
	//  through black developments
	for (var cButton=0; cButton < (glbNumLscps+glbNumBlkDevels); cButton++) {
		let sprMed = loader.resources["static/img/images.json"].textures;
		var chosenPng = null;
		var chosenText = null;
		if (cButton < glbNumLscps) {
			chosenPng = lscpArray[cButton].sprID;
			chosenText = lscpArray[cButton].name;
		}
		else if ((cButton >= glbNumLscps) && (cButton < (glbNumLscps+glbNumBlkDevels))) {
			chosenPng = develArray[cButton-glbNumLscps].sprID;
			chosenText = develArray[cButton-glbNumLscps].name;
		}
		else {
			console.log("Error: unexpected current button incremental variable.");
			chosenPng = "hex.png"; 
			chosenText = "Error"
		}
		buttonArray[cButton] = new Sprite(sprMed[chosenPng]);
		tb.makeInteractive(buttonArray[cButton]);
		let bScale = 0.2;

		buttonArray[cButton].scale.set(bScale, bScale);
		buttonArray[cButton].position.set((stage.width-340), (20+40*cButton));
		stage.addChild(buttonArray[cButton]);
		let msgLscp = new Text((chosenText), {font: "16px sans-serif", fill: "white"});
		msgLscp.position.set((stage.width-260), (25+40*cButton));
		stage.addChild(msgLscp);
	}

	// Can't use a for loop because press events act like watchers
	buttonArray[eLSCP.Grassy].press = () => { glbPainting = eLSCP.Grassy; }
	buttonArray[eLSCP.Shore].press = () => { glbPainting = eLSCP.Shore; }
	buttonArray[eLSCP.Forested].press = () => { glbPainting = eLSCP.Forested; }
	buttonArray[eLSCP.Rocky].press = () => { glbPainting = eLSCP.Rocky; }
	buttonArray[eLSCP.Desert].press = () => { glbPainting = eLSCP.Desert; }
	buttonArray[eLSCP.Sea].press = () => { glbPainting = eLSCP.Sea; }
	buttonArray[(glbNumLscps + eDEVEL.Cave)].press = () => { 
		glbPainting = glbNumLscps + eDEVEL.Cave; }
	buttonArray[(glbNumLscps + eDEVEL.Freshwater)].press = () => { 
		glbPainting = glbNumLscps + eDEVEL.Freshwater; }
	buttonArray[(glbNumLscps + eDEVEL.Jungle)].press = () => { 
		glbPainting = glbNumLscps + eDEVEL.Jungle; }
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

var acquiredLand = null;
function testAPI() {
	$.get("http://localhost:1234/land/1", function(data) {
		acquiredLand = data;
	});
	console.log(acquiredLand);
}

function onClick(thisLand, clkPoint) {

	let clkAxial = pointToHex(clkPoint);
	let clkTile = thisLand.tileArray[thisLand.getID(clkAxial)];

	if (clkAxial != undefined) {
		if (clkTile != undefined) {
			if ((clkTile.landscape != glbPainting) && 
				(glbPainting != null)) {
				console.log("Current landscape: " + clkTile.landscape);
				clkTile.landscape = glbPainting;
				clkTile.reDrawTile();
			}
		}
	}

}

function onImageLoad() {

	// Create the Tink instance
	tb = new Tink(PIXI, renderer.view);
	pointer = tb.makePointer();

	// This code runs when the texture atlas has loaded
	currLand.genTestLand();
	currLand.displayLand();

	// Create design bar on right
	var designBG = new Graphics();
	designBG.beginFill(0x000000);
	designBG.drawRect(0, 0, 205, (stage.height));
	designBG.endFill();
	designBG.x = stage.width-200;
	designBG.y = 0;
	stage.addChild(designBG);
	formEditBar();
	
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


	// Normal cursor when hovering over final edit bar button
	if (pointer.hitTestSprite(buttonArray[5])) {pointer.cursor = "auto";}

	// Click event handling
	let corPoint = [(pointer.x - glbOrigin[0]), (pointer.y - glbOrigin[1])];
	 if (pointer.isDown === true) {
		onClick(currLand, corPoint);
	}

	// Highlight hovered hex
	let hovAxial = pointToHex(corPoint);
	if (hovAxial != undefined) {
		let hovArraySpot = currLand.getID([hovAxial[0], hovAxial[1]]);
		if (currLand.spriteArray[hovArraySpot] != undefined) {
			if (lastHex != null) {
				let lastArraySpot = currLand.getID([lastHex[0], lastHex[1]]);
				if (currLand.spriteArray[lastArraySpot] != undefined) {
					currLand.spriteArray[lastArraySpot].tint = 0xffffff;
				}
			}
			currLand.spriteArray[hovArraySpot].tint = 0x424949;
			lastHex = hovAxial;
		}
		else {
			if (lastHex != null) {
				let lastArraySpot = currLand.getID([lastHex[0], lastHex[1]]);
				currLand.spriteArray[lastArraySpot].tint = 0xffffff;
			}
		}
	}

	// msgPoint.text = ("Coords: " + corPoint);
	// msgAxial.text = ("Hex: " + hovAxial);
}