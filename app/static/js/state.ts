/// <reference path="references.ts" />

function describeDevel(descPoint, descTile) {
	let dPosition = [];
	// Make display card on right
	if (descPoint[0] < 0) {
		dPosition[0] = 20;
	}
	// Make display card on left
	else if (descPoint[0] >= 0) {
		dPosition[0] = renderer.width - 200 - 200 - 40;
	}
	else { console.log("Unexpected describing point value."); }
	dPosition[1] = 20;

	let tDevel = develArray[descTile.development];
	console.log("At" + dPosition + ":");
	console.log("Header: " + tDevel.name + ", " + tDevel.color);
	console.log("Image: " + tDevel.sprID + ", " + tDevel.lscpRequired);
	console.log("Description: " + tDevel.description);
	console.log("Cost: " + tDevel.cost);
}

function editClick(clkPoint) {

	let clkAxial = pointToHex(clkPoint);
	let clkTile = currLand.tileArray[currLand.getID(clkAxial)];

	if ((clkAxial != undefined) && ((clkPoint[0]+glbOrigin[0]) < (renderer.width-200))) {
		if (clkTile != undefined) {
			if ((clkTile.landscape != glbPainting) && 
				(glbPainting != null)) {
				if (glbPainting < glbNumLscps) { clkTile.landscape = glbPainting; }
				else if (glbPainting < (glbNumLscps+glbNumBlkDevels)) {
					clkTile.development = glbPainting - glbNumLscps; 
				}
				else {
					console.log("Error, unexpected global painting value.");
				}
				clkTile.reDrawTile();
			}
			else if ((glbPainting === null) && (clkTile.development != null)) {
				describeDevel(clkPoint, clkTile);
			}
		}
	}

}

function hoverTile(corPoint) {
	let hovAxial = pointToHex(corPoint);
	if ((hovAxial != undefined) && ((corPoint[0]+glbOrigin[0]) < (renderer.width-200))) {
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

	formPlayerBar();
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