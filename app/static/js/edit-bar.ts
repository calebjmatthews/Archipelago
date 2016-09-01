/// <reference path="references.ts" />

class EditBar extends SideBar {

	constructor() {
		// Blank super call, as SideBar doesn't have a constructor
		super();
		this.btmHeight = 80;
	}

	formBar() {
		// Edit bar has the buttons for each landscape, each black development, and the
		//  "Randomize" and "Finish" buttons
		for (let cButton=0; cButton < (glbNumLscps+glbNumBlkDevels+2); cButton++) {
			if (cButton < glbNumLscps) {
				this.buttonArray[cButton] = new ArcButton("landscape", cButton, null);
			}
			else if (cButton < (glbNumLscps + glbNumBlkDevels)) {
				this.buttonArray[cButton] = new ArcButton("development", 
					(cButton - glbNumLscps), null);
			}
			else if (cButton === (glbNumLscps + glbNumBlkDevels)) {
				this.buttonArray[cButton] = new ArcButton("other", null, "Randomize");
			}
			else if (cButton === (glbNumLscps + glbNumBlkDevels + 1)) {
				this.buttonArray[cButton] = new ArcButton("other", null, "Finish");
			}
			else {
				console.log("Error, unexpected menu button value.");
			}
		}
		this.displayBar();
	}

	displayBar() {
		for (let cButton=0; cButton < (glbNumLscps+glbNumBlkDevels+2); cButton++) {
			if (cButton < glbNumLscps) {
				this.buttonArray[cButton].displayButton(
					[this.oriB[0], (this.oriB[1] + (cButton * 40))]);
			}
			else if (cButton < (glbNumLscps + glbNumBlkDevels)) {
				this.buttonArray[cButton].displayButton(
					[this.oriB[0], (this.oriB[1] + 20 + (cButton * 40))]);
			}
			else if (cButton === (glbNumLscps + glbNumBlkDevels)) {
				this.buttonArray[cButton].displayButton([this.oriB[0], (renderer.height - 90)]);
			}
			else if (cButton === (glbNumLscps + glbNumBlkDevels + 1)) {
				this.buttonArray[cButton].displayButton([this.oriB[0], (renderer.height - 50)]);
			}
			else {
				console.log("Error, unexpected menu button value.");
			}
		}
	}

	removeBar() {
		for (let cButton=0; cButton < (glbNumLscps+glbNumBlkDevels+2); cButton++) {
			if (cButton < glbNumLscps) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].sprFirst);
				stage.removeChild(this.buttonArray[cButton].txtLabel);
			}
			else if ((cButton > (glbNumLscps - 1)) && 
				  (cButton < (glbNumLscps + glbNumBlkDevels))) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].sprFirst);
				stage.removeChild(this.buttonArray[cButton].sprSecond);
				stage.removeChild(this.buttonArray[cButton].txtLabel);
			}
			else if (cButton < (glbNumLscps + glbNumBlkDevels + 2)) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].txtLabel);
			}
			else {
				console.log("Error, unexpected menu button value.");
				break;
			}
		}
		this.buttonArray = [];
	}

	clickBar() {
		let actionTaken = false;
		for (let cButton = 0; cButton < (glbNumLscps + glbNumBlkDevels + 2); cButton++) {
			if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {

				// Landscape / Development buttons
				if (cButton < (glbNumLscps + glbNumBlkDevels)) {
					glbPainting = cButton;
					glbEditBarSel = cButton;
					actionTaken = true;
				}

				// Randomize button
				else if (cButton === (glbNumLscps+glbNumBlkDevels)) {
					currLand.generateLand();
					currLand.genDevSelection();
					currLand.refreshLandSpr();
				}

				// Finish button
				else if (cButton === (glbNumLscps+glbNumBlkDevels+1)) {
					glbState = buildSetup;
				}
				else { console.log("Unexpected edit bar value."); }
			}			
		}
		if (!actionTaken) {
			glbPainting = null;
			glbEditBarSel = null;
		}
	}
}