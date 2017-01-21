/// <reference path="references.ts" />

// Resourcelet is my name for a particle-like visual effect which denotes gaining or
//  losing a resource

class veResourcelet {
	// The position of this veResourcelet within the parent's resourselet array
	id: number;
	// The position of the parent resourcelet chain within the global array
	parentId: number;
	// Whether this literal resource value was negative (opposite from what its type would 
	//  typically suggest)
	negative: boolean;
	// The associated sprite
	sprRsc: PIXI.Sprite;
	// The direction the effect should move, typically based on its origin
	velocity: number[] = [];
	// How may frames the effect has existed
	age: number;

	constructor(setId: number, setParentId: number, setType: string, setNegative: boolean, 
			setResource: number, setInitPosition: number[], setVelocity: number[], 
			setAge: number) {
		this.id = setId;
		this.parentId = setParentId;
		this.negative = setNegative;
		this.velocity = setVelocity;

		let imagePath: string;
		let tEnum: any;
		let tTint: number;
		if (setType === "Build") {
			tEnum = eCOST;
			if (!this.negative) { tTint = rgbToHclr([163, 11, 11]); }
			else { tTint = rgbToHclr([32, 132, 11]); }
		}
		else if (setType === "Requirement") {
			tEnum = eREQ;
			if (!this.negative) { tTint = rgbToHclr([163, 11, 11]); }
			else { tTint = rgbToHclr([32, 132, 11]); }
		}
		else if (setType === "Result") {
			tEnum = eRES;
			if (!this.negative) { tTint = rgbToHclr([32, 132, 11]); }
			else { tTint = rgbToHclr([163, 11, 11]); }
		}
		else { console.log("Error: unexpected resourcelet type."); }

		if (setResource === tEnum.Food) { imagePath = "foodicon.png"; }
		else if (setResource === tEnum.Material) { imagePath = "materialicon.png" }
		else if (setResource === tEnum.Treasure) { imagePath = "treasureicon.png"; }

		this.sprRsc = new PIXI.Sprite(sprMed[imagePath]);
		this.sprRsc.scale.set(0.5, 0.5);
		this.sprRsc.position.set(setInitPosition[0], setInitPosition[1]);
		this.sprRsc.alpha = 0.1;
		this.sprRsc.tint = tTint;
		stage.addChild(this.sprRsc);

		this.age = setAge;
	}

	ageVeRsc() {
		// After negative age has finished, become visible
		if (this.age === 0) {
			this.sprRsc.alpha = 1;
		}
		// Move and decrease opacity/velocity as time goes on
		if (this.age > 0) {
			this.sprRsc.position.set((this.sprRsc.x + this.velocity[0]),
				(this.sprRsc.y + this.velocity[1]));
			this.velocity[0] *= 0.99; this.velocity[1] *= 0.99;
		}
		if (this.age > 50) {
			this.sprRsc.alpha -= .01;
		}
		// Self destruct when no longer visible
		if (this.age > 150) {
			this.selfDestruct();
		}
		this.age++;
	}

	selfDestruct() {
		stage.removeChild(this.sprRsc);
		glbVeRscArray[this.parentId].childArray[this.id] = null;
	}
}