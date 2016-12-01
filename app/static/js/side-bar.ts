/// <reference path="references.ts" />

class SideBar {
	buttonArray: ArcButton[] = [];
	// The current page state of the bar, in case of overflow
	cPage: number = 0;
	nPages: number = 1;
	// The origin for placement of non-navigational buttons
	oriB: number[] = [renderer.width - 180, 20];
	// The pixel height of bottom-anchored elements that a given bar possesses
	btmHeight: number = 0;
	// The number of standard buttons that can fit in a bar's page, in case of overflow
	slotsAvailable: number = null;

	// Create the black background that exists for all sidebars
	formBacking() {
		var designBG = new PIXI.Graphics();
		designBG.beginFill(0x000000);
		designBG.drawRect(0, 0, 200, (renderer.height));
		designBG.endFill();
		designBG.x = renderer.width-200;
		designBG.y = 0;
		stage.addChild(designBG);
	}

	baseHoverBar() {
		for (let cButton=0; cButton < this.buttonArray.length; cButton++) {
			if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {
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

	checkBarExcess() {
		let barMax = this.buttonArray.length * (this.buttonArray[0].bHeight + 10);
		let overflowRatio = Math.ceil((renderer.height - this.btmHeight) / barMax);
		if (overflowRatio < 1) { return 0; }
		else { return overflowRatio; }
	}

	// The top and bottom page buttons will be the final members of the buttonArray
	formPageButtons() {
		// Push the standard buttons down to allow room for top page button
		this.oriB[1] += 40;
		// Form top button
		this.buttonArray[this.buttonArray.length] = new ArcButton("page", 0, null);
		this.buttonArray[(this.buttonArray.length - 1)].bWidth = 140;
		this.buttonArray[(this.buttonArray.length - 1)].bHeight = 20;
		this.buttonArray[(this.buttonArray.length - 1)].enabled = false;
		this.buttonArray[(this.buttonArray.length - 1)].displayButton(
			[(renderer.width - 200 + 30), 20]);
		// Form bottom button
		this.buttonArray[this.buttonArray.length] = new ArcButton("page", 1, null);
		this.buttonArray[(this.buttonArray.length - 1)].bWidth = 140;
		this.buttonArray[(this.buttonArray.length - 1)].bHeight = 20;
		this.buttonArray[(this.buttonArray.length - 1)].displayButton(
			[(renderer.width - 200 + 30), (renderer.height - 50 - this.btmHeight)]);
	}

	assignPageNumbers() {
		let buttonFullHeight = this.buttonArray[0].bHeight + 10;
		let barMax = this.buttonArray.length * (buttonFullHeight);
		let spaceAvailable = renderer.height - 40 - this.btmHeight;
		let displayRatio = ( spaceAvailable / barMax);
		this.slotsAvailable = Math.floor(spaceAvailable / buttonFullHeight) - 1;

		for (let cButton = 0; cButton < (this.buttonArray.length - 2); cButton++) {
			this.buttonArray[cButton].nPage = Math.floor(
				((cButton+1)/(this.buttonArray.length-2)) / displayRatio);
			// Set the side bar's number of pages to the page of the final element
			if (cButton === this.buttonArray.length - 3) {
				this.nPages = this.buttonArray[cButton].nPage + 1;
			}
		}
	}

	baseClickBar() {
		if (currDescCard != null) { currDescCard.selfDestruct(); }

		if (this.nPages > 1) { // If the page up/down buttons exist
			// Up button
			if ((this.buttonArray[this.buttonArray.length - 2].
						withinButton([pointer.x, pointer.y])) && 
					(this.cPage > 0)) {
				this.cPage--;
				this.removeMain();
				this.formMain();
			}

			// Down button
			else if ((this.buttonArray[this.buttonArray.length - 1].
								withinButton([pointer.x, pointer.y])) &&
							 (this.cPage < (this.nPages - 1))) {
				this.cPage++;
				this.removeMain();
				this.formMain();
			}

			// If pages can be navigated to, enable page up/down buttons and vice versa
			if (this.cPage > 0) {
				this.buttonArray[this.buttonArray.length - 2].enabled = true;
				this.buttonArray[this.buttonArray.length - 2].sprFirst.alpha = 1;
			}
			else {
				this.buttonArray[this.buttonArray.length - 2].enabled = false;
				this.buttonArray[this.buttonArray.length - 2].sprFirst.alpha = 0.5;
			}
			if (this.cPage < (this.nPages - 1)) {
				this.buttonArray[this.buttonArray.length - 1].enabled = true;
				this.buttonArray[this.buttonArray.length - 1].sprFirst.alpha = 1;
			}
			else {
				this.buttonArray[this.buttonArray.length - 1].enabled = false;
				this.buttonArray[this.buttonArray.length - 1].sprFirst.alpha = 0.5;
			}
		}
	}

	// Empty function allows the parent to call the child class's method
	removeBar() { }
	displayBar() { }
	removeMain() { }
	formMain() { }
}