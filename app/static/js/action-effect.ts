/// <reference path="references.ts" />

function applyDevEffect(tileID: number, undoing: boolean = false) {
	beforeEffect();
	let tDev = develArray[currLand.tileArray[tileID].development];
	let resultArray = considerPlayerEffects(tDev);
	if (requirementCheck(tileID, undoing)) {
		for (let cResult = 0; cResult < glbNumRes; cResult++) {
			if (tDev.result[cResult] != undefined) {
				applySingleEffect(resultArray, cResult, undoing);
			}
		}
		applyRequirement(tileID, undoing);
		afterEffect(tileID, undoing);
	}
	else {
		glbState = activeSetup;
	}
}

function beforeEffect() {
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

function requirementCheck(tileId: number, undoing: boolean) {
	let tDev: Development = develArray[currLand.tileArray[tileId].development];
	if (tDev.requirement === []) { return true; }
	if (undoing) { return true; }
	else {
		let reqArray = [eREQ.Active, eREQ.Destroy, eREQ.Food, eREQ.Material, eREQ.Material, 
			eREQ.Ship, eREQ.Treasure];
		for (let cReqSpot = 0; cReqSpot < tDev.requirement.length; cReqSpot++) {
			let cReq = reqArray[cReqSpot];
			if ((cReq === eREQ.Active) && (tDev.requirement[cReq] != undefined)) {
				if (currPlayer.actions < tDev.requirement[cReq]) { return false; }
			}
			else if ((cReq === eREQ.Destroy) && (tDev.requirement[cReq] != undefined)) {
				if (currPlayer.ownedDevs === []) { return false; }
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
			else { console.log("Error: unexpected dev requirement value."); }
		}
		return true;
	}
}

function applySingleEffect(resultArray: number[], cResult: number, undoing: boolean) {
	let undModify = 1;
	if (undoing) { undModify = -1; }
	if (cResult === eRES.Active) {
		for (let iii = 0; iii < resultArray[eRES.Active]; iii++) {
			currPlayer.actions += (1 * undModify);
			currPlayer.drawContainer();
		}
	}

	else if (cResult === eRES.BlueTreasure) {
		currPlayer.activeEffects[eRES.BlueTreasure] += 
			(resultArray[eRES.BlueTreasure] * undModify);
	}

	else if (cResult === eRES.Destroy) {
		currPlayer.activeEffects[eRES.Destroy] = resultArray[eRES.Destroy];
		// Changes game state in order to select a development for destruction
		glbState = selDevel;
	}

	else if (cResult === eRES.Food) {
		currPlayer.food += (resultArray[eRES.Food] * undModify);
	}

	else if (cResult === eRES.Material) {
		currPlayer.material += (resultArray[eRES.Material] * undModify);
	}

	else if (cResult === eRES.RedActive) {
		currPlayer.activeEffects[eRES.RedActive] += 
			(resultArray[eRES.RedActive] * undModify);
	}

	else if (cResult === eRES.Ship) {
		currPlayer.ships += (resultArray[eRES.Ship] * undModify);
	}

	else if (cResult === eRES.Treasure) {
		currPlayer.treasure += (resultArray[eRES.Treasure] * undModify);
	}
}

function applyRequirement(tileId: number, undoing: boolean) {
	let tDev: Development = develArray[currLand.tileArray[tileId].development];
	let undModify = 1;
	if (undoing) { undModify = -1; }
	if (tDev.requirement === []) { return; }
	else {
		let reqArray = [eREQ.Active, eREQ.Destroy, eREQ.Food, eREQ.Material, 
			eREQ.Ship, eREQ.Treasure];
		for (let cReqSpot = 0; cReqSpot < reqArray.length; cReqSpot++) {
			let cReq = reqArray[cReqSpot];
			if ((cReq === eREQ.Active) && (tDev.requirement[cReq] != undefined)) {
				currPlayer.actions -= (tDev.requirement[cReq] * undModify);
				// glbState = selActive
			}
			else if ((cReq === eREQ.Destroy) && (tDev.requirement[cReq] != undefined)) {
				// glbState = selDevel
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
			else { console.log("Error: unexpected dev requirement value."); }
		}
	}
}

function afterEffect(tileID: number, undoing: boolean) {
	let undModify = 1;
	if (undoing) { undModify = -1; }

	// Account for spent card
	currPlayer.actions += (-1 * undModify);
	if (!undoing) {
		let ahSpot = currPlayer.actionHistory.length;
		currPlayer.actionHistory[ahSpot] = new ArcHistory("development");
		currPlayer.actionHistory[ahSpot].recordDevAction(tileID);
	}
	else {
		// Remove the undone card from the array
		let ahSpot = currPlayer.actionHistory.length - 1;
		currPlayer.actionHistory = currPlayer.actionHistory.slice(0, ahSpot);
	}

	// Update display
	updatePlayerBar();
	currPlayer.removeCard(tileID);
	glbSideBar.formBar();
	
}