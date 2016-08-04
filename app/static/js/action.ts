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

function editBarClick(clkPoint) {
	if (currDescCard != null) { currDescCard.selfDestruct(); }

	let actionTaken = false;
	for (let cOption = 0; cOption < (glbNumLscps + glbNumBlkDevels + 2); cOption++) {
		if (cOption < glbNumLscps) {
			if ((clkPoint[0] > (renderer.width - 180)) && 
				(clkPoint[0]) < (renderer.width - 20) && 
				(clkPoint[1]) > (20 + (40*cOption)) && 
				(clkPoint[1]) < (10 + 40 * (1+cOption))) {
				glbPainting = cOption;
				glbEditBarSel = cOption;
				editBgArray[cOption].alpha = 0.4;
				actionTaken = true;
			}
		}
		else if ((cOption >= glbNumLscps) && (cOption < (glbNumLscps+glbNumBlkDevels))) {
			if ((clkPoint[0] > (renderer.width - 180)) && 
				(clkPoint[0]) < (renderer.width - 20) && 
				(clkPoint[1]) > (50 + (40*cOption)) && 
				(clkPoint[1]) < (40 + 40 * (1+cOption))) {
				glbPainting = cOption;
				glbEditBarSel = cOption;
				editBgArray[cOption].alpha = 0.4;
				actionTaken = true
			}
		}
		// Randomize button
		else if (cOption === (glbNumLscps+glbNumBlkDevels)) {
			if ((clkPoint[0] > (renderer.width - 180)) && 
				(clkPoint[0]) < (renderer.width - 20) && 
				(clkPoint[1]) > (renderer.height - 90) && 
				(clkPoint[1]) < (renderer.height - 60)) {
				currLand.lClimate = Math.floor(Math.random() * 7);
				currLand.lSize = Math.floor(Math.random() * 3);
				currLand.generateLand();
				currLand.genDevSelection();
				currLand.refreshLandSpr();
			}
		}
		// Finish button
		else if (cOption === (glbNumLscps+glbNumBlkDevels+1)) {
			if ((clkPoint[0] > (renderer.width - 180)) && 
				(clkPoint[0]) < (renderer.width - 20) && 
				(clkPoint[1]) > (renderer.height - 50) && 
				(clkPoint[1]) < (renderer.height - 20)) {
				glbState = buildSetup;
			}
		}
		else { console.log("Unexpected edit bar value."); }
	}
	if (actionTaken === false) {
		glbPainting = null;
		glbEditBarSel = null;
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

				// Build the selected development and set the current player as its owner
				clkTile.development = glbBuildSel;
				clkTile.ownedBy = currPlayer.playerID;
				currPlayer.ownedDevs.push(clkTileID);
				currPlayer.discard.push(clkTileID);
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

function activeBarClick(corPoint) {
	// If the clicked point is within the range of all the hexagons
	let numActives = 0;
	if (currPlayer.hand.length = 3) { numActives = 3; }
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
  		if (currPlayer.inActiveHex(activePos, corPoint)) {
  			activeChoiceClick(activeSpot); 
  		}
  	}
	}
}

function activeChoiceClick(activePos) {
	
}

function hoverActiveBar(corPoint) {
	// If the hovered point is within the range of all the hexagons
	let numActives = 0;
	if (currPlayer.hand.length = 3) { numActives = 3; }
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
}

function hoverEditBar(corPoint) {
	for (let cOption = 0; cOption < (glbNumLscps + glbNumBlkDevels + 2); cOption++) {
		if (cOption < glbNumLscps) {
			if ((corPoint[0] > (renderer.width - 180)) && 
				(corPoint[0]) < (renderer.width - 20) && 
				(corPoint[1]) > (20 + (40*cOption)) && 
				(corPoint[1]) < (10 + 40 * (1+cOption))) {
				editBgArray[cOption].alpha = 0.6;
			}
			else if (glbEditBarSel != cOption) {
				editBgArray[cOption].alpha = 0;
			}
			else {
				editBgArray[cOption].alpha = 0.4;
			}
		}
		else if ((cOption >= glbNumLscps) && (cOption < (glbNumLscps+glbNumBlkDevels))) {
			if ((corPoint[0] > (renderer.width - 180)) && 
				(corPoint[0]) < (renderer.width - 20) && 
				(corPoint[1]) > (50 + (40*cOption)) && 
				(corPoint[1]) < (40 + 40 * (1+cOption))) {
				editBgArray[cOption].alpha = 0.6;
			}
			else if (glbEditBarSel != cOption) {
				editBgArray[cOption].alpha = 0;
			}
			else {
				editBgArray[cOption].alpha = 0.4;
			}
		}
		else if (cOption === (glbNumLscps+glbNumBlkDevels)) {
			if ((corPoint[0] > (renderer.width - 180)) && 
				(corPoint[0]) < (renderer.width - 20) && 
				(corPoint[1]) > (renderer.height - 90) && 
				(corPoint[1]) < (renderer.height - 60)) {
				editBgArray[cOption].alpha = 0.6;
			}
			else if (glbEditBarSel != cOption) {
				editBgArray[cOption].alpha = 0;
			}
			else {
				editBgArray[cOption].alpha = 0.4;
			}
		}
		else if (cOption === (glbNumLscps+glbNumBlkDevels+1)) {
			if ((corPoint[0] > (renderer.width - 180)) && 
				(corPoint[0]) < (renderer.width - 20) && 
				(corPoint[1]) > (renderer.height - 50) && 
				(corPoint[1]) < (renderer.height - 20)) {
				editBgArray[cOption].alpha = 0.6;
			}
			else if (glbEditBarSel != cOption) {
				editBgArray[cOption].alpha = 0;
			}
			else {
				editBgArray[cOption].alpha = 0.4;
			}
		}
		else { console.log("Unexpected edit bar value."); }
	}
}