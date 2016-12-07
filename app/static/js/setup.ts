/// <reference path="references.ts" />

// Set up pixi.js
	// Create renderer
	var renderer = PIXI.autoDetectRenderer(800, 600);
	renderer.backgroundColor = 0x061639;
	renderer.view.style.position = "absolute";
	renderer.view.style.display = "block";
	renderer.autoResize = true;
	renderer.resize(window.innerWidth, window.innerHeight);

	// Apply renderer
	document.body.appendChild(renderer.view);
	var stage = new PIXI.Container();

	// Edit origin to be renderer specific
	glbOrigin[0] = ((renderer.width - 200) / 2);
	glbOrigin[1] = ((renderer.height + 30) / 2);

	// Load sprite atlases
	PIXI.loader
		.add("static/img/images-0.json")
		.add("static/img/images-1.json")
		.add("static/img/images-2.json")
		.load(onImageLoad);

	// Single reference sprite  to be filled later
	var sprMed = null;

// Create global Pixi and Tink variables
var tb = null;
var pointer = null;

// Initiate game values (to be obsoleted)
let littleLand = new Land([Math.floor(Math.random() * 3), eSHAPE.Round, 
	(Math.floor(Math.random() * 7))]);
currLand = littleLand;
cPlayerArray[0] = new Player(); cPlayerArray[0].playerOrder = 0;
cPlayerArray[1] = new Player(); cPlayerArray[1].playerOrder = 1;
currPlayer = cPlayerArray[0];

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