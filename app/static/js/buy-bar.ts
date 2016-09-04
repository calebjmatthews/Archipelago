/// <reference path="references.ts" />

class BuyBar extends SideBar {
	buttonArray: BuyButton[] = [];

	constructor() {
		// Blank super call, as SideBar doesn't have a constructor
		super();
		this.btmHeight = 40;
	}

	formBar() {
		// Organize the bar according to what can be bought
		// organizeByCost returns two arrays, one of buyable developments, and a second 
		//  array containing the remainer
		let joinedDArray = currLand.devSelection.organizeByCost();
		let buyableDSet: Development[] = joinedDArray[0];
		let rejectDSet: Development[] = joinedDArray[1];
		// Buy bar has the buttons for each development option and the "Back" button
		for (let cButton=0; cButton < buyableDSet.length; cButton++) {
			if (cButton < buyableDSet.length) {
				this.buttonArray[cButton] = new BuyButton("choice", 
					buyableDSet[cButton].id, null);
			}
			else {
				console.log("Error, unexpected menu button value.");
			}
		}
		for (let cButton = buyableDSet.length; 
			cButton < (buyableDSet.length + rejectDSet.length + 1); cButton++) {
			if (cButton < (buyableDSet.length + rejectDSet.length)) {
				this.buttonArray[cButton] = new BuyButton("choice", 
					rejectDSet[(cButton - buyableDSet.length)].id, null);
				this.buttonArray[cButton].enabled = false;
			}
			else if (cButton === (buyableDSet.length + rejectDSet.length)) {
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
		this.formMain();
		this.buttonArray[currLand.devSelection.dSet.length].displayButton([
			this.oriB[0], (renderer.height - 50)]);
	}

	formMain() {
		for (let cButton=0; cButton < (currLand.devSelection.dSet.length); cButton++) {
			if (this.buttonArray[cButton].nPage === this.cPage) {
				let displaySpot = cButton - (this.cPage * (this.slotsAvailable));
				this.buttonArray[cButton].displayChoice(
					[this.oriB[0], (this.oriB[1] + (displaySpot * 55))]);
			}
		}
	}

	removeBar() {
		for (let cButton=0; cButton < (currLand.devSelection.dSet.length + 3); cButton++) {
			if (cButton < currLand.devSelection.dSet.length) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].sprFirst);
				stage.removeChild(this.buttonArray[cButton].sprSecond);
				stage.removeChild(this.buttonArray[cButton].txtLabel);
			}
			else if (cButton === currLand.devSelection.dSet.length) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].txtLabel);
			}
			else if (cButton < currLand.devSelection.dSet.length + 3) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].sprFirst);
			}
			else {
				console.log("Error, unexpected menu button value.");
				break;
			}
		}
		this.buttonArray = [];
	}

	removeMain() {
		for (let cButton=0; cButton < (currLand.devSelection.dSet.length); cButton++) {
			if (cButton < currLand.devSelection.dSet.length) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].sprFirst);
				stage.removeChild(this.buttonArray[cButton].sprSecond);
				stage.removeChild(this.buttonArray[cButton].txtLabel);
				stage.removeChild(this.buttonArray[cButton].txtCost[0]);
				stage.removeChild(this.buttonArray[cButton].txtCost[1]);
				stage.removeChild(this.buttonArray[cButton].txtCost[2]);
			}
			else {
				console.log("Error, unexpected menu button value.");
				break;
			}
		}
	}

	clickBar() {
		this.baseClickBar();
		for (let cButton = 0; cButton < (currLand.devSelection.dSet.length + 1); cButton++) {
			if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {

				// Landscape / Development buttons
				if (cButton < currLand.devSelection.dSet.length) {
					glbBuildSel = this.buttonArray[cButton].id;
					glbState = buildSetup;
				}

				// Back button
				else if (cButton === currLand.devSelection.dSet.length) {
					glbState = active;
					glbSideBar.removeBar();
					glbSideBar = new ActionBar();
					glbSideBar.formBar();
				}

				else { console.log("Unexpected buy bar value."); }
			}			
		}
	}

	hoverOverBar() {
		let inAnyButton: boolean = false;
		for (let cButton=0; cButton < this.buttonArray.length; cButton++) {
			if ((this.buttonArray[cButton].nPage === this.cPage) || 
					(this.buttonArray[cButton].type === "other") || 
					(this.buttonArray[cButton].type === "page")) {
				if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {
					inAnyButton = true;
					if (this.buttonArray[cButton].enabled) {
						this.buttonArray[cButton].sprBg.alpha = 0.6;
					}

					if ((this.buttonArray[cButton].type === "choice") && 
						  (currHovDescCard === null)) {
						currHovDescCard = new DescCard([pointer.x, pointer.y], 
							develArray[this.buttonArray[cButton].id]);
					}
					else if ((this.buttonArray[cButton].type === "choice") && 
						  (currHovDescCard != null)) {
						if (currHovDescCard.devel.id === this.buttonArray[cButton].id) {
							continue;
						}
						else { currHovDescCard.selfDestruct(); }
					}
				}
				else {
					this.buttonArray[cButton].sprBg.alpha = 0;
				}
			}
		}
		if (!inAnyButton) {
			if (currHovDescCard != null) { currHovDescCard.selfDestruct(); }
		}
	}
}