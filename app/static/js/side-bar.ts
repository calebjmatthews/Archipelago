/// <reference path="references.ts" />

class SideBar {
	buttonArray: ArcButton[] = [];

	// Create the black background that exists for all sidebars
	formBacking() {
		var designBG = new Graphics();
		designBG.beginFill(0x000000);
		designBG.drawRect(0, 0, 200, (renderer.height));
		designBG.endFill();
		designBG.x = renderer.width-200;
		designBG.y = 0;
		stage.addChild(designBG);
	}

	hoverOverBar() {
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
		let overflowRatio = Math.ceil((renderer.height - 80) / barMax);
		if (overflowRatio < 1) { return 0; }
		else { return overflowRatio; }
	}

	formPageButtons() {

	}
}