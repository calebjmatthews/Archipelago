/// <reference path="references.ts" />

class ActionBar extends SideBar {
	buttonArray: ActionButton[] = [];
	numActives: number = 0;

	constructor() {
		// Blank super call, as SideBar doesn't have a constructor
		super();
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
			xPos = 100 - (glbHWidth / 2);
			// Y positioning uses hex width in order to create an even margin on  both 
			//  top and sides
			yPos = (glbHWidth / 2) + (((activeSpot*1.3)/3) * glbHHeight);
		}
		else if (((activeSpot-1) % 3) === 0) {
			xPos = 100 - glbHWidth - (glbHWidth/2);
			yPos = 110 - glbHHeight - (glbHWidth / 2) + 
				((((activeSpot-1)*1.3)/3) * glbHHeight);
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
		yPos = yPos + 300;

		return [xPos, yPos];
	}

	formBar() {
		// The edit bar's origin for button placement
		let oriB = [renderer.width - 180, 20]; 
		// The action bar has buttons for each development in the player's hand, as well as
		//  "Build" and "Pass" buttons.  The bar also has a display of chosen actions (at 
		//  least three) at the bottom.
		for (let cButton=0; 
				cButton < (currPlayer.hand.length + 2 + this.numActives); cButton++) {
			if (cButton < currPlayer.hand.length) {
				this.buttonArray[cButton] = new ActionButton("development", 
					currPlayer.hand[cButton], null, [oriB[0], (oriB[1] + 20 + (cButton * 40))]);
			}
			else if (cButton === (currPlayer.hand.length)) {
				this.buttonArray[cButton] = new ActionButton("other", null, "Build", 
					[oriB[0], (oriB[1] + 20 + (cButton * 40))]);
			}
			else if (cButton === (currPlayer.hand.length)) {
				this.buttonArray[cButton] = new ActionButton("other", null, "Pass", 
					[oriB[0], (oriB[1] + 20 + (cButton * 40))]);
			}
			else if (cButton < (currPlayer.hand.length + 2 + this.numActives)) {
				this.buttonArray[cButton] = new ActionButton("active", null, null, 
					this.getActivePos(cButton - (currPlayer.hand.length + 2)));
			}
			else {
				console.log("Error, unexpected menu button value.");
			}
			if (this.buttonArray[cButton].type === "active") {
				this.buttonArray[cButton].displayActiveSlot();
			}
			else { this.buttonArray[cButton].displayButton(); }
		}
	}

	removeBar() {
		for (let cButton=0; 
				cButton < (currPlayer.hand.length + 2 + this.numActives); cButton++) {
			if (cButton < currPlayer.hand.length) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].sprFirst);
				stage.removeChild(this.buttonArray[cButton].sprSecond);
				stage.removeChild(this.buttonArray[cButton].txtLabel);
			}
			else if (cButton < (currPlayer.hand.length + 2)) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
				stage.removeChild(this.buttonArray[cButton].txtLabel);
			}
			else if (cButton < (currPlayer.hand.length + 2 + this.numActives)) {
				stage.removeChild(this.buttonArray[cButton].sprBg);
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
			if (this.buttonArray[cButton].withinActiveButton([pointer.x, pointer.y])) {
				this.buttonArray[cButton].sprBg.alpha = 0.6;
			}
			else if (glbEditBarSel === cButton) {
				this.buttonArray[cButton].sprBg.alpha = 0.4;
			}
			else {
				this.buttonArray[cButton].sprBg.alpha = 0;
			}
		}
	}
}