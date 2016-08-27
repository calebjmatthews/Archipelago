/// <reference path="references.ts" />

class ActionButton extends ArcButton {

	constructor(setType: string, setId: number, setOtherName: string, 
			setOrigin: number[]) {
		super(setType, setId, setOtherName, setOrigin);

		this.formHexBounds(setOrigin);
	}

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

	displayActiveSlot() {
		this.sprBg = new Sprite(sprMed["whitehex.png"]);
		this.sprBg.scale.set(0.2, 0.2);
		this.sprBg.position.set([this.bounds[0], this.bounds[1]]);
		stage.addChild(this.sprBg);
	}

	withinActiveButton(givenPoint: number[]) {
		if (this.type === "active") {
			return this.inActiveHex(this.bounds[0], givenPoint);
		}
		else { return this.withinButton(givenPoint); }
	}

	inActiveHex(activePos: number[], corPoint: number[]) {
		// 1. Is the point within the possible range of any active hex?
		// 2. Is the point in this hex's bounding box?
		// 3. Which quadrant?  If not in upper right, translate point to upper right
		// 4. Is it outside the rectangular portion?
		// 5. Is it in the triangular point segment?
		// A "no" to any step (other than 3) ends the function and returns false

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