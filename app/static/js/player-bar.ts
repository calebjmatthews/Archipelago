/// <reference path="references.ts" />

class PlayerBar {
	background: PIXI.Sprite;
	banner: PIXI.Sprite[] = [];
	txtPieces: PIXI.Text[] = [];
	resIcons: PIXI.Sprite[] = [];

	constructor() {
		this.formPlayerBar();
	}

	formPlayerBar() {
		// Create blank background for player bar
		this.background = new PIXI.Sprite(sprMed["playerbar.png"]);
		this.background.position.set(0,0);
		
		stage.addChild(this.background);

		this.updatePlayerBar();
	}

	updatePlayerBar() {
		if (this.txtPieces.length != 0) {
			for (let iii = 0; iii < this.txtPieces.length; iii++) {
				stage.removeChild(this.txtPieces[iii]);
			}
			this.txtPieces = [];
		}
		if (this.resIcons.length != 0) {
			for (let iii = 0; iii < this.resIcons.length; iii++) {
				stage.removeChild(this.resIcons[iii]);
			}
			this.resIcons = [];
		}

		let styleObj: Object = {font: "16px Helvetica Neue, Helvetica, Arial, sans-serif", 
			fill: "black"};

		this.txtPieces.push(new PIXI.Text(("Month " + glbMonth), styleObj));
		this.txtPieces[0].position.set(3, 6);
		for (let tPlr = 0; tPlr < cPlayerArray.length; tPlr++) {
			this.banner.push(new PIXI.Sprite(sprMed["playerbanner.png"]));
			this.banner[(this.banner.length - 1)].position.set((83 + 240 * (tPlr)), 0);
			// this.banner[(this.banner.length - 1)].scale.set(0.6, 0.6);
			this.banner[(this.banner.length - 1)].tint = rgbToHclr(cPlayerArray[tPlr].color);

			this.txtPieces.push(new PIXI.Text(("Player " + (cPlayerArray[tPlr].playerOrder+1) 
				+ ": " + cPlayerArray[tPlr].food + "        " + cPlayerArray[tPlr].material 
				+ "        " + cPlayerArray[tPlr].treasure), styleObj));
			this.txtPieces[(this.txtPieces.length - 1)].position.set((85 + 240 * (tPlr)), 6);

			this.resIcons.push(new PIXI.Sprite(sprMed["foodicon.png"]));
			this.resIcons[(this.resIcons.length - 1)].scale.set(0.5, 0.5);
			this.resIcons[(this.resIcons.length - 1)].position.set((162 + 240 * (tPlr)), 2);

			this.resIcons.push(new PIXI.Sprite(sprMed["materialicon.png"]));
			this.resIcons[(this.resIcons.length - 1)].scale.set(0.5, 0.5);
			this.resIcons[(this.resIcons.length - 1)].position.set((207 + 240 * (tPlr)), 2);

			this.resIcons.push(new PIXI.Sprite(sprMed["treasureicon.png"]));
			this.resIcons[(this.resIcons.length - 1)].scale.set(0.5, 0.5);
			this.resIcons[(this.resIcons.length - 1)].position.set((252 + 240 * (tPlr)), 2);
		}

		for (let iii = 0; iii < this.banner.length; iii++) {
			stage.addChild(this.banner[iii]);
		}
		for (let iii = 0; iii < this.txtPieces.length; iii++) {
			stage.addChild(this.txtPieces[iii]);
		}
		for (let iii = 0; iii < this.resIcons.length; iii++) {
			stage.addChild(this.resIcons[iii]);
		}
	}
}