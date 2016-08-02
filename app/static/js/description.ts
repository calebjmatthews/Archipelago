/// <reference path="references.ts" />

class DescCard {
	clkPoint: number[] = [];
	tile: Tile = null;
	tArray: any[] = [];

	constructor(givenPoint: number[], givenTile: Tile) {
		this.clkPoint = givenPoint;
		this.tile = givenTile;

		let dPosition = [];
		let tDevel = develArray[this.tile.development];
		// Make display card on left
		if (this.clkPoint[0] > 0) {
			dPosition[0] = 20;
		}
		// Make display card on right
		else if (this.clkPoint[0] <= 0) {
			dPosition[0] = renderer.width - 550;
		}
		else { console.log("Unexpected describing point value."); }
		dPosition[1] = 40;

		// Card background
		let sprName = "tallblank.png";
		if (tDevel.color === eDCLR.Black) { sprName="blackcard.png"; }
		else if (tDevel.color === eDCLR.Blue) { sprName="bluecard.png"; }
		else if (tDevel.color === eDCLR.Green) { sprName="greencard.png"; }
		else if (tDevel.color === eDCLR.Orange) { sprName="orangecard.png"; }
		else if (tDevel.color === eDCLR.Red) { sprName="redcard.png"; }
		else if (tDevel.color === eDCLR.Violet) { sprName="violetcard.png"; }
		else { console.log("Error, unexpected dev color value."); }
		this.tArray[0] = new Sprite(sprMed[sprName]);
		this.tArray[0].position.set(dPosition[0], dPosition[1]);
		this.tArray[0].scale.set(0.65, 0.65);

		// Development name
		this.tArray.push(new Text(tDevel.name, {font: "24px sans-serif", fill: "black"}));
		this.tArray[this.tArray.length-1].position.set((dPosition[0] + 28), 
			(dPosition[1] + 38));

		// Background tile 
		this.tArray.push(new Sprite(sprMed[lscpArray[tDevel.lscpRequired[0]].sprID]));
		this.tArray[this.tArray.length-1].scale.set(0.5, 0.5);
		this.tArray[this.tArray.length-1].position.set((dPosition[0] + 93), 
			(dPosition[1] + 181));

		// Development sprite
		this.tArray.push(new Sprite(sprMed[tDevel.sprID[0]]));
		this.tArray[this.tArray.length-1].scale.set(0.5, 0.5);
		this.tArray[this.tArray.length-1].position.set((dPosition[0] + 93), 
			(dPosition[1] + 101));

		// Development description
		let expDesc = [];
		expDesc = this.expandDescription(tDevel);
		this.tArray.push(new Text(expDesc, {font: "16px sans-serif", fill: "black"}));
		this.tArray[this.tArray.length-1].position.set((dPosition[0] + 28), 
			(dPosition[1] + 298));

		// Development cost
		this.tArray.push(new Text(tDevel.cost, {font: "16px sans-serif", fill: "black"}));
		this.tArray[this.tArray.length-1].position.set((dPosition[0] + 28), 
			(dPosition[1] + 370));

		// Development required tiles
		this.tArray.push(new Sprite(sprMed[tDevel.lscpRequired[0]]));
		this.tArray[this.tArray.length-1].scale.set = (0.05);
		this.tArray[this.tArray.length-1].position.set((dPosition[0] + 235), 
			(dPosition[1] + 370));

		// Applying description sprites to stage
		for (let tSpr=0; tSpr < this.tArray.length; tSpr++) {
			stage.addChild(this.tArray[tSpr]);
		}
	}

	expandDescription(tDevel: Development) {
		let pieces = tDevel.description.split(";");
		for (let tPiece = 0; tPiece < pieces.length; tPiece++) {
			// If any individual pieces is too long to fit on a line
			if (pieces[tPiece].length > 30) {
				// Split the pieces array into 'before' and 'after'
				let beforeT = [];
				for (let iii = 0; iii < tPiece; iii++) {
					beforeT[iii] = pieces[iii];
				}
				let afterT = [];
				for (let iii = tPiece; iii < pieces.length; iii++) {
					afterT[iii] = pieces[iii];
				}

				// Break the >30 character piece along a space
				let tooLong = pieces[tPiece];
				let metaPieces = [];
				// Use pseudo-while loop to break an indeterminate number of times
				for (let iii = 0; iii < 80; iii++) {
					if (tooLong.length > 30) {
						for (let jjj = 31; jjj > 0; jjj--) {
							if (tooLong[jjj] === " ") {
								metaPieces.push(tooLong.slice(0, jjj));
								tooLong = tooLong.slice(jjj);
							}
						}
					}
					else { break; }
				}

				// Re-assemble the pieces array
				pieces = [];
				pieces.concat(beforeT, metaPieces, afterT);

			}
		}

		return pieces;
	}

	expandCost(tDevel: Development) {

	}

	selfDestruct() {
		for (let tSpr = 0; tSpr < this.tArray.length; tSpr++) {
			stage.removeChild(this.tArray[tSpr]);
		}
		currDescCard = null;
	}
}