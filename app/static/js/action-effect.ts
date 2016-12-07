/// <reference path="references.ts" />

function applyDevEffect(tileId: number, undoing: boolean = false) {
	let tDev: Development = develArray[currLand.tileArray[tileId].development];
	let resultArray = considerPlayerEffects(tDev);
	resultArray = calculateComplexResults(tileId, resultArray);
	if (requirementCheck(tileId, undoing)) {
		if (currReqProcess[eREQ.Destroy] != 0) {
			beforeEffect(tileId, undoing);
		}
		if ((!undoing) && (currReqProcess[eREQ.Destroy] != 0)) {
			// Add the card to the history array
			let ahSpot = currPlayer.actionHistory.length;
			currPlayer.actionHistory[ahSpot] = new ArcHistory("development");
			currPlayer.actionHistory[ahSpot].recordDevAction(tileId);
		}
		else if (undoing) {
			// Remove the undone card from the history array
			let ahSpot = currPlayer.actionHistory.length - 1;
			currPlayer.actionHistory = currPlayer.actionHistory.slice(0, ahSpot);
		}
		applyRequirement(tileId, undoing);

		if (currReqProcess[eREQ.Destroy] != undefined) {
			if (currReqProcess[eREQ.Destroy] > 0) {
				return;
			}
		}

		for (let cResult = 0; cResult < glbNumRes; cResult++) {
			if (tDev.result[cResult] != undefined) {
				applySingleEffect(tileId, resultArray, cResult, undoing);
			}
		}

		// Create visual effect for requirement / result
		let tPosition = hexToPoint([currLand.tileArray[tileId].axialRow, 
			currLand.tileArray[tileId].axialCol]);
		tPosition[0] += (glbHWidth / 2); tPosition[0] -= 12.5;
		tPosition[1] += (glbHHeight / 2); tPosition[1] -= 12.5;

		if (tDev.requirement.length > 0) {
			glbVeRscArray.push(new veResourceletChain("Requirement", 
				tDev.requirement, tPosition));
		}
		if (resultArray.length > 0) {
			glbVeRscArray.push(new veResourceletChain("Result", resultArray, tPosition));
		}

		afterEffect(tileId, undoing);
		
	}
	else {
		glbState = activeSetup;
	}
}

function beforeEffect(tileId: number, undoing: boolean) {
	glbActingTileId = tileId;
	glbSideBar.removeBar();
}

function considerPlayerEffects(tDev: Development) {
	let resultArray = tDev.result;
	if (currPlayer.activeEffects.length === 0) { return resultArray; }

	// Apply active player effects to the result of the selected development
	for (let cEffect = 0; cEffect < glbNumRes; cEffect++) {
		let effectValue = currPlayer.activeEffects[cEffect];
		if (effectValue != undefined) {

			if ((cEffect === eRES.BlueTreasure) && (tDev.color === eDCLR.Blue)) {
				resultArray[eRES.Treasure] += effectValue;
			}

			else if ((cEffect === eRES.RedActive) && (tDev.color === eDCLR.Red)) {
				resultArray[eRES.Active] += effectValue;
			}
		}
	}
	return resultArray;
}

function calculateComplexResults(tileId: number, resultArray: number[]) {
	for (let cResult = 0; cResult < resultArray.length; cResult++) {
		if ((cResult === eRES.FoodLessNeighbor) 
				&& (resultArray[eRES.FoodLessNeighbor] != undefined)) {
			let qtyFood = resultArray[eRES.FoodLessNeighbor];

			// Build an array of the tiles of each neighbor
			let neighborCoordArray = currLand.tileArray[tileId].getNeighbors();
			let neighborArray: Tile[] = [];
			for (let iii = 0; iii < neighborCoordArray.length; iii++) {
				neighborArray.push(currLand.tileArray[currLand.getID(neighborCoordArray[iii])]);
			}

			// Subtract one food for each neighboring tile that has a development
			for (let tNeighbor = 0; tNeighbor < neighborArray.length; tNeighbor++) {
				let neighborVal: Tile = neighborArray[tNeighbor];
				if (neighborVal.development != null) { qtyFood--; }
			}

			if (qtyFood < 0) { qtyFood = 0; }
			if (resultArray[eRES.Food] === undefined) { resultArray[eRES.Food] = 0; }
			resultArray[eRES.Food] += qtyFood;
			resultArray[eRES.FoodLessNeighbor] = 0;
		}

		else if ((cResult === eRES.ActiveMultNeighbor) 
				&& (resultArray[eRES.ActiveMultNeighbor] != undefined)) {
			let actMult = resultArray[eRES.ActiveMultNeighbor];
			let qtyAct = 0;

			// Build an array of the tiles of each neighbor
			let neighborCoordArray = currLand.tileArray[tileId].getNeighbors();
			let neighborArray: Tile[] = [];
			for (let iii = 0; iii < neighborCoordArray.length; iii++) {
				neighborArray.push(currLand.tileArray[currLand.getID(neighborCoordArray[iii])]);
			}

			// Add one for each neighboring tile that has a development
			for (let tNeighbor = 0; tNeighbor < neighborArray.length; tNeighbor++) {
				let neighborVal: Tile = neighborArray[tNeighbor];
				if (neighborVal.development != null) { qtyAct++; }
			}

			if (resultArray[eRES.Active] === undefined) { resultArray[eRES.Active] = 0; }
			resultArray[eRES.Active] += Math.ceil(qtyAct * actMult);
			resultArray[eRES.ActiveMultNeighbor] = 0;
		}

		else if ((cResult === eRES.MaterialMultNeighbor)
				&& (resultArray[eRES.MaterialMultNeighbor] != undefined)) {
			let matMult = resultArray[eRES.MaterialMultNeighbor];
			let qtyMat = 0;

			// Build an array of the tiles of each neighbor
			let neighborCoordArray = currLand.tileArray[tileId].getNeighbors();
			let neighborArray: Tile[] = [];
			for (let iii = 0; iii < neighborCoordArray.length; iii++) {
				neighborArray.push(currLand.tileArray[currLand.getID(neighborCoordArray[iii])]);
			}

			// Add one for each neighboring tile that has a development
			for (let tNeighbor = 0; tNeighbor < neighborArray.length; tNeighbor++) {
				let neighborVal: Tile = neighborArray[tNeighbor];
				if (neighborVal.development != null) { qtyMat++; }
			}

			if (resultArray[eRES.Material] === undefined) { resultArray[eRES.Material] = 0; }
			resultArray[eRES.Material] += Math.ceil(qtyMat * matMult);
			resultArray[eRES.MaterialMultNeighbor] = 0;
		}

		else if ((cResult === eRES.MaterialGreenDev)
				&& (resultArray[eRES.MaterialGreenDev] != undefined)) {
			let hasGNeighbor: boolean = false;
			
			// Build an array of the tiles of each neighbor
			let neighborCoordArray = currLand.tileArray[tileId].getNeighbors();
			let neighborArray: Tile[] = [];
			for (let iii = 0; iii < neighborCoordArray.length; iii++) {
				neighborArray.push(currLand.tileArray[currLand.getID(neighborCoordArray[iii])]);
			}

			// Add one for each neighboring tile that has a development
			for (let tNeighbor = 0; tNeighbor < neighborArray.length; tNeighbor++) {
				let neighborVal: Tile = neighborArray[tNeighbor];
				if (neighborVal.development != null) {
					if (develArray[neighborVal.development].color === eDCLR.Green) {
						hasGNeighbor = true;
						break;
					}
				}
			}

			if (hasGNeighbor) {
				if (resultArray[eRES.Material] === undefined) { resultArray[eRES.Material] = 0; }
				resultArray[eRES.Material] += resultArray[eRES.MaterialGreenDev];
				resultArray[eRES.MaterialGreenDev] = 0;
			}
		}
	}
	return resultArray;
}

function requirementCheck(tileId: number, undoing: boolean) {
	let tDev: Development = develArray[currLand.tileArray[tileId].development];
	if (tDev.requirement.length === 0) { return true; }
	if (undoing) { return true; }
	let reqArray = [eREQ.Active, eREQ.Destroy, eREQ.Food, eREQ.Material, eREQ.Material, 
		eREQ.Ship, eREQ.Treasure];
	for (let cReqSpot = 0; cReqSpot < tDev.requirement.length; cReqSpot++) {
		let cReq = reqArray[cReqSpot];
		if ((cReq === eREQ.Active) && (tDev.requirement[cReq] != undefined)) {
			if (currPlayer.actions < tDev.requirement[cReq]) { return false; }
		}
		else if ((cReq === eREQ.Destroy) && (tDev.requirement[cReq] != undefined)) {
			if ((currPlayer.territory.length < 3) 
				&& (currReqProcess[eREQ.Destroy] != 0)) { return false; }
		}
		else if ((cReq === eREQ.Food) && (tDev.requirement[cReq] != undefined)) {
			if (currPlayer.food < tDev.requirement[cReq]) { return false; }
		}
		else if ((cReq === eREQ.Material) && (tDev.requirement[cReq] != undefined)) {
			if (currPlayer.material < tDev.requirement[cReq]) { return false; }
		}
		else if ((cReq === eREQ.Ship) && (tDev.requirement[cReq] != undefined)) {
			if (currPlayer.ships < tDev.requirement[cReq]) { return false; }
		}
		else if ((cReq === eREQ.Treasure) && (tDev.requirement[cReq] != undefined)) {
			if (currPlayer.treasure < tDev.requirement[cReq]) { return false; }
		}
	}
	return true;
}

function applySingleEffect(tileId: number, resultArray: number[], cResult: number, 
	undoing: boolean) {
	let undModify = 1;
	if (undoing) { undModify = -1; }

	if (cResult === eRES.Active) {
		for (let iii = 0; iii < resultArray[eRES.Active]; iii++) {
			currPlayer.actions += (1 * undModify);
			currPlayer.drawContainer();
		}
	}

	else if (cResult === eRES.Food) {
		currPlayer.food += (resultArray[eRES.Food] * undModify);
	}

	else if (cResult === eRES.Material) {
		currPlayer.material += (resultArray[eRES.Material] * undModify);
	}

	else if (cResult === eRES.Treasure) {
		currPlayer.treasure += (resultArray[eRES.Treasure] * undModify);
	}

	else if (cResult === eRES.Ship) {
		currPlayer.ships += (resultArray[eRES.Ship] * undModify);
	}

	else if (cResult === eRES.BlueTreasure) {
		if (currPlayer.activeEffects[eRES.BlueTreasure] === undefined) {
			currPlayer.activeEffects[eRES.BlueTreasure] = 0;
		}
		currPlayer.activeEffects[eRES.BlueTreasure] += 
			(resultArray[eRES.BlueTreasure] * undModify);
	}

	else if (cResult === eRES.RedActive) {
		if (currPlayer.activeEffects[eRES.RedActive] === undefined) {
			currPlayer.activeEffects[eRES.RedActive] = 0;
		}
		currPlayer.activeEffects[eRES.RedActive] += 
			(resultArray[eRES.RedActive] * undModify);
	}
}

function applyRequirement(tileId: number, undoing: boolean) {
	let tDev: Development = develArray[currLand.tileArray[tileId].development];
	let undModify = 1;
	if (undoing) { undModify = -1; }
	if (tDev.requirement.length === 0) { return; }
	else {
		let reqArray = [eREQ.Active, eREQ.Destroy, eREQ.Food, eREQ.Material, 
			eREQ.Ship, eREQ.Treasure];
		for (let cReqSpot = 0; cReqSpot < reqArray.length; cReqSpot++) {
			let cReq = reqArray[cReqSpot];
			if ((cReq === eREQ.Active) && (tDev.requirement[cReq] != undefined)) {
				currPlayer.actions -= (tDev.requirement[cReq] * undModify);
			}
			else if ((cReq === eREQ.Destroy) && (tDev.requirement[cReq] != undefined)) {
				// Changes game state in order to select a development for destruction
				if (currReqProcess[eREQ.Destroy] === undefined) {
					currReqProcess[eREQ.Destroy] = tDev.requirement[eREQ.Destroy];
				}
				if (currReqProcess[eREQ.Destroy] > 0) {
					glbState = selDevelSetup;
				}
			}
			else if ((cReq === eREQ.Food) && (tDev.requirement[cReq] != undefined)) {
				currPlayer.food -= (tDev.requirement[cReq] * undModify);
			}
			else if ((cReq === eREQ.Material) && (tDev.requirement[cReq] != undefined)) {
				currPlayer.material -= (tDev.requirement[cReq] * undModify);
			}
			else if ((cReq === eREQ.Ship) && (tDev.requirement[cReq] != undefined)) {
				currPlayer.ships -= (tDev.requirement[cReq] * undModify);
			}
			else if ((cReq === eREQ.Treasure) && (tDev.requirement[cReq] != undefined)) {
				currPlayer.treasure -= (tDev.requirement[cReq] * undModify);
			}
		}
	}
}

function afterEffect(tileId: number, undoing: boolean) {
	let undModify = 1;
	if (undoing) { undModify = -1; }

	// Account for spent card
	currPlayer.actions += (-1 * undModify);
	glbActingTileId = null;
	currPlayer.removeCard(tileId);
	currReqProcess = [];

	// Update display
	currPlayerBar.updatePlayerBar();
	
	glbSideBar.formBar();
	
}