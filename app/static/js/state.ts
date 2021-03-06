/// <reference path="references.ts" />

function editSetup() {
	if (glbSideBar.buttonArray.length != 0) { glbSideBar.removeBar(); }
	glbSideBar = new EditBar();
	glbSideBar.formBar();
	glbState = edit;
}

// Executes on loop when game is in 'edit' state
function edit() {
	// Click event handling
	pointer.press = () =>   { editStateClick(); }
	pointer.tap = () =>     { editTap(); }
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

function editTap() {
	// Check that this tap doesn't occur in the sidebar, so the click isn't applied twice
	if ((pointer.x) < (renderer.width-200)) { editStateClick(); }
	glbPointerDown = false;
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
	glbMonth++;
	currPlayerBar.updatePlayerBar();
	// Months should begin with Player 2, and plrMonSetup switches the current player
	//  Therefore, set the current player to Player 1 here
	currPlayer = cPlayerArray[0];

	let bannerId: number = glbVeBanArray.length;
	glbVeBanArray.push(new veBanner(bannerId, currPlayer.color, ("Month " + glbMonth)));
	glbState = plrMonSetup;
}

// Applies prior to each player's round
function plrMonSetup() {
	if (glbSideBar.buttonArray.length != 0) { glbSideBar.removeBar(); }
	if (currPlayer.playerID === 1) { currPlayer = cPlayerArray[0]; }
	else { currPlayer = cPlayerArray[1]; }
	// Draw the hand of three developments
	for (let tCard = 0; tCard < 3; tCard++) { currPlayer.drawContainer(); }
	currPlayer.actions = 3;
	currPlayer.actionHistory = [];
	glbState = activeSetup;
}

function activeSetup() {
	if (glbSideBar.buttonArray.length != 0) { glbSideBar.removeBar(); }
	glbSideBar = new ActionBar();
	glbSideBar.formBar();
	glbState = active;
}

let dirtyClick: boolean = false; // To avoid multiple press events for the same click
// Player chooses which of their active developments to use
function active() {
	// Click event handling
	pointer.press = () => {
		if (!dirtyClick) {
			if ((pointer.x) < (renderer.width-200)) { activeClick([pointer.x, pointer.y]); }
			else { glbSideBar.clickBar([pointer.x, pointer.y]); }
		}
		dirtyClick = true;
	}
	pointer.release = () => {
		dirtyClick = false;
	}

	// Hover event handling
	if (pointer.x < (renderer.width - 200)) { hoverTile([pointer.x, pointer.y]); }
	else { glbSideBar.hoverOverBar(); }
}

// Logical backing for selecting a development effect's target
function selDevelSetup() {
	if (glbSideBar.buttonArray.length != 0) { glbSideBar.removeBar(); }
	if (currReqProcess[eREQ.Destroy] > 0) {
		let availableTiles: number[] = [];
		for (let cTile = 0; cTile < currPlayer.ownedTiles.length; cTile++) {
			if (currPlayer.ownedTiles[cTile] != glbActingTileId) {
				availableTiles.push(currPlayer.ownedTiles[cTile]);
			}
		}
		glbTileSelArray = availableTiles;
		glbPulseArray = glbTileSelArray;
	}

	glbState = selDevel;
}

// Choosing a development as a target for another development's effect
function selDevel() {
	// Click event handling
	pointer.press = () => {
		if ((pointer.x) < (renderer.width-200)) { selDevelClick([pointer.x, pointer.y]); }
		else { glbSideBar.clickBar([pointer.x, pointer.y]); }
	}
	// Hover event handling
	if (pointer.x < (renderer.width - 200)) { hoverTile([pointer.x, pointer.y]); }
	else { glbSideBar.hoverOverBar(); }
}

// Prepare the logic/visuals for development purchasing
function buySetup() {
	if (glbSideBar.buttonArray.length != 0) { glbSideBar.removeBar(); }
	glbSideBar = new BuyBar();
	glbSideBar.formBar();
	glbState = buy;
}

// Player chooses new developments to purchase
function buy() {
	// Click event handling
	pointer.press = () => {
		if ((pointer.x) < (renderer.width-200)) { activeClick([pointer.x, pointer.y]); }
		else { glbSideBar.clickBar([pointer.x, pointer.y]); }
	}

	// Hover event handling
	if (pointer.x < (renderer.width - 200)) { hoverTile([pointer.x, pointer.y]); }
	else { glbSideBar.hoverOverBar(); }
}

// Set up the graphical/logical backing for the building state
function buildSetup() {
	let selTerritory = null;
	if (glbMonth === 0) { glbDevelSel = eDEVEL.BaseCamp; }
	else {
		// Violet developments can be build regardless of player territory
		if (develArray[glbDevelSel].color != eDCLR.Violet) {
			selTerritory = currPlayer.territory;
		}
	}
	let tDevel = develArray[glbDevelSel];

	if (glbTileSelArray != []) {
		glbTileSelArray = currLand.getSel(selTerritory, tDevel.lscpRequired);
		glbPulseArray = glbTileSelArray;
		glbSideBar.removeBar();
		glbSideBar = new BuildBar();
		glbSideBar.formBar();
		glbState = build;
	}
	else {
		console.log("No applicable tile.")
		glbState = buy;
	}
}

// Player chooses where to build a newly bought development
function build() {
	// Click event handling
	pointer.tap = () => {
		if (glbState === build) {
			buildClick([pointer.x, pointer.y]);
		}
	}

	// Hover event handling
	if (pointer.x < (renderer.width - 200)) { hoverTile([pointer.x, pointer.y]); }
	else { glbSideBar.hoverOverBar(); }
}

// Applies after a player has finished their turn
function cleanup() {
	if (glbSideBar.buttonArray.length != 0) { glbSideBar.removeBar(); }
	currPlayer.discardHand();
	currPlayer.discardInPlay();
	if (currPlayer === cPlayerArray[1]) {
		glbState = plrMonSetup;
	}
	else if (currPlayer === cPlayerArray[0]) {
		glbState = monthSetup;
	}
}