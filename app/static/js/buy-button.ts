/// <reference path="references.ts" />

class BuyButton extends ArcButton {
	txtCost: PIXI.Text[] = [];

	constructor(setType: string, setId: number, setOtherName: string) {
		super(setType, setId, setOtherName);
		if (this.type === "choice") { this.bHeight = glbBHeight*1.5; }
	}

	displayChoice(setOrigin: number[]) {
		this.displayButton(setOrigin);
		let tDev = develArray[this.id];

		// Display a sprite of the landscape required by this development
		this.sprFirst = new PIXI.Sprite(
			sprMed[lscpArray[develArray[this.id].lscpRequired[0]].sprID]);
		this.sprFirst.scale.set(0.2, 0.2);
		this.sprFirst.position.set((this.bounds[0][0] + glbBPadding), 
			                          (this.bounds[0][1] + glbBPadding + 8));
		stage.addChild(this.sprFirst);
		this.displayTextLayer(develArray[this.id].name, 
			[(this.bounds[0][0] + 70 + glbBPadding), (this.bounds[0][1] + glbBPadding)]);

		// Display text that indicates the price of the development
		let tResource = [eCOST.Food, eCOST.Material, eCOST.Treasure];
		let labelLetter = ["F", "M", "T"];
		for (let iii = 0; iii < 3; iii++) {
			let setText = null;
			if (tDev.cost[tResource[iii]] === undefined) {
				setText = labelLetter[iii] + "-0";
			}
			else { setText = labelLetter[iii] + "-" + tDev.cost[tResource[iii]]; }
			let setFill = null;
			if (tDev.checkCost(tResource[iii])) { setFill = "white"; }
			else { setFill = "red"; }
			this.txtCost[iii] = new PIXI.Text(setText, {font: "13px sans-serif", fill: setFill});
			this.txtCost[iii].position.set(
				(this.bounds[0][0] + glbBPadding + 70 + (iii * 30)), 
				(this.bounds[0][1] + glbBPadding + 25));
			stage.addChild(this.txtCost[iii]);
		}

		// Display the first development in the array above the landscape tile, 30 pixels
		//  higher to account for the extra height of development sprites
		this.sprSecond = new PIXI.Sprite(sprMed[develArray[this.id].sprID[0]]);
		this.sprSecond.scale.set(0.2, 0.2);
		this.sprSecond.position.set((this.bounds[0][0] + glbBPadding), 
			                          (this.bounds[0][1] + glbBPadding - 22));
		stage.addChild(this.sprSecond);

		// Shrink the development's name so that it fits into the button
		let shrinkValue = 0;
		if (tDev.name.length > 10) {
			shrinkValue = Math.round((tDev.name.length - 9) / 2);
			this.txtLabel.style.font = (15 - shrinkValue) + "px sans-serif";
			this.txtLabel.position.set((this.bounds[0][0] + 70 + glbBPadding), 
						(this.bounds[0][1] + glbBPadding + shrinkValue));
		}
		else {
			this.txtLabel.style.font = "15px sans-serif";
		}

		// Grey out disabled buttons
		if (!this.enabled) {
			this.sprFirst.tint = rgbToHclr([150, 150, 150]);
			this.sprSecond.tint = rgbToHclr([150, 150, 150]);
			this.txtLabel.alpha = 0.5;
			for (let iii = 0; iii < 3; iii++ ) {
				if (tDev.checkCost(tResource[iii])) { this.txtCost[iii].alpha = 0.5; }
			}
		}
	}
}