/// <reference path="references.ts" />

class BuildBar extends SideBar {
	buttonArray: ArcButton[] = [];

	formBar() {
		this.buttonArray[0] = new ArcButton("other", null, "Back");
		this.displayBar();
	}

	displayBar() {
		this.buttonArray[0].displayButton([this.oriB[0], (renderer.height - 50)]);
	}

	removeBar() {
		stage.removeChild(this.buttonArray[0].sprBg);
		stage.removeChild(this.buttonArray[0].txtLabel);
		this.buttonArray = [];
	}

	clickBar() {
		// Back button
		if (this.buttonArray[0].withinButton([pointer.x, pointer.y])) {
			veClearTint(glbPulseArray);
			glbTileSelArray = []; glbPulseArray = [];
			if (glbMonth === 0) { 
				glbState = editSetup;
				glbPointerDown = false; // Fix for stuck pointer after hitting back button
				}
			else { glbState = buySetup; }
		}
	}

	hoverOverBar() {
		this.baseHoverBar();
	}
}