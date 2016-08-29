/// <reference path="references.ts" />

function editHold(corPoint) {
	let clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];

	let clkAxial = pointToHex(clkPoint);
	let clkTile = currLand.tileArray[currLand.getID(clkAxial)];

	if ((clkAxial != undefined) && ((clkPoint[0]+glbOrigin[0]) < (renderer.width-200))) {
		if (clkTile != undefined) {
			if ((clkTile.landscape != glbPainting) && (glbPainting != null)) {
				if (glbPainting < glbNumLscps) { clkTile.landscape = glbPainting; }
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
				currDescCard = new DescCard(corPoint, clkTile);
			}
			else if (currDescCard != null) { currDescCard.selfDestruct(); }
		}
	}
}

function buildClick(corPoint) {
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
					glbState = plrMonSetup;
				}
				else {
					console.log("Error, unexpected player ID.");
				}
			}
		}
	}
}

function activeClick(corPoint) {
	let clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];

	let clkAxial = pointToHex(clkPoint);
	let clkTile = currLand.tileArray[currLand.getID(clkAxial)];

	if ((clkAxial != undefined) && ((clkPoint[0]+glbOrigin[0]) < (renderer.width-200))) {
		if (clkTile != undefined) {
			if (clkTile.development != null) {
				currDescCard = new DescCard(corPoint, clkTile);
			}
		}
	}
}

function hoverActiveBar(corPoint) {
	// If the hovered point is within the range of all the hexagons
	let numActives = 0;
	if (currPlayer.hand.length < 3) { numActives = 3; }
	else { numActives = this.hand.length; }
	let activeRow = numActives - (numActives % 3);
	// Check that the cursor exists in the neighborhood of the active slots.  A buffer of
	//  10xp is added to allow the hover shading to be removed if the cursor exits the hex
	if ((corPoint[0] > (renderer.width - 110 - glbHWidth - (glbHWidth/2))) && 
			(corPoint[0] < (renderer.width - 60 + glbHWidth + (glbHWidth/2))) && 
			(corPoint[1] > (-10 + (glbHWidth / 2))) && 
			(corPoint[1] < (10 + (glbHWidth / 2) + 
				(((activeRow*1.3)/3) * glbHHeight) + glbHHeight + (glbHHeight/2)))) {
		for (let activeSpot=0; activeSpot < currPlayer.activeSprArray.length; activeSpot++) {
		
			let activePos = currPlayer.getActivePos(activeSpot);
			activePos[1] += 30;
  		if (currPlayer.inActiveHex(activePos, corPoint)) {
  			currPlayer.activeSprArray[activeSpot].tint = rgbToHclr([160, 160, 160]);
  		}
  		else {
  			currPlayer.activeSprArray[activeSpot].tint = rgbToHclr([255, 255, 255]);
  		}
  	}
	}
}

function hoverTile(corPoint) {
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