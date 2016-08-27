/// <reference path="references.ts" />

function onImageLoad() {
	// Fill sprite reference with texture info
	sprMed = loader.resources["static/img/images-0.json"].textures;
	let spr2 = loader.resources["static/img/images-1.json"].textures;
	for (var key in spr2) {
		sprMed[key] = spr2[key];
	}

	// Create the Tink instance
	tb = new Tink(PIXI, renderer.view);
	pointer = tb.makePointer();

	// This code runs when the texture atlas has loaded
	currLand.generateLand();
	currLand.displayLand();
	currLand.genDevSelection();

	formPlayerBar();
	glbSideBar = new EditBar();
	glbSideBar.formBacking();
	glbSideBar.formBar();
	
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
function edit() {
	// Click event handling
	pointer.press = () =>   { editStateClick(); }
	pointer.tap = () =>     { editStateClick(); }
	pointer.release = () => { glbPointerDown = false; }

	// Click and drag event handling
	if (glbPointerDown === true) {
		if ((pointer.x) < (renderer.width-200)) {
			editHold([pointer.x, pointer.y]);
		}
	}

	// Hover event handling
	if (pointer.x < (renderer.width - 200)) { hoverTile([pointer.x, pointer.y]); }
	else { glbSideBar.hoverOverBar(); }
}

function editStateClick() {
	if ((pointer.x) > (renderer.width-200)) {
		glbSideBar.clickBar();
	}
	else {
		editClick([pointer.x, pointer.y]);
		editHold([pointer.x, pointer.y]);
	}
	glbPointerDown = true;
}

// Applies prior to every game round
function monthSetup() {

}

// Applies prior to each player's round
function plrMonSetup() {
	// Draw the hand of three developments
	for (let tCard=0; tCard < 3; tCard++) {
		if ((currPlayer.deck.length === 0) && (currPlayer.discard.length === 0)) {
			break;
		}
		else if (currPlayer.deck.length === 0) {
			currPlayer.shuffleDeck();
			currPlayer.drawDev();
		}
		else {
			currPlayer.drawDev();
		}
	}

	glbSideBar = new ActionBar();
	glbSideBar.formBar();
	glbState = active;
}

// Player chooses which of their active developments to use
function active() {
	// Click event handling
	pointer.tap = () => {
		if ((pointer.x) < (renderer.width-200)) { activeClick([pointer.x, pointer.y]); }
		else { activeBarClick([pointer.x, pointer.y]); }
	}

	// Hover event handling
	if (pointer.x < (renderer.width - 200)) { hoverTile([pointer.x, pointer.y]); }
	else { glbSideBar.hoverOverBar(); }
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
		if (glbSideBar.buttonArray.length != 0) { glbSideBar.removeBar(); }
		glbState = build;
	}
	else {
		console.log("No applicable tile.")
	}
}

// Player chooses where to build a newly bought development
function build() {
	// Click event handling
	pointer.tap = () => {
		buildClick([pointer.x, pointer.y]);
	}
	hoverTile([pointer.x, pointer.y])
}

// Applies after a player has finished their turn
function cleanup() {

}