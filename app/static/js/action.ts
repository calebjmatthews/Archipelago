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
				if ((glbMonth === 0) && (currPlayer.playerID === 0)) {
					currPlayer = cPlayerArray[1];
					glbState = buildSetup;
				}
				else if ((glbMonth === 0) && currPlayer.playerID === 1) {
					veClearTint(glbPulseArray);
					glbTileSelArray = []; glbPulseArray = [];
					glbState = monthSetup;
				}
				else {
					let ahSpot = currPlayer.actionHistory.length;
					subtractPrice(clkTileID);
					currPlayerBar.updatePlayerBar();
					currPlayer.actionHistory[ahSpot] = new ArcHistory("build");
					currPlayer.actionHistory[ahSpot].recordBuildTileId(clkTileID);
					currPlayer.actions--;
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

function subtractPrice(clkTileID: number) {
	let tDev: Development = develArray[glbDevelSel];
	let rArray = [eCOST.Food, eCOST.Material, eCOST.Treasure];
	let rNameArray = ["Food", "Material", "Treasure"];
	for (let iii = 0; iii < rArray.length; iii++) {
		let tResource = rArray[iii];
		if ((tResource === eCOST.Food) || 
			  (tResource === eCOST.Material) || 
			  (tResource === eCOST.Treasure)) {
			if (tDev.cost[tResource] != undefined) {
				currPlayer.giveResource(tResource, (-1 * tDev.cost[tResource]));
				
			}
		}
	}
	let tPosition = hexToPoint([currLand.tileArray[clkTileID].axialRow, 
			currLand.tileArray[clkTileID].axialCol]);
	tPosition[0] += (glbHWidth / 2); tPosition[0] -= 12.5;
	tPosition[1] += (glbHHeight / 2); tPosition[1] -= 12.5;
	glbVeRscArray.push(new veResourceletChain("Build", tDev.cost, tPosition));
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

function selDevelClick(corPoint) {
	if (currDescCard != null) { currDescCard.selfDestruct(); }

	let clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];

	let clkAxial = pointToHex(clkPoint);
	let clkTileId = currLand.getID(clkAxial);
	let clkTile = currLand.tileArray[clkTileId];

	if ((clkAxial != undefined) && ((clkPoint[0]+glbOrigin[0]) < (renderer.width-200))) {
		if (clkTile != undefined) {
			if (clkTile.development != null) {
				if (currDescCard != null) { currDescCard.selfDestruct(); }
				if ((currReqProcess[eREQ.Destroy] > 0) 
					&& (inArr(glbTileSelArray, clkTileId))) {
					// Destroy the selected development
					currPlayer.destroyTerritory(clkTileId);
					clkTile.reDrawTile();
					currReqProcess[eREQ.Destroy]--;
					if (currReqProcess[eREQ.Destroy] > 0) {
						veClearTint(glbPulseArray);
						glbTileSelArray = []; glbPulseArray = [];
						glbState = selDevelSetup;
					}
					else {
						veClearTint(glbPulseArray);
						glbTileSelArray = []; glbPulseArray = [];
						glbState = activeSetup;
					}
				}
				else if ((currResProcess[eRES.Destroy] > 0) 
					&& (inArr(glbTileSelArray, clkTileId))) {
					// Destroy the selected development
					currPlayer.destroyTerritory(clkTileId);
					clkTile.reDrawTile();
					currResProcess[eRES.Destroy]--;
					if (currReqProcess[eRES.Destroy] > 0) {
						veClearTint(glbPulseArray);
						glbTileSelArray = []; glbPulseArray = [];
						glbState = selDevelSetup;
					}
					else {
						veClearTint(glbPulseArray);
						glbTileSelArray = []; glbPulseArray = [];
						glbState = activeSetup;
					}
				}
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