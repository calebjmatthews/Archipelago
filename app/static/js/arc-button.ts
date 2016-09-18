/// <reference path="references.ts" />

class ArcButton {
	// Set the height and width of the button to the defaults
	bWidth: number = glbBWidth;
	bHeight: number = glbBHeight;
	// Which navitagional page the button belongs to
	nPage: number = 0;
	// What the button represents, e.g. landscape, development, or other
	type: string = null;
	// This id links the button to another element, e.g. for a development-type button
	//  this would be the related development's id
	id: number = null;
	// If this is an other-type button the id will be null and this name will signify the
	//  button's name and function
	otherName: string = null;
	// An array of four numbers that defines the bounds of the button, from the upper left
	//  point and continuing clockwise
	bounds: number[][] = [];
	// Whether or not the button is able to be clicked, has a graphical effect
	enabled: boolean = true;
	// Sprite for the initially invisible button background
	sprBg: Sprite;
	// Sprite for the first layer of the button's visual
	sprFirst: Sprite;
	// Sprite for a second layer, applied on top of the first
	sprSecond: Sprite;
	// The button's text label
	txtLabel: Text;

	constructor(setType: string, setId: number, setOtherName: string) {
		this.type = setType;
		this.id = setId;
		this.otherName = setOtherName;
	}

	formStandardBounds(setOrigin: number[]) {
		// Initialize the four empty points that describe the button's boundaries
		this.bounds[0] = []; this.bounds[1] = []; this.bounds[2] = []; this.bounds[3] = [];

		this.bounds[0] = [(setOrigin[0] - glbBPadding), 
		                  (setOrigin[1] - glbBPadding)];
		this.bounds[1] = [(setOrigin[0] + this.bWidth + glbBPadding), 
		                  (setOrigin[1] - glbBPadding)];
		this.bounds[2] = [(setOrigin[0] + this.bWidth + glbBPadding), 
		                  (setOrigin[1] + this.bHeight + glbBPadding)];
		this.bounds[3] = [(setOrigin[0] - glbBPadding), 
		                  (setOrigin[1] + this.bHeight + glbBPadding)];
	}

	displayButton(setOrigin: number[]) {
		this.formStandardBounds(setOrigin);

		// Initially invisible background for hovering/selecting effects
		this.sprBg = new Graphics();
		this.sprBg.beginFill(0xFFFFFF);
		this.sprBg.drawRect(0, 0, (this.bWidth + (glbBPadding*2)), 
			                        (this.bHeight+ (glbBPadding*2)));
		this.sprBg.endFill();
		this.sprBg.x = this.bounds[0][0];
		this.sprBg.y = this.bounds[0][1];
		this.sprBg.alpha = 0;
		stage.addChild(this.sprBg);

		if (this.type === "landscape") { this.displayLscpButton(); }
		else if (this.type === "development") { this.displayDevButton(); }
		else if (this.type === "page") { this.displayPageButton(); }
		else if (this.type === "other") {
			this.displayTextLayer(this.otherName, 
				[(this.bounds[0][0] + glbBPadding), (this.bounds[0][1] + 5 + glbBPadding)]);
		}

		// Greyed text and sprites for inactive buttons
		if (!this.enabled) {
			if (this.txtLabel != undefined) { this.txtLabel.alpha = 0.5; }
			if (this.sprFirst != undefined) {
				this.sprFirst.tint = rgbToHclr([150, 150, 150]); 
			}
			if (this.sprSecond != undefined) {
				this.sprSecond.tint = rgbToHclr([150, 150, 150]); 
			}
		}
	}

	displayLscpLayer(lscpId: number) {
		// Display the landscape tile in question
		this.sprFirst = new Sprite(sprMed[lscpArray[lscpId].sprID]);
		this.sprFirst.position.set((this.bounds[0][0] + glbBPadding), 
			                         (this.bounds[0][1] + glbBPadding));
		this.sprFirst.scale.set(0.2, 0.2);
		stage.addChild(this.sprFirst);
	}

	displayTextLayer(setText: string, location: number[]) {
		this.txtLabel = new Text(setText, 
			{font: "16px sans-serif", fill: "white"});
		this.txtLabel.position.set(location[0], location[1]);
		stage.addChild(this.txtLabel);

		// Shrink the development's name so that it fits into the button
		let shrinkValue = 0;
		if (setText.length > 10) {
			shrinkValue = Math.round((setText.length - 9) / 2);
			this.txtLabel.style.font = (15 - shrinkValue) + "px sans-serif";
			this.txtLabel.position.set = (location[0], (location[1] + shrinkValue));
		}
		else {
			this.txtLabel.style.font = "15px sans-serif";
		}
	}

	displayLscpButton() {
		this.displayLscpLayer(this.id);
		this.displayTextLayer(lscpArray[this.id].name, 
			[(this.bounds[0][0] + 70 + glbBPadding), (this.bounds[0][1] + 5 + glbBPadding)]);
	}

	displayDevButton() {
		// Display a sprite of the landscape required by this development
		this.displayLscpLayer(develArray[this.id].lscpRequired[0]);
		this.displayTextLayer(develArray[this.id].name, 
			[(this.bounds[0][0] + 70 + glbBPadding), (this.bounds[0][1] + 5 + glbBPadding)]);

		// Display the first development in the array above the landscape tile, 30 pixels
		//  higher to account for the extra height of development sprites
		this.sprSecond = new Sprite(sprMed[develArray[this.id].sprID[0]]);
		this.sprSecond.scale.set(0.2, 0.2);
		this.sprSecond.position.set((this.bounds[0][0] + glbBPadding), 
			                          (this.bounds[0][1] + glbBPadding - 30));
		stage.addChild(this.sprSecond);
	}

	displayPageButton() {
		this.sprFirst = null;
		if (this.id === 0) {
			this.sprFirst = new Sprite(sprMed["uparrow.png"]);
		}
		else if (this.id === 1) {
			this.sprFirst = new Sprite(sprMed["downarrow.png"]);
		}
		
		this.sprFirst.position.set((this.bounds[0][0] + glbBPadding), 
			                         (this.bounds[0][1] + glbBPadding));
		if (!this.enabled) { this.sprFirst.alpha = 0.5; }
		stage.addChild(this.sprFirst);
	}

	withinButton(givenPoint: number[]) {
		if (((this.nPage === glbSideBar.cPage) || (this.type === "page") || 
					(this.type === "other")) &&
				(givenPoint[0] > this.bounds[0][0]) && (givenPoint[0] < this.bounds[2][0]) && 
			  (givenPoint[1] > this.bounds[0][1]) && (givenPoint[1] < this.bounds[2][1])) {
			return true;
		}
		else {
			return false;
		}
	}
}