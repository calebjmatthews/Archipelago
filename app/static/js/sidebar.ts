/// <reference path="references.ts" />

/*
Things the sidebar should accomplish:
1.  Create the black backing as soon as the board is created
2.  Figure out what the members need to be.  This will depend of the sidebar type.
2a. For edit bars there will be the following:
  - Button bg, tile bg, and text for each landscape type
  - Button bg, tile bg, development sprite, and text for each development type
  - "Randomize" and "finish" buttons on the bottom
*/

class SideBar {
	style: string = null;
	bgArray: Sprite[] = [];
	sprArray: Sprite[] = [];
	msgArray: Text[] = [];
	buttonArray: ArcButton[] = [];

	constructor(setStyle: string) {
		this.style = setStyle;
	}

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

	formBar() {
		this.buttonArray = this.formButtons();
	}

	formButtons() {
		
	}
}

var editBgArray = [];
var editBtnArray = [];
var devEditArray = [];
var editMsgArray = [];
function formEditBar() {
	// Since the edit bar includes both landscapes and some black developments, the
	//  for loop needs to be compensate for the total number of options when iterating
	//  through black developments

	// Create blank background for edit bar
	var designBG = new Graphics();
	designBG.beginFill(0x000000);
	designBG.drawRect(0, 0, 200, (renderer.height));
	designBG.endFill();
	designBG.x = renderer.width-200;
	designBG.y = 0;
	stage.addChild(designBG);

	for (var cButton=0; cButton < (glbNumLscps+glbNumBlkDevels+2); cButton++) {
		var chosenPng = null;
		var chosenText = null;
		let bScale = 0.2;
		if (cButton < glbNumLscps) {
			// Initially invisible background for hovering/selecting effects
			editBgArray[cButton] = new Graphics();
			editBgArray[cButton].beginFill(0xFFFFFF);
			editBgArray[cButton].drawRect(0, 0, 160, 30);
			editBgArray[cButton].endFill();
			editBgArray[cButton].x = (renderer.width - 180);
			editBgArray[cButton].y = (20 + (40*cButton));
			editBgArray[cButton].alpha = 0;
			stage.addChild(editBgArray[cButton]);

			// An example of the landscape tile in question
			editBtnArray[cButton] = new Sprite(sprMed[lscpArray[cButton].sprID]);
			editBtnArray[cButton].position.set((renderer.width-180), (20+40*cButton));
			editBtnArray[cButton].scale.set(bScale, bScale);
			stage.addChild(editBtnArray[cButton]);

			// Accompanying text
			editMsgArray[cButton] = new Text((lscpArray[cButton].name), 
			{font: "16px sans-serif", fill: "white"});
			editMsgArray[cButton].position.set((renderer.width-110), (25+40*cButton));
			stage.addChild(editMsgArray[cButton]);
		}

		else if ((cButton >= glbNumLscps) && (cButton < (glbNumLscps+glbNumBlkDevels))) {
			// Initially invisible background for hovering/selecting effects
			editBgArray[cButton] = new Graphics();
			editBgArray[cButton].beginFill(0xFFFFFF);
			editBgArray[cButton].drawRect(0, 0, 160, 30);
			editBgArray[cButton].endFill();
			editBgArray[cButton].x = (renderer.width - 180);
			editBgArray[cButton].y = (50 + (40*cButton));
			editBgArray[cButton].alpha = 0;
			stage.addChild(editBgArray[cButton]);

			// Create the required landscape's sprite
			let bgLscp = develArray[cButton-glbNumLscps].lscpRequired[0];
			editBtnArray[cButton] = new Sprite(sprMed[lscpArray[bgLscp].sprID]);
			editBtnArray[cButton].position.set((renderer.width-180), (50 + 40*cButton));
			editBtnArray[cButton].scale.set(bScale, bScale);
			stage.addChild(editBtnArray[cButton]);

			// Create the development sprite
			chosenText = develArray[cButton-glbNumLscps].name;
			let devSprID = develArray[cButton-glbNumLscps].sprID[0];
			let tDevSpr = new Sprite(sprMed[devSprID]);
			tDevSpr.scale.set(bScale, bScale);
			tDevSpr.position.set((renderer.width-180), (20+40*cButton));
			stage.addChild(tDevSpr);
			devEditArray[cButton-glbNumLscps] = tDevSpr;

			// Accompanying text
			editMsgArray[cButton] = new Text((chosenText), 
			{font: "16px sans-serif", fill: "white"});
			editMsgArray[cButton].position.set((renderer.width-110), (55 + 40*cButton));
			stage.addChild(editMsgArray[cButton]);
		}
		// Randomize button
		else if (cButton === (glbNumLscps+glbNumBlkDevels)) {
			// Initially invisible background for hovering/selecting effects
			editBgArray[cButton] = new Graphics();
			editBgArray[cButton].beginFill(0xFFFFFF);
			editBgArray[cButton].drawRect(0, 0, 160, 30);
			editBgArray[cButton].endFill();
			editBgArray[cButton].x = (renderer.width - 180);
			editBgArray[cButton].y = (renderer.height - 90);
			editBgArray[cButton].alpha = 0;
			stage.addChild(editBgArray[cButton]);

			// Accompanying text
			editMsgArray[cButton] = new Text(("Randomize"), 
				{font: "18px sans-serif", fill: "white"});
			editMsgArray[cButton].position.set((renderer.width-175), (renderer.height-85));
			stage.addChild(editMsgArray[cButton]);
		}
		// Finish button
		else if (cButton === (glbNumLscps+glbNumBlkDevels+1)) {
			// Initially invisible background for hovering/selecting effects
			editBgArray[cButton] = new Graphics();
			editBgArray[cButton].beginFill(0xFFFFFF);
			editBgArray[cButton].drawRect(0, 0, 160, 30);
			editBgArray[cButton].endFill();
			editBgArray[cButton].x = (renderer.width - 180);
			editBgArray[cButton].y = (renderer.height - 50);
			editBgArray[cButton].alpha = 0;
			stage.addChild(editBgArray[cButton]);

			// Accompanying text
			editMsgArray[cButton] = new Text(("Finish"), 
				{font: "18px sans-serif", fill: "white"});
			editMsgArray[cButton].position.set((renderer.width-175), (renderer.height-45));
			stage.addChild(editMsgArray[cButton]);
		}
		else {
			console.log("Error: unexpected current button incremental variable.");
		}
	}
}

function removeEditBar() {
	for (var cButton=0; cButton < editBtnArray.length; cButton++ ) {
		stage.removeChild(editBtnArray[cButton]);
	}
	for (var cButton=0; cButton < editBgArray.length; cButton++ ) {
		stage.removeChild(editBgArray[cButton]);
		stage.removeChild(editMsgArray[cButton]);
	}
	for (var cButton=0; cButton < devEditArray.length; cButton++) {
		stage.removeChild(devEditArray[cButton]);
	}
}