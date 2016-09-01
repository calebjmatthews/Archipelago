/// <reference path="references.ts" />

class BuyBar extends SideBar {
	buttonArray: BuyButton[] = [];

	constructor() {
		// Blank super call, as SideBar doesn't have a constructor
		super();
		this.btmHeight = 40;
	}

	formBar() {
		// Edit bar has the buttons for each landscape, each black development, and the
		//  "Randomize" and "Finish" buttons
		for (let cButton=0; cButton < (currLand.devSelection.length + 1); cButton++) {
			if (cButton < currLand.devSelection.length) {
				this.buttonArray[cButton] = new BuyButton("choice", 
					currLand.devSelection[cButton], null);
			}
			else if (cButton === currLand.devSelection.length) {
				this.buttonArray[cButton] = new BuyButton("other", null, "Back");
			}
			else {
				console.log("Error, unexpected menu button value.");
			}
		}

		if (this.checkBarExcess() > 0) {
			this.formPageButtons();
			this.assignPageNumbers();
		}
		this.displayBar();
	}

	displayBar() {
		for (let cButton=0; cButton < (currLand.devSelection.length + 1); cButton++) {
			if ((cButton < currLand.devSelection.length) && 
				  (this.buttonArray[cButton].nPage === this.cPage)) {
				let displaySpot = cButton - (this.cPage * this.slotsAvailable);
				this.buttonArray[cButton].displayChoice(
					[this.oriB[0], (this.oriB[1] + (displaySpot * 55))]);
			}
			else if (cButton === currLand.devSelection.length) {
				this.buttonArray[cButton].displayButton([
					this.oriB[0], (renderer.height - 50)]);
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

	removeMain() {
		for (let cButton=0; cButton < (currLand.devSelection.length); cButton++) {
			if (cButton < currLand.devSelection.length) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].sprFirst);
				stage.removeChild(this.buttonArray[cButton].sprSecond);
				stage.removeChild(this.buttonArray[cButton].txtLabel);
			}
			else {
				console.log("Error, unexpected menu button value.");
				break;
			}
		}
	}

	clickBar() {
		this.baseClickBar();
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