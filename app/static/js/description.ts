/// <reference path="references.ts" />

class DescCard {
	clkPoint: number[] = [];
	devel: Development = null;
	tArray: any[] = [];

	constructor(givenPoint: number[], givenDevel: Development) {
		this.clkPoint = givenPoint;
		this.devel = givenDevel;

		let dPosition = [];
		let tDevel = this.devel;
		// Make display card on left
		if (this.clkPoint[0] > glbOrigin[0]) {
			dPosition[0] = 20;
		}
		// Make display card on right
		else if (this.clkPoint[0] <= glbOrigin[0]) {
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
			(dPosition[1] + 107));

		// Development description
		let expDesc = [];
		expDesc = this.expandDescription(tDevel);
		for (let tExpD = 0; tExpD < expDesc.length; tExpD++) {
			this.tArray.push(new Text(expDesc[tExpD], 
				{font: "16px sans-serif", fill: "black"}));
			this.tArray[this.tArray.length-1].position.set((dPosition[0] + 28), 
				(dPosition[1] + 298 + (tExpD * 20)));
		}

		// Development cost
		let expCost = this.expandCost(tDevel);
		this.tArray.push(new Text(expCost, {font: "16px sans-serif", fill: "black"}));
		this.tArray[this.tArray.length-1].position.set((dPosition[0] + 28), 
			(dPosition[1] + 475));

		// Development required tiles
		let tLscpReq = tDevel.lscpRequired;
		for (let tLReq = 0; tLReq < tLscpReq.length; tLReq++) {
			this.tArray.push(new Sprite(sprMed[lscpArray[tLscpReq[tLReq]].tinyID]));
			this.tArray[this.tArray.length-1].position.set(((dPosition[0] + 255) - 
				(tLReq * 32)), (dPosition[1] + 475));
		}

		// Applying description sprites to stage
		for (let tSpr=0; tSpr < this.tArray.length; tSpr++) {
			stage.addChild(this.tArray[tSpr]);
		}
	}

	expandDescription(tDevel: Development) {
		let pieces = tDevel.description.split(";");
		let result = [];
		let anyOver30 = false;
		for (let tPiece = 0; tPiece < pieces.length; tPiece++) {
			// If any individual pieces is too long to fit on a line
			if (pieces[tPiece].length > 34) {
				anyOver30 = true;
				// Split the pieces array into 'before' and 'after'
				let beforeT = [];
				for (let iii = 0; iii < tPiece; iii++) {
					beforeT[iii] = pieces[iii];
				}
				let afterT = [];
				for (let iii = tPiece+1; iii < pieces.length; iii++) {
					afterT[iii] = pieces[iii];
				}

				// Break the >30 character piece along a space
				let tooLong = pieces[tPiece];
				let metaPieces = [];
				// Use pseudo-while loop to break an indeterminate number of times
				for (let iii = 0; iii < 80; iii++) {
					if (tooLong.length > 34) {
						for (let jjj = 35; jjj > 0; jjj--) {
							if (tooLong[jjj] === " ") {
								metaPieces.push(tooLong.slice(1, jjj));
								tooLong = tooLong.slice(jjj);
								break;
							}
						}
					}
					else { 
						metaPieces.push(tooLong.slice(1,tooLong.length));
						break; }
				}

				// Re-assemble the pieces array
				result = [];
				result = beforeT.concat(metaPieces, afterT);

			}
		}
		if (anyOver30 === false) { result = pieces; }

		return result;
	}

	expandCost(tDevel: Development) {
		if (tDevel.cost.length > 0) {
			let result = "";
			if (tDevel.cost[0] != null) {
				result = Math.abs(tDevel.cost[0]) + "F";
				if ((tDevel.cost[1] != null) || (tDevel.cost[2] != null)) {
					result += ", ";
				}
			}
			if (tDevel.cost[1] != null) {
				result += Math.abs(tDevel.cost[1]) + "M";
				if (tDevel.cost[2] != null) {
					result += ", ";
				}
			}
			if (tDevel.cost[2] != null) {
				result += Math.abs(tDevel.cost[2]) + "T";
			}
			return result;
		}
		else { return ""; }
	}

	selfDestruct() {
		for (let tSpr = 0; tSpr < this.tArray.length; tSpr++) {
			stage.removeChild(this.tArray[tSpr]);
		}
		currDescCard = null;
		currHovDescCard = null;
	}
}