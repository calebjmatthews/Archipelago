/// <reference path="references.ts" />

class BuyBar extends SideBar {
	buttonArray: BuyButton[] = [];

	formBar() {
		// The edit bar's origin for button placement
		let oriB = [renderer.width - 180, 20]; 
		// Edit bar has the buttons for each landscape, each black development, and the
		//  "Randomize" and "Finish" buttons
		for (let cButton=0; cButton < (currLand.devSelection.length + 1); cButton++) {
			if (cButton < currLand.devSelection.length) {
				this.buttonArray[cButton] = new BuyButton("choice", 
					currLand.devSelection[cButton], null, 
					[oriB[0], (oriB[1] + (cButton * 55))]);
				this.buttonArray[cButton].displayChoice();
			}
			else if (cButton === currLand.devSelection.length) {
				this.buttonArray[cButton] = new BuyButton("other", null, "Back", 
					[oriB[0], (renderer.height - 50)]);
				this.buttonArray[cButton].displayButton();
			}
			else {
				console.log("Error, unexpected menu button value.");
			}
		}
	}

	removeBar() {
		for (let cButton=0; cButton < (currLand.devSelection.length + 1); cButton++) {
			if (cButton < currLand.devSelection.length) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].sprFirst);
				stage.removeChild(this.buttonArray[cButton].sprSecond);
				stage.removeChild(this.buttonArray[cButton].txtLabel);
			}
			else if (cButton === currLand.devSelection.length) {
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

		for (let cButton = 0; cButton < (glbNumLscps + glbNumBlkDevels + 2); cButton++) {
			if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {

				// Landscape / Development buttons
				if (cButton < currLand.devSelection.length) {
					
				}

				// Back button
				else if (cButton === currLand.devSelection.length) {
					
				}

				else { console.log("Unexpected edit bar value."); }
			}			
		}
	}
}