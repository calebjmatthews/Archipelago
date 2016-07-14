/// <reference path="references.ts" />

// ~~~~ Set up pixi.js ~~~~
	// PIXI Aliases
	var Container = PIXI.Container,
	    autoDetectRenderer = PIXI.autoDetectRenderer,
	    loader = PIXI.loader,
	    resources = PIXI.loader.resources,
	    Sprite = PIXI.Sprite,
	    TextureCache = PIXI.utils.TextureCache,
	    Graphics = PIXI.Graphics,
	    Text = PIXI.Text;

	// Create renderer
	var renderer = autoDetectRenderer();
	renderer.backgroundColor = 0x061639;
	renderer.view.style.position = "absolute";
	renderer.view.style.display = "block";
	renderer.autoResize = true;
	renderer.resize(window.innerWidth, window.innerHeight);

	// Apply renderer
	document.body.appendChild(renderer.view);
	var stage = new Container();

	// Edit origin to be renderer specific
	glbOrigin[0] = ((renderer.width - 200) / 2);
	glbOrigin[1] = (renderer.height / 2);

	loader
		.add("static/img/images.json")
		.load(onImageLoad);

// Create global Pixi and Tink variables
var tb = null;
// Set the default game state to 'edit'
glbBuildSel = eDEVEL.BaseCamp;
glbState = edit;
var pointer = null;

// Initiate game values (to be obsoleted)
let littleLand = new Land([eSIZE.Large, eSHAPE.Round, (Math.floor(Math.random() * 7))]);
let currLand = littleLand;
let cPlayerArray = [];
cPlayerArray[0] = new Player(); cPlayerArray[0].playerOrder = 0;
cPlayerArray[1] = new Player(); cPlayerArray[1].playerOrder = 1;
let currPlayer = cPlayerArray[0];

let plrMsg = null;
function formPlayerBar() {
	// Create blank background for player bar
	var plrBG = new Graphics();
	plrBG.beginFill(0x000000);
	plrBG.drawRect(0, 0, (renderer.width - 200), 20);
	plrBG.alpha = 0.8;
	plrBG.endFill();
	plrBG.x = 0; plrBG.y = 0;
	stage.addChild(plrBG);

	let plrMsgContent = "Empty.";

	plrMsg = new Text(plrMsgContent, {font: "13px sans-serif", fill: "white"});
	plrMsg.position.set(3, 1);
	stage.addChild(plrMsg);
	updatePlayerBar();
}

function updatePlayerBar() {
	stage.removeChild(plrMsg);
	let plrMsgContent = "Month " + (glbMonth);

	for (let tPlr=0; tPlr < cPlayerArray.length; tPlr++) {
		plrMsgContent += ("       Player " + (cPlayerArray[tPlr].playerOrder+1) + ": " + 
			"F-" + cPlayerArray[tPlr].food + " M-" + cPlayerArray[tPlr].material + 
			" T-" + cPlayerArray[tPlr].treasure);
	}

	plrMsg = new Text(plrMsgContent, {font: "13px sans-serif", fill: "white"});
	plrMsg.position.set(3, 1);
	stage.addChild(plrMsg);
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
		let sprMed = loader.resources["static/img/images.json"].textures;
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

			// Set up the development's background as the button
			let bgLscp = develArray[cButton-glbNumLscps].lscpRequired[0];
			editBtnArray[cButton] = new Sprite(sprMed[lscpArray[bgLscp].sprID]);
			editBtnArray[cButton].position.set((renderer.width-180), (50 + 40*cButton));
			editBtnArray[cButton].scale.set(bScale, bScale);
			stage.addChild(editBtnArray[cButton]);

			// Create the development as the text and as a facade
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
		stage.removeChild(editMsgArray[cButton]);
	}
	for (var cButton=0; cButton < devEditArray.length; cButton++) {
		stage.removeChild(devEditArray[cButton]);
	}
}

var msgPoint = null;
var msgAxial = null;
function formDebugBar() {
	// Display text
	msgPoint = new Text(
		("Coords: "),
		{font: "16px sans-serif", fill: "white"}
	);
	msgPoint.position.set((renderer.width-180), 20);
	stage.addChild(msgPoint);
	msgAxial = new Text(
		("Hex: "),
		{font: "16px sans-serif", fill: "white"}
	);
	msgAxial.position.set((renderer.width-180), 60);
	stage.addChild(msgAxial);
}

function paintLscp(clkTile) {
	// Simple landscape alteration
	if (glbPainting < glbNumLscps) {
		clkTile.landscape = glbPainting;
	}
	// Apply the black developments only to the appropriate landscape
	else if (glbPainting < (glbNumLscps + glbNumBlkDevels)) {
		if (clkTile.landscape === develArray[glbPainting - glbNumLscps].lscpRequired) {
			clkTile.landscape = glbPainting - glbNumLscps;
			clkTile.development = glbPainting;
		}
	}
	else {
		console.log("Error, unexpected glbPainting value.");
	}
}