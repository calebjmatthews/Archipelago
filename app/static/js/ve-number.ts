/// <reference path="references.ts" />

class veNumber {
	// The position of this veNumber within the global array
	id: number;
	// The literal number this effect is displaying
	litNumber: number;
	// The associated sprite
	sprNumber: PIXI.Text;
	// How may frames the effect has existed
	veAge: number;
	// The direction the effect should move, typically based on its origin
	veDirection: string;

	constructor(setId: number, setNumber: number, setType: string) {
		this.id = setId;
		this.litNumber = setNumber;
		let setString: string = "";
		let setColor: string = "";
		if (setNumber >= 0) { setColor = "green"; }
		else if (setNumber < 0) { setColor = "red"; }

		if (setType === "Food") { setString = setNumber + "F"; }
		else if (setType === "Material") { setString = setNumber + "M"; }
		else if (setType === "Treasure") { setString = setNumber + "T"; }
		else if (setType === "Ship") { setString = setNumber + "S"; }
		else { setString = setNumber + ""; }

		this.sprNumber = new PIXI.Text(setString, 
			{font: "20px sans-serif", fill: setColor, dropShadow: true});
	}

	// Move and decrease opacity as time goes on
	ageVeNumber() {
		let xDir: number = 0;
		let yDir: number = 0;
		if (this.veDirection === "up") { yDir = -1; }
		else if (this.veDirection === "right") { xDir = 1; }
		else if (this.veDirection === "down") { yDir = 1; }
		else if (this.veDirection === "left") { xDir = -1; }

		let velocity: number = 0.1;
		this.sprNumber.x += (velocity * xDir);
		this.sprNumber.y += (velocity * yDir);
		if (this.veAge > 50) {
			this.sprNumber.alpha -= .01;
		}
		if (this.veAge > 150) {
			this.selfDestruct();
		}
	}

	selfDestruct() {
		stage.removeChild(glbVeNumArray[this.id].sprNumber);
		glbVeNumArray[this.id] = null;
	}
}