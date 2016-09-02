/// <reference path="references.ts" />

// Set up pixi.js
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

	// Load sprite atlases
	loader
		.add("static/img/images-0.json")
		.add("static/img/images-1.json")
		.load(onImageLoad);

	// Single reference sprite  to be filled later
	var sprMed = null;

// Create global Pixi and Tink variables
var tb = null;
// Set the default game state to 'edit'
glbState = edit;
var pointer = null;

// Initiate game values (to be obsoleted)
let littleLand = new Land([Math.floor(Math.random() * 3), eSHAPE.Round, 
	(Math.floor(Math.random() * 7))]);
let currLand = littleLand;
let cPlayerArray: Player[] = [];
cPlayerArray[0] = new Player(); cPlayerArray[0].playerOrder = 0;
cPlayerArray[1] = new Player(); cPlayerArray[1].playerOrder = 1;
let currPlayer = cPlayerArray[0];
let currDescCard = null;
let currHovDescCard = null;

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