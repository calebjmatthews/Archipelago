/// <reference path="references.ts" />

// Resourcelet is my name for a particle-like visual effect which denotes gaining or
//  losing a resource

class veResourceletChain {
	// The chain's position in the global array
	id: number;
	// The type of resource transaction occurring, i.e. "Build", "Requirement", or "Result"
	type: string;
	// An array of child resourcelets
	childArray: veResourcelet[] = [];
	// An array of the total literal resource gain/loss being applied
	litResource: number[] = [];
	// The x,y position the effects should eminate from
	position: number[] = [];

	constructor(setType: string, setLitResource: number[], setPosition: number[]) {
		this.id = glbVeRscIncrement;
		glbVeRscIncrement++;
		this.type = setType;
		this.litResource = setLitResource;
		this.position = setPosition;

		this.formChain();
	}

	randVelocity() {
		let xVelocity: number = 0;
		let yVelocity: number = 0;

		xVelocity = (Math.random() * 2) - 1;
		yVelocity = Math.sin(Math.acos(xVelocity));
		if (Math.random() < 0.5) { yVelocity *= -1; }

		// Velocity multiplier
		let vm = 1.5;

		return [(xVelocity * vm), (yVelocity * vm)];
	}

	formChain() {
		for (let tRscType = 0; tRscType < this.litResource.length; tRscType++) {
			let rscTypeVal: number = this.litResource[tRscType];
			if (rscTypeVal != undefined) {

				let tEnum: any;
				if (this.type === "Build") { tEnum = eCOST; }
				else if (this.type === "Requirement") { tEnum = eREQ; }
				else if (this.type === "Result") { tEnum = eRES; }
				else { console.log("Error: unexpected resourcelet type."); }

				if ((tRscType === tEnum.Food) || (tRscType === tEnum.Material) || 
					(tRscType === tEnum.Treasure)) {
					this.formResourceletSet(tRscType, rscTypeVal);
				}
			}
		}
	}

	formResourceletSet(tRscType: number, rscTypeVal: number) {
		for (let eachRsc = 0; eachRsc < Math.abs(rscTypeVal); eachRsc++) {

			let isNegative: boolean = false;
			if (rscTypeVal < 0) { isNegative = true; }
			let childAge: number = -(this.childArray.length * 5);
			let childId: number = this.childArray.length;
			this.childArray.push(new veResourcelet(childId, this.id, this.type, 
				isNegative, tRscType, this.position, this.randVelocity(), childAge));
		}
	}

	ageVeRscChain() {
		let noChildren: boolean = true;
		for (let tChild=0; tChild < this.childArray.length; tChild++) {
			let childVal = this.childArray[tChild];
			if (childVal != undefined) {
				if (childVal != null) {
					childVal.ageVeRsc();
					noChildren = false
				}
			}
		}
		// if (noChildren) { this.selfDestruct(); }
	}

	selfDestruct() {
		glbVeRscArray[this.id] = null;
	}
}