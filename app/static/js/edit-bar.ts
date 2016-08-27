/// <reference path="references.ts" />

class EditBar extends SideBar {

	formBar() {
		// The edit bar's origin for button placement
		let oriB = [renderer.width - 180, 20]; 
		// Edit bar has the buttons for each landscape, each black development, and the
		//  "Randomize" and "Finish" buttons
		for (let cButton=0; cButton < (glbNumLscps+glbNumBlkDevels+2); cButton++) {
			if (cButton < glbNumLscps) {
				this.buttonArray[cButton] = new ArcButton("landscape", cButton, null, 
					[oriB[0], (oriB[1] + (cButton * 40))]);
			}
			else if (cButton < (glbNumLscps + glbNumBlkDevels)) {
				this.buttonArray[cButton] = new ArcButton("development", (cButton - glbNumLscps), 
					null, [oriB[0], (oriB[1] + 20 + (cButton * 40))]);
			}
			else if (cButton === (glbNumLscps + glbNumBlkDevels)) {
				this.buttonArray[cButton] = new ArcButton("other", null, "Randomize", 
					[oriB[0], (renderer.height - 90)]);
			}
			else if (cButton === (glbNumLscps + glbNumBlkDevels + 1)) {
				this.buttonArray[cButton] = new ArcButton("other", null, "Finish", 
					[oriB[0], (renderer.height - 50)]);
			}
			else {
				console.log("Error, unexpected menu button value.");
			}
			this.buttonArray[cButton].displayButton();
		}
	}

	removeBar() {
		for (let cButton=0; cButton < (glbNumLscps+glbNumBlkDevels+2); cButton++) {
			if (cButton < glbNumLscps) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].sprFirst);
				stage.removeChild(this.buttonArray[cButton].txtLabel);
			}
			if (cButton < (glbNumLscps + glbNumBlkDevels)) {
				stage.removeChild(this.buttonArray[cButton].sprSecond);
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
		if (currDescCard != null) { currDescCard.selfDestruct(); }

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