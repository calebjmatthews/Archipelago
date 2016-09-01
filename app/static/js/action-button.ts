/// <reference path="references.ts" />

class ActionButton extends ArcButton {

	formHexBounds(setOrigin: number[]) {
		this.bounds[0] = [];
		this.bounds[1] = [];
		this.bounds[2] = [];
		this.bounds[3] = [];

		this.bounds[0] = [setOrigin[0], setOrigin[1]];
		this.bounds[1] = [(setOrigin[0] + glbHWidth), setOrigin[1]];
		this.bounds[2] = [(setOrigin[0] + glbHWidth), (setOrigin[1] + glbHHeight)];
		this.bounds[3] = [setOrigin[0], (setOrigin[1] + glbHHeight)];
	}

	displayOtherAction(setOrigin: number[]) {
		// Display initially transparent background
		this.displayButton(setOrigin);

		// Display the black outline
		this.sprFirst = new Sprite(sprMed["hex.png"]);
		this.sprFirst.position.set((this.bounds[0][0] + glbBPadding), 
			                         (this.bounds[0][1] + glbBPadding));
		this.sprFirst.scale.set(0.2, 0.2);
		stage.addChild(this.sprFirst);

		// Display the icon
		let sprOAName = "";
		if (this.otherName === "Build") { sprOAName = "build.png"; }
		else if (this.otherName === "Pass") { sprOAName = "pass.png"; }
		this.sprSecond = new Sprite(sprMed[sprOAName]);
		this.sprSecond.scale.set(0.2, 0.2);
		this.sprSecond.position.set((this.bounds[0][0] + glbBPadding), 
			                          (this.bounds[0][1] + glbBPadding - 30));
		stage.addChild(this.sprSecond);

		// Display the related text
		this.displayTextLayer(this.otherName, 
			[(this.bounds[0][0] + 73), (this.bounds[0][1]) + 7]);
	}

	displayCounter(setOrigin: number[]) {
		this.bounds[0] = setOrigin;
		let setText = ("Actions: " + currPlayer.actions + "/" + 
			(currPlayer.actions + currPlayer.actionHistory.length));
		this.txtLabel = new Text(setText, 
			{font: "18px sans-serif", fill: "white"});
		this.txtLabel.position.set(this.bounds[0][0], this.bounds[0][1]);
		stage.addChild(this.txtLabel);
	}

	displayActiveSlot(setOrigin: number[]) {
		this.formHexBounds(setOrigin);
		// Display the white background
		let randNum = Math.random()*3;
		let whiteHexNum = "";
		if (randNum < 1) { whiteHexNum = "whitehex.png"; }
		else if ((randNum > 1) && (randNum < 2)) { whiteHexNum = "whitehex2.png"; }
		else { whiteHexNum = "whitehex3.png"; }
		this.sprBg = new Sprite(sprMed[whiteHexNum]);
		this.sprBg.scale.set(0.2, 0.2);
		// Subtract hex height from sprite to correct for tallness
		this.sprBg.position.set(this.bounds[0][0], (this.bounds[0][1] - glbHHeight));
		stage.addChild(this.sprBg);

		if (currPlayer.actionHistory[this.id] != undefined) {
			if (currPlayer.actionHistory[this.id][0] === "development") {
				let tileId = currPlayer.actionHistory[this.id][1];
				let tSprName = develArray[currLand.tileArray[tileId].development].sprID[0];
				this.sprSecond = new Sprite(sprMed[tSprName]);
				this.sprSecond.scale.set(0.2, 0.2);
				this.sprSecond.position.set(this.bounds[0][0], (this.bounds[0][1] - 30));
				stage.addChild(this.sprSecond);
			}
		}
	}

	inActiveHex(corPoint: number[]) {
		// 1. Is the point within the possible range of any active hex?
		// 2. Is the point in this hex's bounding box?
		// 3. Which quadrant?  If not in upper right, translate point to upper right
		// 4. Is it outside the rectangular portion?
		// 5. Is it in the triangular point segment?
		// A "no" to any step (other than 3) ends the function and returns false

		let activePos = this.bounds[0];

		// Is the cursor point within the hex's bounding box?
		if ((corPoint[0] > activePos[0]) && (corPoint[0] < (activePos[0] + glbHWidth)) && 
				(corPoint[1] > activePos[1]) && (corPoint[1] < (activePos[1] + glbHHeight))) {
			return this.inActiveRect(activePos, corPoint);
		}
		else { return false; }
	}

	inActiveRect(activePos, corPoint) {
		// Which quadrant?  If not in upper right, translate point to upper right
		let diffX = Math.abs((activePos[0] + (glbHWidth/2)) - corPoint[0]);
		let diffY = Math.abs((activePos[1] + (glbHHeight/2)) - corPoint[1]);
		// Is the point within the rectangular segment?
		if (diffX < ((glbHWidth/2) - (glbHHeight/2))) {
			return true;
		}
		else {
			return this.inActiveTri(diffX, diffY);
		}
	}

	inActiveTri(diffX, diffY) {
		// Is the point within the triangular segment?
		// Begin by mirroring the x point horizontally
		let mirrX = (glbHHeight/2) - diffY;
		if (mirrX > diffY) { return true; }
		else { return false; }
	}
}