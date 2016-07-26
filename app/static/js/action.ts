/// <reference path="references.ts" />

let descDevArray = [];
function describeDevel(descPoint, descTile) {
	if (descDevArray.length > 0) {
		removeDevDescription();
	}
	let dPosition = [];
	let tDevel = develArray[descTile.development];
	// Make display card on right
	if (descPoint[0] > 0) {
		dPosition[0] = 20;
	}
	// Make display card on left
	else if (descPoint[0] <= 0) {
		dPosition[0] = renderer.width - 200 - 200 - 40;
	}
	else { console.log("Unexpected describing point value."); }
	dPosition[1] = 40;

	console.log("At" + dPosition + ":");

	// Card background
	let sprName = "tallblank.png";
	if (tDevel.color === eDCLR.Black) { sprName="blackcard.png"; }
	else if (tDevel.color === eDCLR.Blue) { sprName="bluecard.png"; }
	else if (tDevel.color === eDCLR.Green) { sprName="greencard.png"; }
	else if (tDevel.color === eDCLR.Orange) { sprName="orangecard.png"; }
	else if (tDevel.color === eDCLR.Red) { sprName="redcard.png"; }
	else if (tDevel.color === eDCLR.Violet) { sprName="violetcard.png"; }
	else { console.log("Error, unexpected dev color value."); }
	descDevArray[0] = new Sprite(sprMed[sprName]);
	descDevArray[0].position.set(dPosition[0], dPosition[1]);
	descDevArray[0].scale.set(0.65, 0.65);

	console.log("Image: " + tDevel.sprID + ", " + tDevel.lscpRequired);

	// Development name
	descDevArray[1] = new Text(tDevel.name, {font: "24px sans-serif", fill: "black"});
	descDevArray[1].position.set((dPosition[0] + 28), (dPosition[1] + 38));

	// Background tile 
	descDevArray[2] = new Sprite(sprMed[lscpArray[tDevel.lscpRequired[0]].sprID]);
	descDevArray[2].scale.set(0.5, 0.5);
	descDevArray[2].position.set((dPosition[0] + 93), (dPosition[1] + 181));

	// Development sprite
	descDevArray[3] = new Sprite(sprMed[tDevel.sprID[0]]);
	descDevArray[3].scale.set(0.5, 0.5);
	descDevArray[3].position.set((dPosition[0] + 93), (dPosition[1] + 101));

	// Development description
	descDevArray[4] = new Text(tDevel.description, 
		{font: "16px sans-serif", fill: "black"});
	descDevArray[4].position.set((dPosition[0] + 28), (dPosition[1] + 298));

	console.log("Description: " + tDevel.description);

	// Development cost
	// 12, 770
	descDevArray[5] = new Text(tDevel.cost, {font: "16px sans-serif", fill: "black"});
	descDevArray[5].position.set((dPosition[0] + 12), (dPosition[1] + 470));

	console.log("Cost: " + tDevel.cost);

	// Development required tiles
	// 435, 770
	descDevArray[6] = new Sprite(sprMed[tDevel.lscpRequired[0]]);
	descDevArray[6].scale.set = (0.02);
	descDevArray[6].position.set((dPosition[0] + 435), (dPosition[1] + 470));

	// Applying description sprites to stage
	for (let tSpr=0; tSpr < descDevArray.length; tSpr++) {
		stage.addChild(descDevArray[tSpr]);
	}
}

function removeDevDescription() {
	for (let tDescSpr = 0; tDescSpr < descDevArray.length; tDescSpr++) {
		stage.removeChild(descDevArray[tDescSpr]);
	}
	descDevArray = [];
}

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
			else if ((glbPainting === null) && (clkTile.development != null)) {
				describeDevel(clkPoint, clkTile);
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
				describeDevel(clkPoint, clkTile);
			}
			else if (descDevArray.length > 0) {
				removeDevDescription();
			}
		}
	}
}

function editBarClick(clkPoint) {
	removeDevDescription();

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
				glbBuildSel = eDEVEL.BaseCamp;
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
				describeDevel(clkPoint, clkTile);
			}
		}
	}
}

function activeBarClick(corPoint) {
	for (let activeSpot = 0; activeSpot < currPlayer.activeSprArray.length; activeSpot++) {
			let activePos = currPlayer.getActivePos(activeSpot);
  		if (currPlayer.inActiveHex(activePos, corPoint)) {
  			activeChoiceClick(activePos); 
  		}
	}
}

function activeChoiceClick(activePos) {

}

function hoverActiveBar(corPoint) {

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