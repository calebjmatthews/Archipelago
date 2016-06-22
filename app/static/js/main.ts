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

function editClick(clkPoint) {

	let clkAxial = pointToHex(clkPoint);
	let clkTile = currLand.tileArray[currLand.getID(clkAxial)];

	if (clkAxial != undefined) {
		if (clkTile != undefined) {
			if ((clkTile.landscape != glbPainting) && 
				(glbPainting != null)) {
				if (glbPainting < glbNumLscps) { clkTile.landscape = glbPainting; }
				else if (glbPainting < (glbNumLscps+glbNumBlkDevels)) {
					clkTile.development = glbPainting; 
				}
				else {
					console.log("Error, unexpected global painting value.");
				}
				clkTile.reDrawTile();
			}
		}
	}

}

function hoverTile(corPoint) {
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

	// Normal cursor when hovering over final edit bar button
	if (pointer.hitTestSprite(buttonArray[(glbNumLscps+glbNumBlkDevels)-1])) {
		pointer.cursor = "auto";
	}
}

function onImageLoad() {

	// Create the Tink instance
	tb = new Tink(PIXI, renderer.view);
	pointer = tb.makePointer();

	// This code runs when the texture atlas has loaded
	currLand.generateLand();
	currLand.displayLand();

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
function edit() {

	// Click event handling
	let corPoint = [(pointer.x - glbOrigin[0]), (pointer.y - glbOrigin[1])];
	if (pointer.isDown === true) {
		editClick(corPoint);
	}
	hoverTile(corPoint)

	// msgPoint.text = ("Coords: " + corPoint);
	// msgAxial.text = ("Hex: " + hovAxial);
}

// Applies prior to every game round
function monthSetup() {

}

// Applies prior to each player's round
function plrMonSetup() {

}

// Player chooses which of their active developments to use
function active() {

}

// Choosing a target for a development's effect
function selDevel() {

}

// Player chooses new developments to purchase
function buy() {

}

// Player chooses where to build a newly bought development
function build() {

}

// Applies after a player has finished their turn
function cleanup() {

}