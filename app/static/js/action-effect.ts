/// <reference path="references.ts" />

function applyDevEffect(tileID: number) {
	beforeEffect();
	let tDev = develArray[currLand.tileArray[tileID].development];
	let resultArray = considerPlayerEffects(tDev);
	for (let cResult = 0; cResult < glbNumRes; cResult++) {
		if (tDev.result[cResult] != undefined) {
			applySingleEffect(resultArray, cResult);
		}
	}
	afterEffect(tileID);
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

function applySingleEffect(resultArray: number[], cResult: number) {
	if (cResult === eRES.Active) {
		for (let iii = 0; iii < resultArray[eRES.Active]; iii++) {
			currPlayer.actions++;
			currPlayer.drawContainer();
		}
	}

	else if (cResult === eRES.BlueTreasure) {
		currPlayer.activeEffects[eRES.BlueTreasure] = resultArray[eRES.BlueTreasure];
	}

	else if (cResult === eRES.Destroy) {
		currPlayer.activeEffects[eRES.Destroy] = resultArray[eRES.Destroy];
		// Changes game state in order to select a development for destruction
		glbState = selDevel;
	}

	else if (cResult === eRES.Food) {
		currPlayer.food += resultArray[eRES.Food];
	}

	else if (cResult === eRES.Material) {
		currPlayer.material += resultArray[eRES.Material];
	}

	else if (cResult === eRES.RedActive) {
		currPlayer.activeEffects[eRES.RedActive] = resultArray[eRES.RedActive];
	}

	else if (cResult === eRES.Ship) {
		currPlayer.ships += resultArray[eRES.Ship];
	}

	else if (cResult === eRES.Treasure) {
		currPlayer.treasure += resultArray[eRES.Treasure];
	}
}

function afterEffect(tileID: number) {
	// Account for spent card
	currPlayer.actions--;
	currPlayer.actionHistory.push(["development", tileID]);

	// Update display
	updatePlayerBar();
	currPlayer.removeCard(tileID);
	glbSideBar.formBar();

	// If last action is used, allow the program to proceed
}