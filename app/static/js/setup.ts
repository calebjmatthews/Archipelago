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

	loader
		.add("static/img/images.json")
		.load(onImageLoad);

// Create global Pixi and Tink variables
var tb = null;
// Set the default game state to 'edit'
var state = edit;
var pointer = null;

let littleLand = new Land([eSIZE.Large, eSHAPE.Round, eCLIMATE.Jungle]);
let currLand = littleLand;
var msgPoint = null;
var msgAxial = null;
var msgLastAx = null;

var buttonArray = [];
var devEditArray = [];
var msgArray = [];
function formEditBar() {
	// Since the edit bar includes both landscapes and some black developments, the
	//  for loop needs to be compensate for the total number of landscapes when iterating
	//  through black developments

	// Create blank background for edit bar
	var designBG = new Graphics();
	designBG.beginFill(0x000000);
	designBG.drawRect(0, 0, 205, (renderer.height));
	designBG.endFill();
	designBG.x = renderer.width-200;
	designBG.y = 0;
	stage.addChild(designBG);

	for (var cButton=0; cButton < (glbNumLscps+glbNumBlkDevels); cButton++) {
		let sprMed = loader.resources["static/img/images.json"].textures;
		var chosenPng = null;
		var chosenText = null;
		let bScale = 0.2;
		if (cButton < glbNumLscps) {
			buttonArray[cButton] = new Sprite(sprMed[lscpArray[cButton].sprID]);
			tb.makeInteractive(buttonArray[cButton]);
			buttonArray[cButton].position.set((renderer.width-180), (20+40*cButton));
			buttonArray[cButton].scale.set(bScale, bScale);
			stage.addChild(buttonArray[cButton]);

			msgArray[cButton] = new Text((lscpArray[cButton].name), 
			{font: "16px sans-serif", fill: "white"});
			msgArray[cButton].position.set((renderer.width-110), (25+40*cButton));
			stage.addChild(msgArray[cButton]);
		}
		else if ((cButton >= glbNumLscps) && (cButton < (glbNumLscps+glbNumBlkDevels))) {
			// Set up the development's background as the button
			let bgLscp = develArray[cButton-glbNumLscps].lscpRequired[0];
			buttonArray[cButton] = new Sprite(sprMed[lscpArray[bgLscp].sprID]);
			tb.makeInteractive(buttonArray[cButton]);
			buttonArray[cButton].position.set((renderer.width-180), (40 + 40*cButton));
			buttonArray[cButton].scale.set(bScale, bScale);
			stage.addChild(buttonArray[cButton]);

			// Create the development as the text and as a facade
			chosenText = develArray[cButton-glbNumLscps].name;
			let devSprID = develArray[cButton-glbNumLscps].sprID;
			let tDevSpr = new Sprite(sprMed[devSprID]);
			tDevSpr.scale.set(bScale, bScale);
			tDevSpr.position.set((renderer.width-180), (10+40*cButton));
			stage.addChild(tDevSpr);
			devEditArray[cButton-glbNumLscps] = tDevSpr;

			msgArray[cButton] = new Text((chosenText), 
			{font: "16px sans-serif", fill: "white"});
			msgArray[cButton].position.set((renderer.width-110), (45 + 40*cButton));
			stage.addChild(msgArray[cButton]);
		}
		else {
			console.log("Error: unexpected current button incremental variable.");
		}
	}

	// Can't use a for loop because press events act like watchers
	buttonArray[eLSCP.Grassy].press = () => { glbPainting = eLSCP.Grassy; }
	buttonArray[eLSCP.Shore].press = () => { glbPainting = eLSCP.Shore; }
	buttonArray[eLSCP.Forested].press = () => { glbPainting = eLSCP.Forested; }
	buttonArray[eLSCP.Rocky].press = () => { glbPainting = eLSCP.Rocky; }
	buttonArray[eLSCP.Desert].press = () => { glbPainting = eLSCP.Desert; }
	buttonArray[eLSCP.Sea].press = () => { glbPainting = eLSCP.Sea; }
	buttonArray[(glbNumLscps + eDEVEL.Cave)].press = () => { 
		glbPainting = glbNumLscps + eDEVEL.Cave; }
	buttonArray[(glbNumLscps + eDEVEL.Freshwater)].press = () => { 
		glbPainting = glbNumLscps + eDEVEL.Freshwater; }
	buttonArray[(glbNumLscps + eDEVEL.Jungle)].press = () => { 
		glbPainting = glbNumLscps + eDEVEL.Jungle; }
}

function removeEditBar() {
	for (var cButton=0; cButton < buttonArray.length; cButton++ ) {
		stage.removeChild(buttonArray[cButton]);
		stage.removeChild(msgArray[cButton]);
	}
	for (var cButton=0; cButton < devEditArray.length; cButton++) {
		stage.removeChild(devEditArray[cButton]);
	}
}

function formPlayerBar() {

}

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