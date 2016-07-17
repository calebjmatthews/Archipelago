/// <reference path="references.ts" />

function onImageLoad() {

	// Create the Tink instance
	tb = new Tink(PIXI, renderer.view);
	pointer = tb.makePointer();

	// This code runs when the texture atlas has loaded
	currLand.generateLand();
	currLand.displayLand();
	currLand.genDevSelection();

	formPlayerBar();
	formEditBar();
	
	// Start the game loop
	gameLoop();
}

function gameLoop() {

	requestAnimationFrame(gameLoop);

	// Update Tink
	tb.update();

	// Process any visual effects
	veAllEffects();

	// Utilize the current game state
	glbState();

	renderer.render(stage);
}

// Executes on loop when game is in 'edit' state
let lastHex = null;
function edit() {

	// Click event handling
	if (pointer.isDown === true) {
		if ((pointer.x) < (renderer.width-200)) {
			editClick([pointer.x, pointer.y]);
		}
	}
	pointer.tap = () => {
		if ((pointer.x) > (renderer.width-200)) {
			editBarClick([pointer.x, pointer.y]);
		}
	}

	if (pointer.x < (renderer.width - 200)) {
		hoverTile([pointer.x, pointer.y]);
	}
	else { hoverEditBar([pointer.x, pointer.y]); }
}

// Applies prior to every game round
function monthSetup() {

}

// Applies prior to each player's round
function plrMonSetup() {
	// Draw the hand of three developments
	for (let tCard=0; tCard < 3; tCard++) {
		if (currPlayer.deck.length === 0) {
			currPlayer.shuffleDeck();
			currPlayer.drawDev();
		}
		else {
			currPlayer.drawDev();
		}
	}

	currPlayer.displayActives();
	glbState = active;
}

// Player chooses which of their active developments to use
function active() {
	// Click event handling
	if (pointer.isDown === true) {
		activeClick([pointer.x, pointer.y]);
	}
	hoverTile([pointer.x, pointer.y])
}

// Choosing a target for a development's effect
function selDevel() {

}

// Player chooses new developments to purchase
function buy() {

}

// Set up the graphical/logical backing for the building state
function buildSetup() {
	if (glbMonth === 0) {
		glbBuildSel = eDEVEL.BaseCamp;
	}
	let tDevel = develArray[glbBuildSel];
	glbTileSelArray = [];
	glbTileSelArray = currLand.getSel(null, tDevel.lscpRequired);

	if (glbTileSelArray != []) {
		glbPulseArray = glbTileSelArray;
		removeEditBar();
		glbState = build;
	}
	else {
		console.log("No applicable tile.")
	}
}

// Player chooses where to build a newly bought development
function build() {
	// Click event handling
	if (pointer.isDown === true) {
		buildClick([pointer.x, pointer.y]);
	}
	hoverTile([pointer.x, pointer.y])
}

// Applies after a player has finished their turn
function cleanup() {

}