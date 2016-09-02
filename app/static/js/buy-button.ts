/// <reference path="references.ts" />

class BuyButton extends ArcButton {
	constructor(setType: string, setId: number, setOtherName: string) {
		super(setType, setId, setOtherName);
		if (this.type === "choice") { this.bHeight = glbBHeight*1.5; }
	}

	displayChoice(setOrigin: number[]) {
		this.displayButton(setOrigin);
		this.displayDevButton();
		let tDev = develArray[this.id];

		// Shrink the development's name so that it fits into the button
		let shrinkValue = 0;
		if (tDev.name.length > 10) {
			shrinkValue = Math.round((tDev.name.length - 9) / 2);
			this.txtLabel.style.font = (15 - shrinkValue) + "px sans-serif";
		}
		else {
			this.txtLabel.style.font = "15px sans-serif";
		}

		// Grey out disabled buttons
		if (!this.enabled) {
			this.sprFirst.tint = rgbToHclr([150, 150, 150]);
			this.sprSecond.tint = rgbToHclr([150, 150, 150]);
			this.txtLabel.alpha = 0.5;
		}
	}
}