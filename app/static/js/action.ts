/// <reference path="references.ts" />

function editHold(corPoint) {
	let clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];

	let clkAxial = pointToHex(clkPoint);
	let clkTile = currLand.tileArray[currLand.getID(clkAxial)];

	if ((clkAxial != undefined) && ((clkPoint[0]+glbOrigin[0]) < (renderer.width-200))) {
		if (clkTile != undefined) {
			if (glbPainting != null) {
				if (glbPainting < glbNumLscps) {
					clkTile.landscape = glbPainting;
					clkTile.development = null;
				}
				else if ((glbPainting < (glbNumLscps+glbNumBlkDevels)) && 
					(inArr(develArray[glbPainting - glbNumLscps].lscpRequired, 
					clkTile.landscape))) {
					clkTile.development = glbPainting - glbNumLscps; 
				}
				else {
					console.log("Error, unexpected global painting value.");
				}
				clkTile.reDrawTile();
			}
		}
	}
}

function editClick(corPoint) {
	let clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];

	let clkAxial = pointToHex(clkPoint);
	let clkTile = currLand.tileArray[currLand.getID(clkAxial)];

	if ((clkAxial != undefined) && ((clkPoint[0]+glbOrigin[0]) < (renderer.width-200))) {
		if (clkTile != undefined) {
			if ((glbPainting === null) && (clkTile.development != null)) {
				if (currDescCard != null) { currDescCard.selfDestruct(); }
				currDescCard = new DescCard(corPoint, develArray[clkTile.development]);
			}
			else if (currDescCard != null) { currDescCard.selfDestruct(); }
		}
	}
}

function buildClick(corPoint) {
	if (currDescCard != null) { currDescCard.selfDestruct(); }

	let clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];

	let clkAxial = pointToHex(clkPoint);
	let clkTileID = currLand.getID(clkAxial);
	let clkTile = currLand.tileArray[clkTileID];

	if ((clkAxial != undefined) && ((clkPoint[0]+glbOrigin[0]) < (renderer.width-200))) {
		if (clkTile != undefined) {
			if (inArr(glbTileSelArray, clkTileID)) {
				// Build the selected development and it to player's territory
				currPlayer.addTerritory(clkTileID);
				clkTile.reDrawTile();

				// Move to the next game state
				if ((glbMonth ===0) && (currPlayer.playerID === 0)) {
					currPlayer = cPlayerArray[1];
					glbState = buildSetup;
				}
				else if ((glbMonth ===0) && currPlayer.playerID === 1) {
					veClearTint(glbPulseArray);
					glbTileSelArray = []; glbPulseArray = [];
					currPlayer = cPlayerArray[0];
					glbState = monthSetup;
				}
				else {
					currPlayer.actionHistory.push("Build");
					veClearTint(glbPulseArray);
					glbTileSelArray = []; glbPulseArray = [];
					glbState = activeSetup;
				}
			}
			else {
				currDescCard = new DescCard(corPoint, develArray[clkTile.development]);
			}
		}
	}
}

function activeClick(corPoint) {
	if (currDescCard != null) { currDescCard.selfDestruct(); }

	let clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];

	let clkAxial = pointToHex(clkPoint);
	let clkTile = currLand.tileArray[currLand.getID(clkAxial)];

	if ((clkAxial != undefined) && ((clkPoint[0]+glbOrigin[0]) < (renderer.width-200))) {
		if (clkTile != undefined) {
			if (clkTile.development != null) {
				if (currDescCard != null) { currDescCard.selfDestruct(); }
				currDescCard = new DescCard(corPoint, develArray[clkTile.development]);
			}
		}
	}
}

function hoverTile(corPoint) {
	if (currHovDescCard != null) { currHovDescCard.selfDestruct(); }
	let clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];

	let hovAxial = pointToHex(clkPoint);
	if (hovAxial != undefined) {
		let hovArraySpot = currLand.getID([hovAxial[0], hovAxial[1]]);
		if (currLand.spriteArray[hovArraySpot] != undefined) {
			if (glbLastHex != null) {
				let lastArraySpot = currLand.getID([glbLastHex[0], glbLastHex[1]]);
				if (currLand.spriteArray[lastArraySpot] != undefined) {
					currLand.spriteArray[lastArraySpot].tint = rgbToHclr([255, 255, 255]);
				}
			}
			currLand.spriteArray[hovArraySpot].tint = rgbToHclr([160, 160, 160]);
			glbLastHex = hovAxial;
		}
		else {
			if (glbLastHex != null) {
				let lastArraySpot = currLand.getID([glbLastHex[0], glbLastHex[1]]);
				currLand.spriteArray[lastArraySpot].tint = rgbToHclr([255, 255, 255]);
			}
		}
	}
}