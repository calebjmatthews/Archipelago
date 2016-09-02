/// <reference path="references.ts" />

class ActionBar extends SideBar {
	buttonArray: ActionButton[] = [];
	numActives: number = 0;

	constructor() {
		// Blank super call, as SideBar doesn't have a constructor
		super();
		this.btmHeight = 100;
		if (currPlayer.hand.length < 3) {
			this.numActives = 3;
		}
		else { this.numActives = currPlayer.hand.length; }
	}

	// Returns the x,y position of an active slot
	getActivePos(activeSpot) {
		let xPos = 0;
		let yPos = 0;
		if ((activeSpot % 3) === 0) {
			xPos = 100 - glbHWidth - (glbHWidth/2);
			yPos = 110 - glbHHeight - (glbHWidth / 2) + 
				((((activeSpot)*1.3)/3) * glbHHeight);
		}
		else if (((activeSpot-1) % 3) === 0) {
			xPos = 100 - (glbHWidth / 2);
			// Y positioning uses hex width in order to create an even margin on  both 
			//  top and sides
			yPos = (glbHWidth / 2) + ((((activeSpot-1)*1.3)/3) * glbHHeight);
		}
		else if (((activeSpot-2) % 3) === 0) {
			xPos = 100 + (glbHWidth/2);
			yPos = 110 - glbHHeight - (glbHWidth / 2) + 
				((((activeSpot-2)*1.3)/3) * glbHHeight);
		}
		else {
			console.log("Error, unexpected development hand value.");
		}
		// Corect for position of sidebar
		xPos = renderer.width - 200 + xPos;
		// Move the active selection to the bottom of the window
		yPos = yPos + 450;

		return [xPos, yPos];
	}

	formBar() {
		// The action bar has buttons for each development in the player's hand, as well as
		//  "Build" and "Pass" buttons.  The bar also has a display of chosen actions (at 
		//  least three) at the bottom.
		for (let cButton=0; 
				cButton < (currPlayer.hand.length + 3 + this.numActives); cButton++) {
			if (cButton < currPlayer.hand.length) {
				this.buttonArray[cButton] = new ActionButton("development", 
					(currLand.tileArray[currPlayer.hand[cButton]].development), null);
			}
			else if (cButton === (currPlayer.hand.length)) {
				this.buttonArray[cButton] = new ActionButton("otherAction", null, "Build");
			}
			else if (cButton === (currPlayer.hand.length + 1)) {
				this.buttonArray[cButton] = new ActionButton("otherAction", null, "Pass");
			}
			else if (cButton === (currPlayer.hand.length + 2)) {
				this.buttonArray[cButton] = new ActionButton("counter", null, "Actions");
			}
			else if (cButton < (currPlayer.hand.length + 3 + this.numActives)) {
				this.buttonArray[cButton] = new ActionButton("active", 
					(cButton - (currPlayer.hand.length + 3)), null);
			}
			else {
				console.log("Error, unexpected menu button value.");
			}
		}
		this.displayBar();
	}

	displayBar() {
		for (let cButton=0; 
				cButton < (currPlayer.hand.length + 3 + this.numActives); cButton++) {
			if (this.buttonArray[cButton].type === "active") {
				this.buttonArray[cButton].displayActiveSlot(
					this.getActivePos(cButton - (currPlayer.hand.length + 3)));
			}
			else if (this.buttonArray[cButton].type === "otherAction") {
				this.buttonArray[cButton].displayOtherAction(
					[this.oriB[0], (this.oriB[1] + 20 + (cButton * 40))]);
			}
			else if (this.buttonArray[cButton].type === "counter") {
				this.buttonArray[cButton].displayCounter([this.oriB[0], (this.oriB[1] + 425)]);
			}
			else { this.buttonArray[cButton].displayButton(
				[this.oriB[0], (this.oriB[1] + 20 + (cButton * 40))]); }
		}
	}

	removeBar() {
		for (let cButton=0; 
				cButton < (currPlayer.hand.length + 3 + this.numActives); cButton++) {
			if (cButton < currPlayer.hand.length + 2) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].sprFirst);
				stage.removeChild(this.buttonArray[cButton].sprSecond);
				stage.removeChild(this.buttonArray[cButton].txtLabel);
			}
			else if (cButton === (currPlayer.hand.length + 2)) {
				stage.removeChild(this.buttonArray[cButton].txtLabel);
			}
			else if (cButton < (currPlayer.hand.length + 3 + this.numActives)) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].sprSecond);
			}
			else {
				console.log("Error, unexpected menu button value.");
				break;
			}
		}
		this.buttonArray = [];
	}

	hoverOverBar() {
		for (let cButton=0; cButton < this.buttonArray.length; cButton++) {
			if (this.buttonArray[cButton].type === "active") {
				if (this.buttonArray[cButton].inActiveHex([pointer.x, pointer.y])) {
					this.buttonArray[cButton].sprBg.tint = rgbToHclr([150, 150, 150]);
				}
				else {
					this.buttonArray[cButton].sprBg.tint = rgbToHclr([255, 255, 255]);
				}
			}
			else if (this.buttonArray[cButton].type === "counter") { continue; }
			else { 
				if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {
					this.buttonArray[cButton].sprBg.alpha = 0.6;
				}
				else {
					this.buttonArray[cButton].sprBg.alpha = 0;
				}
			}
		}
	}

	clickBar() {
		this.baseClickBar();
		for (let cButton = 0; 
				cButton < (currPlayer.hand.length + 3 + this.numActives); cButton++) {
			if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {

				// Development buttons
				if (cButton < currPlayer.hand.length) {
					applyDevEffect(currPlayer.hand[cButton]);
				}

				// Build button
				else if (cButton === currPlayer.hand.length) {
					glbState = buySetup;
				}

				// Pass button
				else if (cButton === (currPlayer.hand.length+1)) {
					
				}
				else { console.log("Unexpected edit bar value."); }
			}			
		}
	}
}