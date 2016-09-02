/// <reference path="references.ts" />

class DevSet {
	dSet: Development[];

	genDevSelection() {
		this.dSet = [];
		for (let tDev = 0; tDev < 12; tDev++) {
			// Ensure 1 of each color except black, 2 of violet, and fill the rest of the 12 
			//  randomly
			if (tDev < 4) {
				this.dSet.push(develArray[this.getClrDev(tDev+1)]);
			}
			else if (tDev === 4) {
				this.dSet.push(develArray[this.getClrDev(tDev+1)]);
				this.dSet.push(develArray[this.getClrDev(tDev+1)]);
				tDev++;
			}
			else {
				this.dSet.push(develArray[this.getClrDev(null)]);
			}
		}
		this.dSet.sort(function(a: Development, b: Development) {
			return (a.id - b.id); });
	}

	getClrDev(devClr) {
		let devIds: number[] = [];
		for (let cDev=0; cDev < this.dSet.length; cDev++) {
			devIds.push(this.dSet[cDev].id);
		}
		for (let attempts=0; attempts < 80; attempts++) {
			let randDevId = Math.floor(Math.random() * 27) + 4;
			if (devClr === null) {
				if (!inArr(devIds, randDevId)) {
					return randDevId;
				}
			}
			else {
				if ((!inArr(devIds, randDevId)) && 
					(develArray[randDevId].color === devClr)) {
					return randDevId;
				}
			}
		}
		console.log("Error, could not return appropriate development.");
		return 0;
	}

	organizeByCost() {
		let buyableSet: Development[] = [];
		let rejectSet: Development[] = [];

		for (let cDev = 0; cDev < this.dSet.length; cDev++) {
			let buyable = true;
			if (!this.dSet[cDev].checkCost(eCOST.Food)) { buyable = false; }
			if (!this.dSet[cDev].checkCost(eCOST.Material)) { buyable = false; }
			if (!this.dSet[cDev].checkCost(eCOST.Treasure)) { buyable = false; }
			if (buyable) { buyableSet.push(this.dSet[cDev]); }
			else { rejectSet.push(this.dSet[cDev]); }
		}
		return [buyableSet, rejectSet];
	}
}