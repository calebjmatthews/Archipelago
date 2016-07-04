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

function buildClick(clkPoint) {

	let clkAxial = pointToHex(clkPoint);
	let clkTileID = currLand.getID(clkAxial);
	let clkTile = currLand.tileArray[clkTileID];

	if ((clkAxial != undefined) && ((clkPoint[0]+glbOrigin[0]) < (renderer.width-200))) {
		if (clkTile != undefined) {
			if (inArr(glbTileSelArray, clkTileID)) {

				// Build the selected development and set the current player as its owner
				clkTile.development = glbBuildSel;
				clkTile.ownedBy = currPlayer.playerID;
				currPlayer.ownedDevs.push(clkTileID);
				currPlayer.addTerritory(clkTileID);
				clkTile.reDrawTile();

				if (currPlayer.playerID === 0) {
					currPlayer = cPlayerArray[1];
					glbState = buildSetup;
				}
				else if (currPlayer.playerID === 1) {
					veClearTint(glbPulseArray);
					glbTileSelArray = []; glbPulseArray = [];
					glbState = plrMonSetup;
				}
				else {
					console.log("Error, unexpected player ID.");
				}
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
					currLand.spriteArray[lastArraySpot].tint = rgbToHclr([255, 255, 255]);
				}
			}
			currLand.spriteArray[hovArraySpot].tint = rgbToHclr([160, 160, 160]);
			lastHex = hovAxial;
		}
		else {
			if (lastHex != null) {
				let lastArraySpot = currLand.getID([lastHex[0], lastHex[1]]);
				currLand.spriteArray[lastArraySpot].tint = rgbToHclr([255, 255, 255]);
			}
		}
	}

	// Normal cursor when hovering over final edit bar button
	if (pointer.hitTestSprite(buttonArray[(glbNumLscps+glbNumBlkDevels)-1])) {
		pointer.cursor = "auto";
	}
}