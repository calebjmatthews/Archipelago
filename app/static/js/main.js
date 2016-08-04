var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="references.ts" />
// Global gameplay variables
var glbState = edit;
var glbBoundary = 18;
var glbOrigin = [508, 288]; // Approximation of origin until renderer is available
var glbHHeight = 30;
var glbHWidth = 60;
var glbBrdWidth = 14;
var glbPainting = null;
var glbNumLscps = 6;
var glbNumBlkDevels = 3;
var glbLscpCeil = 0.225;
var glbMonth = 0;
var glbEditBarSel = null;
var glbBuildSel = null;
var glbTileSelArray = [];
// Initiate visual effect variables
var glbPulseArray = [];
// Enumerates the convention of how hex direction is ordered within this program
var eHEXD;
(function (eHEXD) {
    eHEXD[eHEXD["SouthEast"] = 0] = "SouthEast";
    eHEXD[eHEXD["SouthWest"] = 1] = "SouthWest";
    eHEXD[eHEXD["West"] = 2] = "West";
    eHEXD[eHEXD["NorthWest"] = 3] = "NorthWest";
    eHEXD[eHEXD["NorthEast"] = 4] = "NorthEast";
    eHEXD[eHEXD["East"] = 5] = "East";
})(eHEXD || (eHEXD = {}));
// Enumerates land size options
var eSIZE;
(function (eSIZE) {
    eSIZE[eSIZE["Small"] = 0] = "Small";
    eSIZE[eSIZE["Medium"] = 1] = "Medium";
    eSIZE[eSIZE["Large"] = 2] = "Large";
    eSIZE[eSIZE["Gigantic"] = 3] = "Gigantic";
})(eSIZE || (eSIZE = {}));
// Enumerates land shape options
var eSHAPE;
(function (eSHAPE) {
    eSHAPE[eSHAPE["Round"] = 0] = "Round";
    eSHAPE[eSHAPE["Bay"] = 1] = "Bay";
    eSHAPE[eSHAPE["Twin"] = 2] = "Twin";
    eSHAPE[eSHAPE["Jagged"] = 3] = "Jagged";
    eSHAPE[eSHAPE["Thin"] = 4] = "Thin";
})(eSHAPE || (eSHAPE = {}));
// Enumerates land climate options
var eCLIMATE;
(function (eCLIMATE) {
    eCLIMATE[eCLIMATE["Grassy"] = 0] = "Grassy";
    eCLIMATE[eCLIMATE["Forested"] = 1] = "Forested";
    eCLIMATE[eCLIMATE["Rocky"] = 2] = "Rocky";
    eCLIMATE[eCLIMATE["Desert"] = 3] = "Desert";
    eCLIMATE[eCLIMATE["Varied"] = 4] = "Varied";
    eCLIMATE[eCLIMATE["Jungle"] = 5] = "Jungle";
    eCLIMATE[eCLIMATE["Wet"] = 6] = "Wet";
    eCLIMATE[eCLIMATE["Mountain"] = 7] = "Mountain";
})(eCLIMATE || (eCLIMATE = {}));
// Enumerates landscape types for individual tiles
var eLSCP;
(function (eLSCP) {
    eLSCP[eLSCP["Grassy"] = 0] = "Grassy";
    eLSCP[eLSCP["Forested"] = 1] = "Forested";
    eLSCP[eLSCP["Rocky"] = 2] = "Rocky";
    eLSCP[eLSCP["Desert"] = 3] = "Desert";
    eLSCP[eLSCP["Sea"] = 4] = "Sea";
    eLSCP[eLSCP["Shore"] = 5] = "Shore";
})(eLSCP || (eLSCP = {}));
// Enumerates options for developments
var eDEVEL;
(function (eDEVEL) {
    eDEVEL[eDEVEL["Jungle"] = 0] = "Jungle";
    eDEVEL[eDEVEL["Freshwater"] = 1] = "Freshwater";
    eDEVEL[eDEVEL["Cave"] = 2] = "Cave";
    eDEVEL[eDEVEL["BaseCamp"] = 3] = "BaseCamp";
    eDEVEL[eDEVEL["FireCrew"] = 4] = "FireCrew";
    eDEVEL[eDEVEL["LaborPort"] = 5] = "LaborPort";
    eDEVEL[eDEVEL["SeasSideParade"] = 6] = "SeasSideParade";
    eDEVEL[eDEVEL["TradeHarbor"] = 7] = "TradeHarbor";
    eDEVEL[eDEVEL["AuctionHouse"] = 8] = "AuctionHouse";
    eDEVEL[eDEVEL["EnvoyHarbor"] = 9] = "EnvoyHarbor";
    eDEVEL[eDEVEL["RicePaddy"] = 10] = "RicePaddy";
    eDEVEL[eDEVEL["BoarRanch"] = 11] = "BoarRanch";
    eDEVEL[eDEVEL["HuntingCamp"] = 12] = "HuntingCamp";
    eDEVEL[eDEVEL["SmokeHouse"] = 13] = "SmokeHouse";
    eDEVEL[eDEVEL["PeachOrchard"] = 14] = "PeachOrchard";
    eDEVEL[eDEVEL["Woodcutters"] = 15] = "Woodcutters";
    eDEVEL[eDEVEL["SilverMine"] = 16] = "SilverMine";
    eDEVEL[eDEVEL["StoneQuarry"] = 17] = "StoneQuarry";
    eDEVEL[eDEVEL["CharcoalFurnace"] = 18] = "CharcoalFurnace";
    eDEVEL[eDEVEL["CobaltMine"] = 19] = "CobaltMine";
    eDEVEL[eDEVEL["WorkerVillage"] = 20] = "WorkerVillage";
    eDEVEL[eDEVEL["TeaHouse"] = 21] = "TeaHouse";
    eDEVEL[eDEVEL["Demolition"] = 22] = "Demolition";
    eDEVEL[eDEVEL["ShepherdVillage"] = 23] = "ShepherdVillage";
    eDEVEL[eDEVEL["Town"] = 24] = "Town";
    eDEVEL[eDEVEL["MerchantShip"] = 25] = "MerchantShip";
    eDEVEL[eDEVEL["VentureShip"] = 26] = "VentureShip";
    eDEVEL[eDEVEL["WorkmanShip"] = 27] = "WorkmanShip";
    eDEVEL[eDEVEL["OpulentVessel"] = 28] = "OpulentVessel";
    eDEVEL[eDEVEL["AbundantVessel"] = 29] = "AbundantVessel";
    eDEVEL[eDEVEL["SteadyVessel"] = 30] = "SteadyVessel";
})(eDEVEL || (eDEVEL = {}));
;
// Enumerates development color options
var eDCLR;
(function (eDCLR) {
    eDCLR[eDCLR["Black"] = 0] = "Black";
    eDCLR[eDCLR["Blue"] = 1] = "Blue";
    eDCLR[eDCLR["Green"] = 2] = "Green";
    eDCLR[eDCLR["Orange"] = 3] = "Orange";
    eDCLR[eDCLR["Red"] = 4] = "Red";
    eDCLR[eDCLR["Violet"] = 5] = "Violet";
})(eDCLR || (eDCLR = {}));
// Enumerates development costs
var eCOST;
(function (eCOST) {
    eCOST[eCOST["Food"] = 0] = "Food";
    eCOST[eCOST["Material"] = 1] = "Material";
    eCOST[eCOST["Treasure"] = 2] = "Treasure";
    eCOST[eCOST["DestroyBlue"] = 3] = "DestroyBlue";
    eCOST[eCOST["DestroyGreen"] = 4] = "DestroyGreen";
    eCOST[eCOST["DestroyOrange"] = 5] = "DestroyOrange";
})(eCOST || (eCOST = {}));
// Enumerates the requirement of development effects
var eREQ;
(function (eREQ) {
    eREQ[eREQ["Food"] = 0] = "Food";
    eREQ[eREQ["Material"] = 1] = "Material";
    eREQ[eREQ["Treasure"] = 2] = "Treasure";
    eREQ[eREQ["Ship"] = 3] = "Ship";
    eREQ[eREQ["Active"] = 4] = "Active";
    eREQ[eREQ["Destroy"] = 5] = "Destroy";
})(eREQ || (eREQ = {}));
// Enumerates the result of development effects
var eRES;
(function (eRES) {
    eRES[eRES["Food"] = 0] = "Food";
    eRES[eRES["Material"] = 1] = "Material";
    eRES[eRES["Treasure"] = 2] = "Treasure";
    eRES[eRES["Ship"] = 3] = "Ship";
    eRES[eRES["Active"] = 4] = "Active";
    eRES[eRES["Destroy"] = 5] = "Destroy";
    eRES[eRES["BlueTreasure"] = 6] = "BlueTreasure";
    eRES[eRES["RedActive"] = 7] = "RedActive";
})(eRES || (eRES = {}));
// ~~~~ General purpose functions ~~~~
function rgbToHclr(rgb) {
    var result = [];
    for (var iii = 0; iii < 3; iii++) {
        var hClr = rgb[iii].toString(16);
        result[iii] = hClr.length == 1 ? "0" + hClr : hClr;
    }
    return parseInt("0x" + result[0] + result[1] + result[2]);
}
function inArr(array, query) {
    if (array === undefined) {
        return false;
    }
    else if (array === null) {
        return false;
    }
    else if (array === []) {
        return false;
    }
    for (var iii = 0; iii < array.length; iii++) {
        if (array[iii] === query) {
            return true;
        }
    }
    return false;
}
// ~~~~ Hex functions ~~~~
function hexToCube(tHex) {
    var axialRow = tHex[0];
    var axialCol = tHex[1];
    var zPos = axialCol;
    var xPos = axialRow;
    var yPos = -xPos - zPos;
    return [xPos, yPos, zPos];
}
function cubeToHex(tCube) {
    var xPos = tCube[0];
    var yPos = tCube[1];
    var zPos = tCube[2];
    var axialCol = xPos;
    var axialRow = zPos;
    return [axialRow, axialCol];
}
function cubeRound(tCube) {
    var xPos = tCube[0];
    var yPos = tCube[1];
    var zPos = tCube[2];
    var rX = Math.round(xPos);
    var rY = Math.round(yPos);
    var rZ = Math.round(zPos);
    var xDiff = Math.abs(rX - xPos);
    var yDiff = Math.abs(rY - yPos);
    var zDiff = Math.abs(rZ - zPos);
    if ((xDiff > yDiff) && (xDiff > zDiff)) {
        rX = -rY - rZ;
    }
    else if (yDiff > zDiff) {
        rY = -rX - rZ;
    }
    else {
        rZ = -rX - rY;
    }
    return [rX, rY, rZ];
}
function hexRound(tHex) {
    var tCube = hexToCube(tHex);
    var roundedCube = cubeRound(tCube);
    var roundedHex = cubeToHex(roundedCube);
    return roundedHex;
}
// Function to convert a hex poision into an anchor point for a tile sprite
function hexToPoint(tHex) {
    var axialRow = tHex[0];
    var axialCol = tHex[1];
    // Set sprite width and height, to accomidate for pixel rounding?
    var sWidth = glbHWidth;
    var sHeight = glbHHeight * 1.15;
    var xPos = this.glbOrigin[0] + ((sWidth / 2) * 1.5 * axialRow) - sWidth / 2;
    var yPos = this.glbOrigin[1] +
        ((sHeight / 2) * Math.sqrt(3) * (axialCol + axialRow / 2)) - sHeight / 2;
    return [xPos, yPos];
}
// Function to convert an x,y point into corresponding hex
function pointToHex(tPoint) {
    var xPos = tPoint[0];
    var yPos = tPoint[1];
    // Set sprite width and height, to accomidate for pixel rounding?
    var sWidth = glbHWidth;
    var sHeight = glbHHeight * 0.86956522;
    var axialCol = xPos * (2 / 3) / (sWidth / 2);
    var axialRow = (-xPos / 6.8 + (Math.sqrt(3) / 2) * yPos / 2) / (sHeight / 2);
    return hexRound([axialRow, axialCol]);
}
// Returns an axial coordinate based on a given coordinate, a direction in which
//  to move, and the magnitude of the movement.
//  Example: From the point [-2, 2], move South East (i.e. 0) by a magnitude of
//  3 to return the axial coordinates [1, 2]
function moveHex(tHex, direction, magnitude) {
    if (direction === eHEXD.SouthEast) {
        return [(tHex[0] + magnitude), tHex[1]];
    }
    else if (direction === eHEXD.SouthWest) {
        return [(tHex[0] + magnitude), (tHex[1] - magnitude)];
    }
    else if (direction === eHEXD.West) {
        return [tHex[0], (tHex[1] - magnitude)];
    }
    else if (direction === eHEXD.NorthWest) {
        return [(tHex[0] - magnitude), tHex[1]];
    }
    else if (direction === eHEXD.NorthEast) {
        return [(tHex[0] - magnitude), (tHex[1] + magnitude)];
    }
    else if (direction === eHEXD.East) {
        return [tHex[0], (tHex[1] + magnitude)];
    }
    else {
        console.log("Error: Unexpected hex movement direction.");
    }
}
/// <reference path="references.ts" />
var Hex = (function () {
    function Hex(arraySpot, setPos) {
        // Defines the graphical height/width of all hexagons in game
        this.height = glbHHeight;
        this.width = glbHWidth;
        this.scale = 0.2;
        this.hexID = arraySpot;
        this.parentID = currLand.landID;
        this.axialRow = setPos[0];
        this.axialCol = setPos[1];
    }
    // Method to return the expected axial coordinates of the instance's six neighbors.  
    //  Axial coordinates of non-existant tiles are included in this.  The method starts 
    //  with the north-east neightbor and proceeds clockwise
    Hex.prototype.getNeighbors = function () {
        var aNeighbors = [];
        aNeighbors[0] = [(this.axialRow - 1), (this.axialCol + 1)];
        aNeighbors[1] = [this.axialRow, (this.axialCol + 1)];
        aNeighbors[2] = [(this.axialRow + 1), this.axialCol];
        aNeighbors[3] = [(this.axialRow + 1), (this.axialCol - 1)];
        aNeighbors[4] = [this.axialRow, (this.axialCol - 1)];
        aNeighbors[5] = [(this.axialRow - 1), this.axialCol];
        return aNeighbors;
    };
    // Method to return the expected axial coordinates of the instance, using the given
    //  radius. Axial coordinates of non-existant tiles are included in this.  The method 
    //  starts with the north-east ring member and proceeds clockwise
    Hex.prototype.getRing = function (radius) {
        var ringMembers = [];
        if (radius === 0) {
            console.log("Error: radius cannot equal 0.");
            return ringMembers;
        }
        // Begin in the North East corner of the ring
        var tAxial = [-radius, radius];
        // Move in six directions, corresponding to the six sides of the ring
        for (var tDirec = 0; tDirec < 6; tDirec++) {
            // The number of ring members on each side equals the radius of the ring
            for (var tFace = 0; tFace < radius; tFace++) {
                ringMembers.push(tAxial);
                // Move one hex around the current face of the ring
                tAxial = moveHex(tAxial, tDirec, 1);
            }
        }
        return ringMembers;
    };
    // Returns the distance between this Hex and a specified target Hex
    Hex.prototype.getDistance = function (targetHex) {
        return (Math.abs(this.axialCol - targetHex.axialCol) +
            Math.abs(this.axialCol + this.axialRow -
                targetHex.axialCol - targetHex.axialCol) +
            Math.abs(this.axialRow - targetHex.axialRow)) / 2;
    };
    return Hex;
}());
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        _super.apply(this, arguments);
        // Landscape and development define the contents of the hexagon, these use Enums
        this.landscape = 0;
        this.development = null;
        this.ownedBy = null;
        this.selected = false;
    }
    Tile.prototype.reDrawTile = function () {
        var arraySpot = currLand.getID([this.axialRow, this.axialCol]);
        var tSprite = currLand.spriteArray[arraySpot];
        var tDevSpr = currLand.sprDevArray[arraySpot];
        tSprite.texture = sprMed[lscpArray[this.landscape].sprID];
        if (this.development != null) {
            tDevSpr.texture = sprMed[develArray[this.development].sprID[0]];
        }
        else {
            tDevSpr.texture = sprMed["tallblank.png"];
        }
    };
    return Tile;
}(Hex));
/// <reference path="references.ts" />
var playerIncrement = 0; // Global incrementing variable used to set playerID
var Player = (function () {
    function Player() {
        this.playerOrder = 0;
        this.food = 2;
        this.material = 2;
        this.treasure = 0;
        this.ships = 0;
        this.territory = [];
        this.ownedDevs = [];
        this.deck = [];
        this.hand = [];
        this.discard = [];
        this.trash = [];
        this.canClick = false;
        this.activeSprArray = [];
        this.playerID = playerIncrement;
        playerIncrement++;
    }
    Player.prototype.addTerritory = function (tTileID) {
        var tTile = currLand.tileArray[tTileID];
        if (!(inArr(this.territory, tTileID))) {
            this.territory.push(tTileID);
        }
        var neighbors = tTile.getNeighbors();
        for (var cNeigh = 0; cNeigh < neighbors.length; cNeigh++) {
            if (!(inArr(this.territory, neighbors[cNeigh]))) {
                this.territory.push(neighbors[cNeigh]);
            }
        }
    };
    Player.prototype.shuffleDeck = function () {
        if (this.deck.length === 0) {
            this.deck = this.discard;
            this.discard = [];
        }
        else {
            for (var tDiscSpot = 0; tDiscSpot < this.discard.length; tDiscSpot++) {
                this.deck.push(this.discard[tDiscSpot]);
            }
            this.discard = [];
        }
        for (var deckSpot = this.deck.length - 1; deckSpot >= 0; deckSpot--) {
            // randDev ← random integer such that 0 ≤ randDev ≤ deckSpot
            var randDev = Math.floor(Math.random() * (deckSpot + 1));
            var dsValue = this.deck[deckSpot];
            var rdValue = this.deck[randDev];
            // Exchange values
            this.deck[deckSpot] = rdValue;
            this.deck[randDev] = dsValue;
        }
    };
    Player.prototype.drawDev = function () {
        var removedDev = this.deck[this.deck.length - 1];
        this.hand.push(removedDev);
        // Rebuild the deck, excluding the removed card
        var newDeck = [];
        for (var deckSpot = 0; deckSpot < this.deck.length - 1; deckSpot++) {
            newDeck[deckSpot] = this.deck[deckSpot];
        }
        this.deck = newDeck;
    };
    // Returns the x,y position of the active hexagon button
    Player.prototype.getActivePos = function (activeSpot) {
        var xPos = 0;
        var yPos = 0;
        if ((activeSpot % 3) === 0) {
            xPos = 100 - (glbHWidth / 2);
            // Y positioning uses hex width in order to create an even margin on  both 
            //  top and sides
            yPos = (glbHWidth / 2) + (((activeSpot * 1.3) / 3) * glbHHeight);
        }
        else if (((activeSpot - 1) % 3) === 0) {
            xPos = 100 - glbHWidth - (glbHWidth / 2);
            yPos = 110 - glbHHeight - (glbHWidth / 2) +
                ((((activeSpot - 1) * 1.3) / 3) * glbHHeight);
        }
        else if (((activeSpot - 2) % 3) === 0) {
            xPos = 100 + (glbHWidth / 2);
            yPos = 110 - glbHHeight - (glbHWidth / 2) +
                ((((activeSpot - 2) * 1.3) / 3) * glbHHeight);
        }
        else {
            console.log("Error, unexpected development hand value.");
        }
        // Corect for position of sidebar
        xPos = renderer.width - 200 + xPos;
        return [xPos, yPos];
    };
    Player.prototype.displayActives = function () {
        var numActives = 0;
        if (this.hand.length = 3) {
            numActives = 3;
        }
        else {
            numActives = this.hand.length;
        }
        for (var activeSpot = 0; activeSpot < numActives; activeSpot++) {
            var tSprite = new Sprite(sprMed["whitehex.png"]);
            tSprite.scale.set(0.2, 0.2);
            var sprPos = currPlayer.getActivePos(activeSpot);
            tSprite.position.set(sprPos[0], sprPos[1]);
            stage.addChild(tSprite);
            this.activeSprArray[activeSpot] = tSprite;
        }
    };
    Player.prototype.displayHand = function () {
        for (var tHSpot = 0; tHSpot < this.hand.length; tHSpot++) {
        }
    };
    Player.prototype.inActiveHex = function (activePos, corPoint) {
        // 1. Is the point within the possible range of any active hex?
        // 2. Is the point in this hex's bounding box?
        // 3. Which quadrant?  If not in upper right, translate point to upper right
        // 4. Is it outside the rectangular portion?
        // 5. Is it in the triangular point segment?
        // A "no" to any step (other than 3) ends the function and returns false
        // Is the cursor point within the hex's bounding box?
        if ((corPoint[0] > activePos[0]) && (corPoint[0] < (activePos[0] + glbHWidth)) &&
            (corPoint[1] > activePos[1]) && (corPoint[1] < (activePos[1] + glbHHeight))) {
            return currPlayer.inActiveRect(activePos, corPoint);
        }
        else {
            return false;
        }
    };
    Player.prototype.inActiveRect = function (activePos, corPoint) {
        // Which quadrant?  If not in upper right, translate point to upper right
        var diffX = Math.abs((activePos[0] + (glbHWidth / 2)) - corPoint[0]);
        var diffY = Math.abs((activePos[1] + (glbHHeight / 2)) - corPoint[1]);
        // Is the point within the rectangular segment?
        if (diffX < ((glbHWidth / 2) - (glbHHeight / 2))) {
            return true;
        }
        else {
            return currPlayer.inActiveTri(diffX, diffY);
        }
    };
    Player.prototype.inActiveTri = function (diffX, diffY) {
        // Is the point within the triangular segment?
        // Begin by mirroring the x point horizontally
        var mirrX = (glbHHeight / 2) - diffY;
        if (mirrX > diffY) {
            return true;
        }
        else {
            return false;
        }
    };
    return Player;
}());
/// <reference path="references.ts" />
var landIncrement = 0; // Global incrementing variable used to set landID
var Land = (function () {
    function Land(sentSettings) {
        this.devSelection = [];
        this.landID = landIncrement;
        landIncrement++;
        this.lSize = sentSettings[0];
        this.lShape = sentSettings[1];
        this.lClimate = sentSettings[2];
    }
    // Returns the tile's place in the array (tileID) given its row and column position
    Land.prototype.getID = function (givPos) {
        for (var cTile = 0; cTile < this.tileArray.length; cTile++) {
            if ((this.tileArray[cTile].axialRow === givPos[0]) &&
                (this.tileArray[cTile].axialCol === givPos[1])) {
                return cTile;
            }
        }
        return null;
    };
    // Returns an array of applicable tileIDs when given a player's territory and
    //  an array of landscape types
    Land.prototype.getSel = function (sTerr, sLscp) {
        var selResult = [];
        for (var ringWidth = 0; ringWidth < glbBrdWidth; ringWidth++) {
            var thisRing = [];
            if (ringWidth === 0) {
                thisRing[0] = [0, 0];
            }
            else {
                thisRing = this.tileArray[0].getRing(ringWidth);
            }
            for (var ringTile = 0; ringTile < thisRing.length; ringTile++) {
                var tTileID = this.getID(thisRing[ringTile]);
                var tTile = currLand.tileArray[tTileID];
                if (tTile != null) {
                    if (((inArr(sTerr, tTileID)) || (sTerr === null)) &&
                        (inArr(sLscp, tTile.landscape)) &&
                        ((tTile.development === undefined) || (tTile.development === null))) {
                        selResult.push(tTileID);
                    }
                }
            }
        }
        return selResult;
    };
    // Read land tile data from json file
    Land.prototype.readLand = function () {
    };
    // Randomly alter an individual tile, based on neighbors and land's climate
    Land.prototype.genTileLscp = function (tileSnapShot, axialCoord) {
        var probArray = [1, 1, 1, 1, 0, 0];
        var neighbors = [];
        var seaCount = 0;
        var tTile = this.tileArray[this.getID(axialCoord)];
        neighbors = tTile.getNeighbors();
        for (var tNeigh = 0; tNeigh < neighbors.length; tNeigh++) {
            var tSnapTile = tileSnapShot[this.getID(neighbors[tNeigh])];
            if (tSnapTile === undefined) {
                seaCount++;
            }
            else if (tSnapTile.landscape === eLSCP.Desert) {
                probArray[eLSCP.Desert] += 0.2;
            }
            else if (tSnapTile.landscape === eLSCP.Forested) {
                probArray[eLSCP.Forested] += 0.2;
            }
            else if (tSnapTile.landscape === eLSCP.Grassy) {
                probArray[eLSCP.Grassy] += 0.0;
            }
            else if (tSnapTile.landscape === eLSCP.Rocky) {
                probArray[eLSCP.Rocky] += 0.2;
            }
            else if (tSnapTile.landscape === eLSCP.Sea) {
                seaCount++;
            }
            else {
                console.log("Error, unexpected neighbor landscape type.");
            }
        }
        var probSum = 0;
        for (var iii = 0; iii < 4; iii++) {
            // Multiply the current neighbor probability by the climate's probability
            var climateProb = climateArray[this.lClimate].prob;
            probArray[iii] *= climateProb[iii];
            probSum += probArray[iii];
        }
        // If the total of the probabilities is above a ceiling constant, adjust downwards
        if (probSum >= glbLscpCeil) {
            for (var jjj = 0; jjj < 4; jjj++) {
                probArray[jjj] *= (glbLscpCeil / probSum);
            }
        }
        // If a non-sea tile borders the sea, calculate probability of change (n/6/2)
        if ((tTile.landscape != eLSCP.Sea) && (seaCount > 0)) {
            if (Math.random() < (seaCount / 12)) {
                return eLSCP.Sea;
            }
        }
        else if (tTile.landscape === eLSCP.Sea) {
            if (Math.random() > (((6 - seaCount) / 6) * 0.5)) {
                return eLSCP.Sea;
            }
        }
        // Use the probability array to determine the tile's landscape fate
        probSum = 0;
        var rand = Math.random();
        for (var tLSCP = 0; tLSCP < 4; tLSCP++) {
            probSum += probArray[tLSCP];
            if (rand < probSum) {
                return tLSCP;
            }
        }
        // If the above for-loop does not trigger a return, give the original landscape
        return tTile.landscape;
    };
    Land.prototype.genTileDev = function (tileSnapShot, axialCoord) {
        var tTile = this.tileArray[this.getID(axialCoord)];
        var neighbors = [];
        neighbors = tTile.getNeighbors();
        var clustered = false;
        // If there are two similar landscapes clustered together, allow the possibility of
        //  a black development
        for (var tNeigh = 0; tNeigh < neighbors.length; tNeigh++) {
            var tSnapTile = tileSnapShot[this.getID(neighbors[tNeigh])];
            if (tSnapTile != undefined) {
                if (tSnapTile.landscape === tTile.landscape) {
                    clustered = true;
                }
            }
        }
        if ((clustered) && (lscpArray[tTile.landscape].black != null)) {
            if (Math.random() < (climateArray[this.lClimate].prob[tTile.landscape] *
                climateArray[this.lClimate].devel)) {
                return lscpArray[tTile.landscape].black;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    Land.prototype.genShore = function () {
        for (var stepWidth = 0; stepWidth < glbBrdWidth; stepWidth++) {
            var thisRing = [];
            if (stepWidth === 0) {
                thisRing[0] = [0, 0];
            }
            else {
                thisRing = this.tileArray[0].getRing(stepWidth);
            }
            for (var ringTile = 0; ringTile < thisRing.length; ringTile++) {
                var tTile = this.tileArray[this.getID(thisRing[ringTile])];
                var neighbors = [];
                neighbors = tTile.getNeighbors();
                var bordersSea = false;
                // Check to see if any of the six neighbors are sea
                for (var cNeigh = 0; cNeigh < neighbors.length; cNeigh++) {
                    if ((this.tileArray[this.getID(neighbors[cNeigh])] === undefined) ||
                        (this.tileArray[this.getID(neighbors[cNeigh])].landscape === eLSCP.Sea)) {
                        bordersSea = true;
                    }
                }
                // If at least one is sea, and the tile is grassy or desert, make it into shore
                if (((bordersSea) && (tTile.landscape === eLSCP.Grassy)) ||
                    ((bordersSea) && (tTile.landscape === eLSCP.Desert))) {
                    this.tileArray[this.getID(thisRing[ringTile])].landscape = eLSCP.Shore;
                }
            }
        }
    };
    // Modification to each tile in a series of rings, performed multiple times
    Land.prototype.genLandStep = function () {
        var tileSnapShot = this.tileArray;
        for (var stepWidth = 0; stepWidth < glbBrdWidth; stepWidth++) {
            var thisRing = [];
            if (stepWidth === 0) {
                thisRing[0] = [0, 0];
            }
            else {
                thisRing = this.tileArray[0].getRing(stepWidth);
            }
            for (var ringTile = 0; ringTile < thisRing.length; ringTile++) {
                var result = this.genTileLscp(tileSnapShot, thisRing[ringTile]);
                this.tileArray[this.getID(thisRing[ringTile])].landscape = result;
            }
        }
    };
    Land.prototype.genDevStep = function () {
        var tileSnapShot = this.tileArray;
        for (var stepWidth = 0; stepWidth < glbBrdWidth; stepWidth++) {
            var thisRing = [];
            if (stepWidth === 0) {
                thisRing[0] = [0, 0];
            }
            else {
                thisRing = this.tileArray[0].getRing(stepWidth);
            }
            for (var ringTile = 0; ringTile < thisRing.length; ringTile++) {
                var result = this.genTileDev(tileSnapShot, thisRing[ringTile]);
                this.tileArray[this.getID(thisRing[ringTile])].development = result;
            }
        }
    };
    // Procedurally generate land tiles based on selected land properties
    Land.prototype.generateLand = function () {
        var landWidth = (this.lSize + 2) * 2;
        var landTiles = [];
        var tileCounter = 0;
        // Create grass/sea template
        for (var currWidth = 0; currWidth < glbBrdWidth; currWidth++) {
            // Make grassy center
            if (currWidth === 0) {
                landTiles[0] = new Tile(0, [0, 0]);
                landTiles[0].landscape = eLSCP.Grassy;
                tileCounter++;
            }
            else {
                var thisRing = landTiles[0].getRing(currWidth);
                for (var ringTile = 0; ringTile < thisRing.length; ringTile++) {
                    landTiles[tileCounter] = new Tile(tileCounter, thisRing[ringTile]);
                    if (currWidth <= landWidth) {
                        landTiles[tileCounter].landscape = eLSCP.Grassy;
                    }
                    else {
                        landTiles[tileCounter].landscape = eLSCP.Sea;
                    }
                    tileCounter++;
                }
            }
        }
        this.tileArray = landTiles;
        // Step through templated tiles, modifying landscape and black development
        for (var tStep = 0; tStep < 5; tStep++) {
            this.genLandStep();
        }
        this.genShore();
        this.genDevStep();
    };
    Land.prototype.genTestLand = function () {
        // Generate a small debug land
        var landWidth = 3;
        var landTiles = [];
        var tileCounter = 0;
        for (var currWidth = 0; currWidth < glbBrdWidth; currWidth++) {
            // Make grassy center
            if (currWidth === 0) {
                landTiles[0] = new Tile(0, [0, 0]);
                landTiles[0].landscape = eLSCP.Grassy;
                tileCounter++;
            }
            else {
                var thisRing = landTiles[0].getRing(currWidth);
                for (var ringTile = 0; ringTile < thisRing.length; ringTile++) {
                    landTiles[tileCounter] = new Tile(tileCounter, thisRing[ringTile]);
                    if (currWidth < landWidth) {
                        landTiles[tileCounter].landscape = eLSCP.Grassy;
                    }
                    else if (currWidth === landWidth) {
                        landTiles[tileCounter].landscape = eLSCP.Shore;
                    }
                    else {
                        landTiles[tileCounter].landscape = eLSCP.Sea;
                    }
                    tileCounter++;
                }
            }
        }
        this.tileArray = landTiles;
    };
    Land.prototype.displayLand = function () {
        var lTiles = this.tileArray;
        var landSprites = [];
        var landDevSprs = [];
        for (var currX = (-1 * glbBoundary); currX < glbBoundary; currX++) {
            for (var currY = (-1 * glbBoundary); currY < glbBoundary; currY++) {
                var arraySpot = this.getID([currX, currY]);
                if (arraySpot != null) {
                    var tTile = lTiles[arraySpot];
                    var tSprite = new Sprite(sprMed[lscpArray[tTile.landscape].sprID]);
                    tSprite.scale.set(tTile.scale, tTile.scale);
                    var sPos = hexToPoint([currX, currY]);
                    tSprite.position.set(sPos[0], sPos[1]);
                    stage.addChild(tSprite);
                    landSprites[arraySpot] = tSprite;
                }
            }
        }
        for (var currX = (-1 * glbBoundary); currX < glbBoundary; currX++) {
            for (var currY = (-1 * glbBoundary); currY < glbBoundary; currY++) {
                var arraySpot = this.getID([currX, currY]);
                if (arraySpot != null) {
                    var tTile = lTiles[arraySpot];
                    var tDevSpr = null;
                    // If there is no development for this tile, insert an empty hex as placeholder
                    if (tTile.development === undefined) {
                        tDevSpr = new Sprite(sprMed["tallblank.png"]);
                    }
                    else if (tTile.development === null) {
                        tDevSpr = new Sprite(sprMed["tallblank.png"]);
                    }
                    else {
                        tDevSpr = new Sprite(sprMed[develArray[tTile.development].sprID[0]]);
                    }
                    tDevSpr.scale.set(tTile.scale, tTile.scale);
                    var sdPos = hexToPoint([currX, currY]);
                    tDevSpr.position.set(sdPos[0], (sdPos[1] - glbHHeight));
                    stage.addChild(tDevSpr);
                    landDevSprs[arraySpot] = tDevSpr;
                }
            }
        }
        this.spriteArray = landSprites;
        this.sprDevArray = landDevSprs;
        renderer.render(stage);
    };
    Land.prototype.refreshLandSpr = function () {
        for (var cTileID = 0; cTileID < this.tileArray.length - 1; cTileID++) {
            var cTile = this.tileArray[cTileID];
            cTile.reDrawTile();
        }
    };
    Land.prototype.getClrDev = function (devClr) {
        for (var attempts = 0; attempts < 80; attempts++) {
            var randDev = Math.floor(Math.random() * 27) + 4;
            if (devClr === null) {
                if (!inArr(this.devSelection, randDev)) {
                    return randDev;
                }
            }
            else {
                if ((!inArr(this.devSelection, randDev)) &&
                    (develArray[randDev].color === devClr)) {
                    return randDev;
                }
            }
        }
        console.log("Error, could not return appropriate development.");
        return 0;
    };
    Land.prototype.genDevSelection = function () {
        this.devSelection = [];
        for (var tDev = 0; tDev < 12; tDev++) {
            // Ensure 1 of each color except black, 2 of violet, and fill the rest of the 12 
            //  randomly
            if (tDev < 4) {
                this.devSelection.push(this.getClrDev(tDev + 1));
            }
            else if (tDev === 4) {
                this.devSelection.push(this.getClrDev(tDev + 1));
                this.devSelection.push(this.getClrDev(tDev + 1));
                tDev++;
            }
            else {
                var randClr = Math.floor(Math.random() * 4) + 1;
                this.devSelection.push(this.getClrDev(randClr));
            }
        }
    };
    return Land;
}());
/// <reference path="references.ts" />
var Climate = (function () {
    function Climate(setID, setDevel) {
        this.id = setID;
        this.devel = setDevel;
    }
    return Climate;
}());
var climateArray = [];
climateArray[eCLIMATE.Desert] = new Climate(eCLIMATE.Desert, 0.25);
climateArray[eCLIMATE.Desert].prob = [];
climateArray[eCLIMATE.Desert].prob[eLSCP.Desert] = 0.3;
climateArray[eCLIMATE.Desert].prob[eLSCP.Forested] = 0.05;
climateArray[eCLIMATE.Desert].prob[eLSCP.Grassy] = 0.15;
climateArray[eCLIMATE.Desert].prob[eLSCP.Rocky] = 0.1;
climateArray[eCLIMATE.Forested] = new Climate(eCLIMATE.Forested, 0.25);
climateArray[eCLIMATE.Forested].prob = [];
climateArray[eCLIMATE.Forested].prob[eLSCP.Desert] = 0.05;
climateArray[eCLIMATE.Forested].prob[eLSCP.Forested] = 0.6;
climateArray[eCLIMATE.Forested].prob[eLSCP.Grassy] = 0.2;
climateArray[eCLIMATE.Forested].prob[eLSCP.Rocky] = 0.1;
climateArray[eCLIMATE.Grassy] = new Climate(eCLIMATE.Grassy, 0.25);
climateArray[eCLIMATE.Grassy].prob = [];
climateArray[eCLIMATE.Grassy].prob[eLSCP.Desert] = 0.1;
climateArray[eCLIMATE.Grassy].prob[eLSCP.Forested] = 0.2;
climateArray[eCLIMATE.Grassy].prob[eLSCP.Grassy] = 0.4;
climateArray[eCLIMATE.Grassy].prob[eLSCP.Rocky] = 0.1;
climateArray[eCLIMATE.Rocky] = new Climate(eCLIMATE.Rocky, 0.25);
climateArray[eCLIMATE.Rocky].prob = [];
climateArray[eCLIMATE.Rocky].prob[eLSCP.Desert] = 0.1;
climateArray[eCLIMATE.Rocky].prob[eLSCP.Forested] = 0.1;
climateArray[eCLIMATE.Rocky].prob[eLSCP.Grassy] = 0.2;
climateArray[eCLIMATE.Rocky].prob[eLSCP.Rocky] = 0.4;
climateArray[eCLIMATE.Varied] = new Climate(eCLIMATE.Varied, 0.4);
climateArray[eCLIMATE.Varied].prob = [];
climateArray[eCLIMATE.Varied].prob[eLSCP.Desert] = 0.2;
climateArray[eCLIMATE.Varied].prob[eLSCP.Forested] = 0.4;
climateArray[eCLIMATE.Varied].prob[eLSCP.Grassy] = 0.1;
climateArray[eCLIMATE.Varied].prob[eLSCP.Rocky] = 0.4;
climateArray[eCLIMATE.Jungle] = new Climate(eCLIMATE.Jungle, 0.5);
climateArray[eCLIMATE.Jungle].prob = [];
climateArray[eCLIMATE.Jungle].prob[eLSCP.Desert] = 0.05;
climateArray[eCLIMATE.Jungle].prob[eLSCP.Forested] = 0.6;
climateArray[eCLIMATE.Jungle].prob[eLSCP.Grassy] = 0.1;
climateArray[eCLIMATE.Jungle].prob[eLSCP.Rocky] = 0.05;
climateArray[eCLIMATE.Mountain] = new Climate(eCLIMATE.Mountain, 0.5);
climateArray[eCLIMATE.Mountain].prob = [];
climateArray[eCLIMATE.Mountain].prob[eLSCP.Desert] = 0.1;
climateArray[eCLIMATE.Mountain].prob[eLSCP.Forested] = 0.1;
climateArray[eCLIMATE.Mountain].prob[eLSCP.Grassy] = 0.2;
climateArray[eCLIMATE.Mountain].prob[eLSCP.Rocky] = 0.6;
climateArray[eCLIMATE.Wet] = new Climate(eCLIMATE.Wet, 0.5);
climateArray[eCLIMATE.Wet].prob = [];
climateArray[eCLIMATE.Wet].prob[eLSCP.Desert] = 0.01;
climateArray[eCLIMATE.Wet].prob[eLSCP.Forested] = 0.2;
climateArray[eCLIMATE.Wet].prob[eLSCP.Grassy] = 0.4;
climateArray[eCLIMATE.Wet].prob[eLSCP.Rocky] = 0.1;
/// <reference path="references.ts" />
var Landcape = (function () {
    function Landcape(setID, setSprID, setTinyID, setName, setBlack) {
        this.id = setID;
        this.sprID = setSprID;
        this.tinyID = setTinyID;
        this.name = setName;
        this.black = setBlack;
    }
    return Landcape;
}());
var lscpArray = [];
lscpArray[eLSCP.Desert] = new Landcape(eLSCP.Desert, "desert.png", "tinydesert.png", "Desert", null);
lscpArray[eLSCP.Forested] = new Landcape(eLSCP.Forested, "forested.png", "tinyforested.png", "Forested", eDEVEL.Jungle);
lscpArray[eLSCP.Grassy] = new Landcape(eLSCP.Desert, "grassy.png", "tinygrassy.png", "Grassy", eDEVEL.Freshwater);
lscpArray[eLSCP.Rocky] = new Landcape(eLSCP.Rocky, "rocky.png", "tinyrocky.png", "Rocky", eDEVEL.Cave);
lscpArray[eLSCP.Sea] = new Landcape(eLSCP.Sea, "sea.png", "tinysea.png", "Sea", null);
lscpArray[eLSCP.Shore] = new Landcape(eLSCP.Shore, "shore.png", "tinyshore.png", "Shore", null);
/// <reference path="references.ts" />
var Development = (function () {
    function Development(setID, setSprID, setName, setColor, setLscpRequired, setDescription) {
        this.id = setID;
        this.sprID = setSprID;
        this.name = setName;
        this.color = setColor;
        this.lscpRequired = setLscpRequired;
        this.description = setDescription;
    }
    return Development;
}());
var develArray = [];
develArray[eDEVEL.Jungle] = new Development(eDEVEL.Jungle, ["jungle1.png", "jungle2.png"], "Jungle", eDCLR.Black, [eLSCP.Forested], "No effect");
develArray[eDEVEL.Jungle].cost = [];
develArray[eDEVEL.Jungle].requirement = [];
develArray[eDEVEL.Jungle].result = [];
develArray[eDEVEL.Freshwater] = new Development(eDEVEL.Freshwater, ["freshwater1.png", "freshwater2.png"], "Freshwater", eDCLR.Black, [eLSCP.Grassy], "No effect");
develArray[eDEVEL.Freshwater].cost = [];
develArray[eDEVEL.Freshwater].requirement = [];
develArray[eDEVEL.Freshwater].result = [];
develArray[eDEVEL.Cave] = new Development(eDEVEL.Cave, ["cave1.png", "cave2.png"], "Cave", eDCLR.Black, [eLSCP.Rocky], "No effect");
develArray[eDEVEL.Cave].cost = [];
develArray[eDEVEL.Cave].requirement = [];
develArray[eDEVEL.Cave].result = [];
develArray[eDEVEL.BaseCamp] = new Development(eDEVEL.BaseCamp, ["basecamp.png"], "Base Camp", eDCLR.Black, [eLSCP.Shore], "Result: +1 Food, +1 Material");
develArray[eDEVEL.BaseCamp].cost = [];
develArray[eDEVEL.BaseCamp].requirement = [];
develArray[eDEVEL.BaseCamp].result = [];
develArray[eDEVEL.BaseCamp].result[eRES.Food] = 1;
develArray[eDEVEL.BaseCamp].result[eRES.Material] = 1;
develArray[eDEVEL.FireCrew] = new Development(eDEVEL.FireCrew, ["firecrew.png"], "Fire Crew", eDCLR.Blue, [eLSCP.Shore], "Result: Destroy Development, +1 Active");
develArray[eDEVEL.FireCrew].cost = [];
develArray[eDEVEL.FireCrew].cost[eCOST.Material] = -1;
develArray[eDEVEL.FireCrew].requirement = [];
develArray[eDEVEL.FireCrew].result = [];
develArray[eDEVEL.FireCrew].result[eRES.Destroy] = 1;
develArray[eDEVEL.FireCrew].result[eRES.Active] = 1;
develArray[eDEVEL.LaborPort] = new Development(eDEVEL.LaborPort, ["laborport.png"], "Labor Port", eDCLR.Blue, [eLSCP.Shore], "Requires: -1 Treasure; Result: +3 Actives");
develArray[eDEVEL.LaborPort].cost = [];
develArray[eDEVEL.LaborPort].cost[eCOST.Material] = -1;
develArray[eDEVEL.LaborPort].cost[eCOST.Treasure] = -1;
develArray[eDEVEL.LaborPort].requirement = [];
develArray[eDEVEL.LaborPort].requirement[eREQ.Treasure] = -1;
develArray[eDEVEL.LaborPort].result = [];
develArray[eDEVEL.LaborPort].result[eRES.Active] = 3;
develArray[eDEVEL.SeasSideParade] = new Development(eDEVEL.SeasSideParade, ["seassideparade.png"], "Sea Side Parade", eDCLR.Blue, [eLSCP.Shore], ("Requires: -1 Material; Result: For the rest of the month, all Blue developments " +
    "give an additional +1 Treasure"));
develArray[eDEVEL.SeasSideParade].cost = [];
develArray[eDEVEL.SeasSideParade].cost[eCOST.Food] = -2;
develArray[eDEVEL.SeasSideParade].cost[eCOST.Material] = -2;
develArray[eDEVEL.SeasSideParade].cost[eCOST.Treasure] = -2;
develArray[eDEVEL.SeasSideParade].requirement = [];
develArray[eDEVEL.SeasSideParade].requirement[eREQ.Material] = -1;
develArray[eDEVEL.SeasSideParade].result = [];
develArray[eDEVEL.SeasSideParade].result[eRES.BlueTreasure] = 1;
develArray[eDEVEL.TradeHarbor] = new Development(eDEVEL.TradeHarbor, ["tradeharbor.png"], "Trade Harbor", eDCLR.Blue, [eLSCP.Shore], ("Requires: -1 Food, -1 Material; Result: +1 Treasure"));
develArray[eDEVEL.TradeHarbor].cost = [];
develArray[eDEVEL.TradeHarbor].cost[eCOST.Material] = -2;
develArray[eDEVEL.TradeHarbor].requirement = [];
develArray[eDEVEL.TradeHarbor].requirement[eREQ.Food] = -1;
develArray[eDEVEL.TradeHarbor].requirement[eREQ.Material] = -1;
develArray[eDEVEL.TradeHarbor].result = [];
develArray[eDEVEL.TradeHarbor].result[eRES.Treasure] = 1;
develArray[eDEVEL.AuctionHouse] = new Development(eDEVEL.AuctionHouse, ["actionhouse.png"], "Auction House", eDCLR.Blue, [eLSCP.Shore], ("Requires: -1 Treasure; Result: +2 Treasure"));
develArray[eDEVEL.AuctionHouse].cost = [];
develArray[eDEVEL.AuctionHouse].cost[eCOST.Material] = -3;
develArray[eDEVEL.AuctionHouse].cost[eCOST.Treasure] = -1;
develArray[eDEVEL.AuctionHouse].requirement = [];
develArray[eDEVEL.AuctionHouse].requirement[eREQ.Treasure] = -1;
develArray[eDEVEL.AuctionHouse].result = [];
develArray[eDEVEL.AuctionHouse].result[eRES.Treasure] = 2;
develArray[eDEVEL.EnvoyHarbor] = new Development(eDEVEL.EnvoyHarbor, ["envoyharbor.png"], "Envoy Harbor", eDCLR.Blue, [eLSCP.Shore], ("Requires: -1 Treasure; Result: +2 Food, +2 Material"));
develArray[eDEVEL.EnvoyHarbor].cost = [];
develArray[eDEVEL.EnvoyHarbor].cost[eCOST.Treasure] = -3;
develArray[eDEVEL.EnvoyHarbor].requirement = [];
develArray[eDEVEL.EnvoyHarbor].requirement[eREQ.Treasure] = -1;
develArray[eDEVEL.EnvoyHarbor].result = [];
develArray[eDEVEL.EnvoyHarbor].result[eRES.Food] = 2;
develArray[eDEVEL.EnvoyHarbor].result[eRES.Material] = 2;
develArray[eDEVEL.RicePaddy] = new Development(eDEVEL.RicePaddy, ["ricepaddy.png"], "Rice Paddy", eDCLR.Green, [eLSCP.Grassy], ("Result: +1 Food"));
develArray[eDEVEL.RicePaddy].cost = [];
develArray[eDEVEL.RicePaddy].cost[eCOST.Material] = -1;
develArray[eDEVEL.RicePaddy].requirement = [];
develArray[eDEVEL.RicePaddy].result = [];
develArray[eDEVEL.RicePaddy].result[eRES.Food] = 1;
develArray[eDEVEL.BoarRanch] = new Development(eDEVEL.BoarRanch, ["boarranch.png"], "Boar Ranch", eDCLR.Green, [eLSCP.Grassy], ("Requires: -1 Food; Result: +3 Food"));
develArray[eDEVEL.BoarRanch].cost = [];
develArray[eDEVEL.BoarRanch].cost[eCOST.Food] = -1;
develArray[eDEVEL.BoarRanch].cost[eCOST.Material] = -1;
develArray[eDEVEL.BoarRanch].requirement = [];
develArray[eDEVEL.BoarRanch].requirement[eREQ.Food] = -1;
develArray[eDEVEL.BoarRanch].result = [];
develArray[eDEVEL.BoarRanch].result[eRES.Food] = 3;
develArray[eDEVEL.HuntingCamp] = new Development(eDEVEL.HuntingCamp, ["huntingcamp.png"], "Hunting Camp", eDCLR.Green, [eLSCP.Forested], ("Result: +1 Food, +1 Active"));
develArray[eDEVEL.HuntingCamp].cost = [];
develArray[eDEVEL.HuntingCamp].cost[eCOST.Material] = -2;
develArray[eDEVEL.HuntingCamp].requirement = [];
develArray[eDEVEL.HuntingCamp].result = [];
develArray[eDEVEL.HuntingCamp].result[eRES.Food] = 1;
develArray[eDEVEL.HuntingCamp].result[eRES.Active] = 1;
develArray[eDEVEL.SmokeHouse] = new Development(eDEVEL.SmokeHouse, ["smokehouse.png"], "Smoke House", eDCLR.Green, [eLSCP.Grassy], ("Requires: -1 Material; Result: +3 Food"));
develArray[eDEVEL.SmokeHouse].cost = [];
develArray[eDEVEL.SmokeHouse].cost[eCOST.Material] = -2;
develArray[eDEVEL.SmokeHouse].requirement = [];
develArray[eDEVEL.SmokeHouse].requirement[eREQ.Material] = -1;
develArray[eDEVEL.SmokeHouse].result = [];
develArray[eDEVEL.SmokeHouse].result[eRES.Food] = 3;
develArray[eDEVEL.PeachOrchard] = new Development(eDEVEL.PeachOrchard, ["peachorchard.png"], "Peach Orchard", eDCLR.Green, [eLSCP.Grassy], ("Result: +2 Food"));
develArray[eDEVEL.PeachOrchard].cost = [];
develArray[eDEVEL.PeachOrchard].cost[eCOST.Material] = -2;
develArray[eDEVEL.PeachOrchard].requirement = [];
develArray[eDEVEL.PeachOrchard].result = [];
develArray[eDEVEL.PeachOrchard].result[eRES.Food] = 2;
develArray[eDEVEL.Woodcutters] = new Development(eDEVEL.Woodcutters, ["bamboocutters.png"], "Bamboo Cutters", eDCLR.Orange, [eLSCP.Forested], ("Result: +1 Material"));
develArray[eDEVEL.Woodcutters].cost = [];
develArray[eDEVEL.Woodcutters].cost[eCOST.Material] = -1;
develArray[eDEVEL.Woodcutters].requirement = [];
develArray[eDEVEL.Woodcutters].result = [];
develArray[eDEVEL.Woodcutters].result[eRES.Material] = 1;
develArray[eDEVEL.SilverMine] = new Development(eDEVEL.SilverMine, ["silvermine.png"], "Silver Mine", eDCLR.Orange, [eLSCP.Rocky], ("Requires: -2 Food; Result: +1 Treasure"));
develArray[eDEVEL.SilverMine].cost = [];
develArray[eDEVEL.SilverMine].cost[eCOST.Material] = -2;
develArray[eDEVEL.SilverMine].requirement = [];
develArray[eDEVEL.SilverMine].requirement[eREQ.Food] = -2;
develArray[eDEVEL.SilverMine].result = [];
develArray[eDEVEL.SilverMine].result[eRES.Treasure] = 1;
develArray[eDEVEL.StoneQuarry] = new Development(eDEVEL.StoneQuarry, ["stonequarry.png"], "Stone Quarry", eDCLR.Orange, [eLSCP.Rocky], ("Requires: -1 Food; Result: +3 Material"));
develArray[eDEVEL.StoneQuarry].cost = [];
develArray[eDEVEL.StoneQuarry].cost[eCOST.Material] = -2;
develArray[eDEVEL.StoneQuarry].requirement = [];
develArray[eDEVEL.StoneQuarry].requirement[eREQ.Food] = -1;
develArray[eDEVEL.StoneQuarry].result = [];
develArray[eDEVEL.StoneQuarry].result[eRES.Material] = 3;
develArray[eDEVEL.CharcoalFurnace] = new Development(eDEVEL.CharcoalFurnace, ["charcoalfurnace.png"], "Charcoal Furnace", eDCLR.Orange, [eLSCP.Forested], ("Result: +2 Material"));
develArray[eDEVEL.CharcoalFurnace].cost = [];
develArray[eDEVEL.CharcoalFurnace].cost[eCOST.Material] = -2;
develArray[eDEVEL.CharcoalFurnace].requirement = [];
develArray[eDEVEL.CharcoalFurnace].requirement[eREQ.Material] = 1;
develArray[eDEVEL.CharcoalFurnace].result = [];
develArray[eDEVEL.CharcoalFurnace].result[eRES.Material] = 3;
develArray[eDEVEL.CobaltMine] = new Development(eDEVEL.CobaltMine, ["cobaltmine.png"], "Cobalt Mine", eDCLR.Orange, [eLSCP.Rocky], ("Result: +1 Treasure"));
develArray[eDEVEL.CobaltMine].cost = [];
develArray[eDEVEL.CobaltMine].cost[eCOST.Material] = -4;
develArray[eDEVEL.CobaltMine].requirement = [];
develArray[eDEVEL.CobaltMine].result = [];
develArray[eDEVEL.CobaltMine].result[eRES.Treasure] = 1;
develArray[eDEVEL.WorkerVillage] = new Development(eDEVEL.WorkerVillage, ["workervillage.png"], "Worker Village", eDCLR.Red, [eLSCP.Desert, eLSCP.Forested, eLSCP.Grassy, eLSCP.Rocky, eLSCP.Shore], ("Requires: -1 Food; Result: +2 Active"));
develArray[eDEVEL.WorkerVillage].cost = [];
develArray[eDEVEL.WorkerVillage].cost[eCOST.Material] = -1;
develArray[eDEVEL.WorkerVillage].requirement = [];
develArray[eDEVEL.WorkerVillage].requirement[eREQ.Food] = -1;
develArray[eDEVEL.WorkerVillage].result = [];
develArray[eDEVEL.WorkerVillage].result[eRES.Active] = 2;
develArray[eDEVEL.TeaHouse] = new Development(eDEVEL.TeaHouse, ["teahouse.png"], "Tea House", eDCLR.Red, [eLSCP.Desert, eLSCP.Forested, eLSCP.Grassy, eLSCP.Rocky, eLSCP.Shore], ("Requires: -1 Food; Result: For the rest of the month, all Red developments give " +
    "an additional +1 Active"));
develArray[eDEVEL.TeaHouse].cost = [];
develArray[eDEVEL.TeaHouse].cost[eCOST.Material] = -1;
develArray[eDEVEL.TeaHouse].cost[eCOST.Treasure] = -1;
develArray[eDEVEL.TeaHouse].requirement = [];
develArray[eDEVEL.TeaHouse].requirement[eREQ.Food] = -1;
develArray[eDEVEL.TeaHouse].result = [];
develArray[eDEVEL.TeaHouse].result[eRES.RedActive] = 1;
develArray[eDEVEL.Demolition] = new Development(eDEVEL.Demolition, ["demolition.png"], "Demolition", eDCLR.Red, [eLSCP.Desert, eLSCP.Forested, eLSCP.Grassy, eLSCP.Rocky, eLSCP.Shore], ("Requires: Destroy 1 Development; Result: +1 Material"));
develArray[eDEVEL.Demolition].cost = [];
develArray[eDEVEL.Demolition].cost[eCOST.Material] = -2;
develArray[eDEVEL.Demolition].requirement = [];
develArray[eDEVEL.Demolition].requirement[eREQ.Destroy] = 1;
develArray[eDEVEL.Demolition].result = [];
develArray[eDEVEL.Demolition].result[eRES.Material] = 1;
develArray[eDEVEL.ShepherdVillage] = new Development(eDEVEL.ShepherdVillage, ["shepherdvillage.png"], "Shepherd Village", eDCLR.Red, [eLSCP.Grassy], ("Requires: -1 Food; Result: +2 Active,  +1 Material"));
develArray[eDEVEL.ShepherdVillage].cost = [];
develArray[eDEVEL.ShepherdVillage].cost[eCOST.Food] = -1;
develArray[eDEVEL.ShepherdVillage].cost[eCOST.Material] = -2;
develArray[eDEVEL.ShepherdVillage].requirement = [];
develArray[eDEVEL.ShepherdVillage].requirement[eREQ.Food] = -1;
develArray[eDEVEL.ShepherdVillage].result = [];
develArray[eDEVEL.ShepherdVillage].result[eRES.Active] = 2;
develArray[eDEVEL.ShepherdVillage].result[eRES.Material] = 1;
develArray[eDEVEL.Town] = new Development(eDEVEL.Town, ["town.png"], "Town", eDCLR.Red, [eLSCP.Desert, eLSCP.Forested, eLSCP.Grassy, eLSCP.Rocky, eLSCP.Shore], ("Requires: -2 Food; Result: +3 Active"));
develArray[eDEVEL.Town].cost = [];
develArray[eDEVEL.Town].cost[eCOST.Material] = -3;
develArray[eDEVEL.Town].cost[eCOST.Treasure] = -1;
develArray[eDEVEL.Town].requirement = [];
develArray[eDEVEL.Town].requirement[eREQ.Food] = -2;
develArray[eDEVEL.Town].result = [];
develArray[eDEVEL.Town].result[eRES.Active] = 3;
develArray[eDEVEL.MerchantShip] = new Development(eDEVEL.MerchantShip, ["merchantship.png"], "Merchant Ship", eDCLR.Violet, null, ("Requires: Destroy 1 Blue Development to build this; Result: +1 Ship"));
develArray[eDEVEL.MerchantShip].cost = [];
develArray[eDEVEL.MerchantShip].cost[eCOST.Treasure] = -2;
develArray[eDEVEL.MerchantShip].cost[eCOST.Material] = -1;
develArray[eDEVEL.MerchantShip].cost[eCOST.DestroyBlue] = 1;
develArray[eDEVEL.MerchantShip].requirement = [];
develArray[eDEVEL.MerchantShip].result = [];
develArray[eDEVEL.MerchantShip].result[eRES.Ship] = 1;
develArray[eDEVEL.VentureShip] = new Development(eDEVEL.VentureShip, ["ventureship.png"], "Venture Ship", eDCLR.Violet, null, ("Requires: Destroy 1 Green Development to build this; Result: +1 Ship"));
develArray[eDEVEL.VentureShip].cost = [];
develArray[eDEVEL.VentureShip].cost[eCOST.Food] = -4;
develArray[eDEVEL.VentureShip].cost[eCOST.Material] = -1;
develArray[eDEVEL.VentureShip].cost[eCOST.DestroyGreen] = 1;
develArray[eDEVEL.VentureShip].requirement = [];
develArray[eDEVEL.VentureShip].result = [];
develArray[eDEVEL.VentureShip].result[eRES.Ship] = 1;
develArray[eDEVEL.WorkmanShip] = new Development(eDEVEL.WorkmanShip, ["workmanship.png"], "Workman Ship", eDCLR.Violet, null, ("Requires: Destroy 1 Orange Development to build this; Result: +1 Ship"));
develArray[eDEVEL.WorkmanShip].cost = [];
develArray[eDEVEL.WorkmanShip].cost[eCOST.Material] = -4;
develArray[eDEVEL.WorkmanShip].cost[eCOST.DestroyOrange] = 1;
develArray[eDEVEL.WorkmanShip].requirement = [];
develArray[eDEVEL.WorkmanShip].result = [];
develArray[eDEVEL.WorkmanShip].result[eRES.Ship] = 1;
develArray[eDEVEL.OpulentVessel] = new Development(eDEVEL.OpulentVessel, ["opulentvessel.png"], "Opulent Vessel", eDCLR.Violet, null, ("Result: +1 Ship"));
develArray[eDEVEL.OpulentVessel].cost = [];
develArray[eDEVEL.OpulentVessel].cost[eCOST.Treasure] = -3;
develArray[eDEVEL.OpulentVessel].cost[eCOST.Material] = -2;
develArray[eDEVEL.OpulentVessel].requirement = [];
develArray[eDEVEL.OpulentVessel].result = [];
develArray[eDEVEL.OpulentVessel].result[eRES.Ship] = 1;
develArray[eDEVEL.AbundantVessel] = new Development(eDEVEL.AbundantVessel, ["abundantvessel.png"], "Abundant Vessel", eDCLR.Violet, null, ("Result: +1 Ship"));
develArray[eDEVEL.AbundantVessel].cost = [];
develArray[eDEVEL.AbundantVessel].cost[eCOST.Food] = -6;
develArray[eDEVEL.AbundantVessel].cost[eCOST.Material] = -2;
develArray[eDEVEL.AbundantVessel].requirement = [];
develArray[eDEVEL.AbundantVessel].result = [];
develArray[eDEVEL.AbundantVessel].result[eRES.Ship] = 1;
develArray[eDEVEL.SteadyVessel] = new Development(eDEVEL.SteadyVessel, ["steadyvessel.png"], "Steady Vessel", eDCLR.Violet, null, ("Result: +1 Ship"));
develArray[eDEVEL.SteadyVessel].cost = [];
develArray[eDEVEL.SteadyVessel].cost[eCOST.Material] = -7;
develArray[eDEVEL.SteadyVessel].requirement = [];
develArray[eDEVEL.SteadyVessel].result = [];
develArray[eDEVEL.SteadyVessel].result[eRES.Ship] = 1;
/// <reference path="references.ts" />
// ~~~~ Set up pixi.js ~~~~
// PIXI Aliases
var Container = PIXI.Container, autoDetectRenderer = PIXI.autoDetectRenderer, loader = PIXI.loader, resources = PIXI.loader.resources, Sprite = PIXI.Sprite, TextureCache = PIXI.utils.TextureCache, Graphics = PIXI.Graphics, Text = PIXI.Text;
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
    .add("static/img/images-0.json")
    .add("static/img/images-1.json")
    .load(onImageLoad);
// Single reference variable to be filled later
var sprMed = null;
// Create global Pixi and Tink variables
var tb = null;
// Set the default game state to 'edit'
glbState = edit;
var pointer = null;
// Initiate game values (to be obsoleted)
var littleLand = new Land([Math.floor(Math.random() * 3), eSHAPE.Round,
    (Math.floor(Math.random() * 7))]);
var currLand = littleLand;
var cPlayerArray = [];
cPlayerArray[0] = new Player();
cPlayerArray[0].playerOrder = 0;
cPlayerArray[1] = new Player();
cPlayerArray[1].playerOrder = 1;
var currPlayer = cPlayerArray[0];
var currDescCard = null;
var plrMsg = null;
function formPlayerBar() {
    // Create blank background for player bar
    var plrBG = new Graphics();
    plrBG.beginFill(0x000000);
    plrBG.drawRect(0, 0, (renderer.width - 200), 20);
    plrBG.alpha = 0.8;
    plrBG.endFill();
    plrBG.x = 0;
    plrBG.y = 0;
    stage.addChild(plrBG);
    var plrMsgContent = "Empty.";
    plrMsg = new Text(plrMsgContent, { font: "13px sans-serif", fill: "white" });
    plrMsg.position.set(3, 1);
    stage.addChild(plrMsg);
    updatePlayerBar();
}
function updatePlayerBar() {
    stage.removeChild(plrMsg);
    var plrMsgContent = "Month " + (glbMonth);
    for (var tPlr = 0; tPlr < cPlayerArray.length; tPlr++) {
        plrMsgContent += ("       Player " + (cPlayerArray[tPlr].playerOrder + 1) + ": " +
            "F-" + cPlayerArray[tPlr].food + " M-" + cPlayerArray[tPlr].material +
            " T-" + cPlayerArray[tPlr].treasure);
    }
    plrMsg = new Text(plrMsgContent, { font: "13px sans-serif", fill: "white" });
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
    designBG.x = renderer.width - 200;
    designBG.y = 0;
    stage.addChild(designBG);
    for (var cButton = 0; cButton < (glbNumLscps + glbNumBlkDevels + 2); cButton++) {
        var chosenPng = null;
        var chosenText = null;
        var bScale = 0.2;
        if (cButton < glbNumLscps) {
            // Initially invisible background for hovering/selecting effects
            editBgArray[cButton] = new Graphics();
            editBgArray[cButton].beginFill(0xFFFFFF);
            editBgArray[cButton].drawRect(0, 0, 160, 30);
            editBgArray[cButton].endFill();
            editBgArray[cButton].x = (renderer.width - 180);
            editBgArray[cButton].y = (20 + (40 * cButton));
            editBgArray[cButton].alpha = 0;
            stage.addChild(editBgArray[cButton]);
            // An example of the landscape tile in question
            editBtnArray[cButton] = new Sprite(sprMed[lscpArray[cButton].sprID]);
            editBtnArray[cButton].position.set((renderer.width - 180), (20 + 40 * cButton));
            editBtnArray[cButton].scale.set(bScale, bScale);
            stage.addChild(editBtnArray[cButton]);
            // Accompanying text
            editMsgArray[cButton] = new Text((lscpArray[cButton].name), { font: "16px sans-serif", fill: "white" });
            editMsgArray[cButton].position.set((renderer.width - 110), (25 + 40 * cButton));
            stage.addChild(editMsgArray[cButton]);
        }
        else if ((cButton >= glbNumLscps) && (cButton < (glbNumLscps + glbNumBlkDevels))) {
            // Initially invisible background for hovering/selecting effects
            editBgArray[cButton] = new Graphics();
            editBgArray[cButton].beginFill(0xFFFFFF);
            editBgArray[cButton].drawRect(0, 0, 160, 30);
            editBgArray[cButton].endFill();
            editBgArray[cButton].x = (renderer.width - 180);
            editBgArray[cButton].y = (50 + (40 * cButton));
            editBgArray[cButton].alpha = 0;
            stage.addChild(editBgArray[cButton]);
            // Set up the development's background as the button
            var bgLscp = develArray[cButton - glbNumLscps].lscpRequired[0];
            editBtnArray[cButton] = new Sprite(sprMed[lscpArray[bgLscp].sprID]);
            editBtnArray[cButton].position.set((renderer.width - 180), (50 + 40 * cButton));
            editBtnArray[cButton].scale.set(bScale, bScale);
            stage.addChild(editBtnArray[cButton]);
            // Create the development as the text and as a facade
            chosenText = develArray[cButton - glbNumLscps].name;
            var devSprID = develArray[cButton - glbNumLscps].sprID[0];
            var tDevSpr = new Sprite(sprMed[devSprID]);
            tDevSpr.scale.set(bScale, bScale);
            tDevSpr.position.set((renderer.width - 180), (20 + 40 * cButton));
            stage.addChild(tDevSpr);
            devEditArray[cButton - glbNumLscps] = tDevSpr;
            // Accompanying text
            editMsgArray[cButton] = new Text((chosenText), { font: "16px sans-serif", fill: "white" });
            editMsgArray[cButton].position.set((renderer.width - 110), (55 + 40 * cButton));
            stage.addChild(editMsgArray[cButton]);
        }
        else if (cButton === (glbNumLscps + glbNumBlkDevels)) {
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
            editMsgArray[cButton] = new Text(("Randomize"), { font: "18px sans-serif", fill: "white" });
            editMsgArray[cButton].position.set((renderer.width - 175), (renderer.height - 85));
            stage.addChild(editMsgArray[cButton]);
        }
        else if (cButton === (glbNumLscps + glbNumBlkDevels + 1)) {
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
            editMsgArray[cButton] = new Text(("Finish"), { font: "18px sans-serif", fill: "white" });
            editMsgArray[cButton].position.set((renderer.width - 175), (renderer.height - 45));
            stage.addChild(editMsgArray[cButton]);
        }
        else {
            console.log("Error: unexpected current button incremental variable.");
        }
    }
}
function removeEditBar() {
    for (var cButton = 0; cButton < editBtnArray.length; cButton++) {
        stage.removeChild(editBtnArray[cButton]);
    }
    for (var cButton = 0; cButton < editBgArray.length; cButton++) {
        stage.removeChild(editBgArray[cButton]);
        stage.removeChild(editMsgArray[cButton]);
    }
    for (var cButton = 0; cButton < devEditArray.length; cButton++) {
        stage.removeChild(devEditArray[cButton]);
    }
}
function paintLscp(clkTile) {
    // Simple landscape alteration
    if (glbPainting < glbNumLscps) {
        clkTile.landscape = glbPainting;
    }
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
/// <reference path="references.ts" />
function editHold(corPoint) {
    var clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];
    var clkAxial = pointToHex(clkPoint);
    var clkTile = currLand.tileArray[currLand.getID(clkAxial)];
    if ((clkAxial != undefined) && ((clkPoint[0] + glbOrigin[0]) < (renderer.width - 200))) {
        if (clkTile != undefined) {
            if ((clkTile.landscape != glbPainting) && (glbPainting != null)) {
                if (glbPainting < glbNumLscps) {
                    clkTile.landscape = glbPainting;
                }
                else if ((glbPainting < (glbNumLscps + glbNumBlkDevels)) &&
                    (inArr(develArray[glbPainting - glbNumLscps].lscpRequired, clkTile.landscape))) {
                    clkTile.development = glbPainting - glbNumLscps;
                }
                else {
                    console.log("Error, unexpected global painting value.");
                }
                clkTile.reDrawTile();
            }
        }
    }
}
function editClick(corPoint) {
    var clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];
    var clkAxial = pointToHex(clkPoint);
    var clkTile = currLand.tileArray[currLand.getID(clkAxial)];
    if ((clkAxial != undefined) && ((clkPoint[0] + glbOrigin[0]) < (renderer.width - 200))) {
        if (clkTile != undefined) {
            if ((glbPainting === null) && (clkTile.development != null)) {
                if (currDescCard != null) {
                    currDescCard.selfDestruct();
                }
                currDescCard = new DescCard(corPoint, clkTile);
            }
            else if (currDescCard != null) {
                currDescCard.selfDestruct();
            }
        }
    }
}
function editBarClick(clkPoint) {
    if (currDescCard != null) {
        currDescCard.selfDestruct();
    }
    var actionTaken = false;
    for (var cOption = 0; cOption < (glbNumLscps + glbNumBlkDevels + 2); cOption++) {
        if (cOption < glbNumLscps) {
            if ((clkPoint[0] > (renderer.width - 180)) &&
                (clkPoint[0]) < (renderer.width - 20) &&
                (clkPoint[1]) > (20 + (40 * cOption)) &&
                (clkPoint[1]) < (10 + 40 * (1 + cOption))) {
                glbPainting = cOption;
                glbEditBarSel = cOption;
                editBgArray[cOption].alpha = 0.4;
                actionTaken = true;
            }
        }
        else if ((cOption >= glbNumLscps) && (cOption < (glbNumLscps + glbNumBlkDevels))) {
            if ((clkPoint[0] > (renderer.width - 180)) &&
                (clkPoint[0]) < (renderer.width - 20) &&
                (clkPoint[1]) > (50 + (40 * cOption)) &&
                (clkPoint[1]) < (40 + 40 * (1 + cOption))) {
                glbPainting = cOption;
                glbEditBarSel = cOption;
                editBgArray[cOption].alpha = 0.4;
                actionTaken = true;
            }
        }
        else if (cOption === (glbNumLscps + glbNumBlkDevels)) {
            if ((clkPoint[0] > (renderer.width - 180)) &&
                (clkPoint[0]) < (renderer.width - 20) &&
                (clkPoint[1]) > (renderer.height - 90) &&
                (clkPoint[1]) < (renderer.height - 60)) {
                currLand.lClimate = Math.floor(Math.random() * 7);
                currLand.lSize = Math.floor(Math.random() * 3);
                currLand.generateLand();
                currLand.genDevSelection();
                currLand.refreshLandSpr();
            }
        }
        else if (cOption === (glbNumLscps + glbNumBlkDevels + 1)) {
            if ((clkPoint[0] > (renderer.width - 180)) &&
                (clkPoint[0]) < (renderer.width - 20) &&
                (clkPoint[1]) > (renderer.height - 50) &&
                (clkPoint[1]) < (renderer.height - 20)) {
                glbState = buildSetup;
            }
        }
        else {
            console.log("Unexpected edit bar value.");
        }
    }
    if (actionTaken === false) {
        glbPainting = null;
        glbEditBarSel = null;
    }
}
function buildClick(corPoint) {
    var clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];
    var clkAxial = pointToHex(clkPoint);
    var clkTileID = currLand.getID(clkAxial);
    var clkTile = currLand.tileArray[clkTileID];
    if ((clkAxial != undefined) && ((clkPoint[0] + glbOrigin[0]) < (renderer.width - 200))) {
        if (clkTile != undefined) {
            if (inArr(glbTileSelArray, clkTileID)) {
                // Build the selected development and set the current player as its owner
                clkTile.development = glbBuildSel;
                clkTile.ownedBy = currPlayer.playerID;
                currPlayer.ownedDevs.push(clkTileID);
                currPlayer.discard.push(clkTileID);
                currPlayer.addTerritory(clkTileID);
                clkTile.reDrawTile();
                // Move to the next game state
                if ((glbMonth === 0) && (currPlayer.playerID === 0)) {
                    currPlayer = cPlayerArray[1];
                    glbState = buildSetup;
                }
                else if ((glbMonth === 0) && currPlayer.playerID === 1) {
                    veClearTint(glbPulseArray);
                    glbTileSelArray = [];
                    glbPulseArray = [];
                    glbState = plrMonSetup;
                }
                else {
                    console.log("Error, unexpected player ID.");
                }
            }
        }
    }
}
function activeClick(corPoint) {
    var clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];
    var clkAxial = pointToHex(clkPoint);
    var clkTile = currLand.tileArray[currLand.getID(clkAxial)];
    if ((clkAxial != undefined) && ((clkPoint[0] + glbOrigin[0]) < (renderer.width - 200))) {
        if (clkTile != undefined) {
            if (clkTile.development != null) {
                currDescCard = new DescCard(corPoint, clkTile);
            }
        }
    }
}
function activeBarClick(corPoint) {
    // If the clicked point is within the range of all the hexagons
    var numActives = 0;
    if (currPlayer.hand.length = 3) {
        numActives = 3;
    }
    else {
        numActives = this.hand.length;
    }
    var activeRow = numActives - (numActives % 3);
    // Check that the cursor exists in the neighborhood of the active slots.  A buffer of
    //  10xp is added to allow the hover shading to be removed if the cursor exits the hex
    if ((corPoint[0] > (renderer.width - 110 - glbHWidth - (glbHWidth / 2))) &&
        (corPoint[0] < (renderer.width - 60 + glbHWidth + (glbHWidth / 2))) &&
        (corPoint[1] > (-10 + (glbHWidth / 2))) &&
        (corPoint[1] < (10 + (glbHWidth / 2) +
            (((activeRow * 1.3) / 3) * glbHHeight) + glbHHeight + (glbHHeight / 2)))) {
        for (var activeSpot = 0; activeSpot < currPlayer.activeSprArray.length; activeSpot++) {
            var activePos = currPlayer.getActivePos(activeSpot);
            if (currPlayer.inActiveHex(activePos, corPoint)) {
                activeChoiceClick(activeSpot);
            }
        }
    }
}
function activeChoiceClick(activePos) {
}
function hoverActiveBar(corPoint) {
    // If the hovered point is within the range of all the hexagons
    var numActives = 0;
    if (currPlayer.hand.length = 3) {
        numActives = 3;
    }
    else {
        numActives = this.hand.length;
    }
    var activeRow = numActives - (numActives % 3);
    // Check that the cursor exists in the neighborhood of the active slots.  A buffer of
    //  10xp is added to allow the hover shading to be removed if the cursor exits the hex
    if ((corPoint[0] > (renderer.width - 110 - glbHWidth - (glbHWidth / 2))) &&
        (corPoint[0] < (renderer.width - 60 + glbHWidth + (glbHWidth / 2))) &&
        (corPoint[1] > (-10 + (glbHWidth / 2))) &&
        (corPoint[1] < (10 + (glbHWidth / 2) +
            (((activeRow * 1.3) / 3) * glbHHeight) + glbHHeight + (glbHHeight / 2)))) {
        for (var activeSpot = 0; activeSpot < currPlayer.activeSprArray.length; activeSpot++) {
            var activePos = currPlayer.getActivePos(activeSpot);
            activePos[1] += 30;
            if (currPlayer.inActiveHex(activePos, corPoint)) {
                currPlayer.activeSprArray[activeSpot].tint = rgbToHclr([160, 160, 160]);
            }
            else {
                currPlayer.activeSprArray[activeSpot].tint = rgbToHclr([255, 255, 255]);
            }
        }
    }
}
function hoverTile(corPoint) {
    var clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];
    var hovAxial = pointToHex(clkPoint);
    if (hovAxial != undefined) {
        var hovArraySpot = currLand.getID([hovAxial[0], hovAxial[1]]);
        if (currLand.spriteArray[hovArraySpot] != undefined) {
            if (lastHex != null) {
                var lastArraySpot = currLand.getID([lastHex[0], lastHex[1]]);
                if (currLand.spriteArray[lastArraySpot] != undefined) {
                    currLand.spriteArray[lastArraySpot].tint = rgbToHclr([255, 255, 255]);
                }
            }
            currLand.spriteArray[hovArraySpot].tint = rgbToHclr([160, 160, 160]);
            lastHex = hovAxial;
        }
        else {
            if (lastHex != null) {
                var lastArraySpot = currLand.getID([lastHex[0], lastHex[1]]);
                currLand.spriteArray[lastArraySpot].tint = rgbToHclr([255, 255, 255]);
            }
        }
    }
}
function hoverEditBar(corPoint) {
    for (var cOption = 0; cOption < (glbNumLscps + glbNumBlkDevels + 2); cOption++) {
        if (cOption < glbNumLscps) {
            if ((corPoint[0] > (renderer.width - 180)) &&
                (corPoint[0]) < (renderer.width - 20) &&
                (corPoint[1]) > (20 + (40 * cOption)) &&
                (corPoint[1]) < (10 + 40 * (1 + cOption))) {
                editBgArray[cOption].alpha = 0.6;
            }
            else if (glbEditBarSel != cOption) {
                editBgArray[cOption].alpha = 0;
            }
            else {
                editBgArray[cOption].alpha = 0.4;
            }
        }
        else if ((cOption >= glbNumLscps) && (cOption < (glbNumLscps + glbNumBlkDevels))) {
            if ((corPoint[0] > (renderer.width - 180)) &&
                (corPoint[0]) < (renderer.width - 20) &&
                (corPoint[1]) > (50 + (40 * cOption)) &&
                (corPoint[1]) < (40 + 40 * (1 + cOption))) {
                editBgArray[cOption].alpha = 0.6;
            }
            else if (glbEditBarSel != cOption) {
                editBgArray[cOption].alpha = 0;
            }
            else {
                editBgArray[cOption].alpha = 0.4;
            }
        }
        else if (cOption === (glbNumLscps + glbNumBlkDevels)) {
            if ((corPoint[0] > (renderer.width - 180)) &&
                (corPoint[0]) < (renderer.width - 20) &&
                (corPoint[1]) > (renderer.height - 90) &&
                (corPoint[1]) < (renderer.height - 60)) {
                editBgArray[cOption].alpha = 0.6;
            }
            else if (glbEditBarSel != cOption) {
                editBgArray[cOption].alpha = 0;
            }
            else {
                editBgArray[cOption].alpha = 0.4;
            }
        }
        else if (cOption === (glbNumLscps + glbNumBlkDevels + 1)) {
            if ((corPoint[0] > (renderer.width - 180)) &&
                (corPoint[0]) < (renderer.width - 20) &&
                (corPoint[1]) > (renderer.height - 50) &&
                (corPoint[1]) < (renderer.height - 20)) {
                editBgArray[cOption].alpha = 0.6;
            }
            else if (glbEditBarSel != cOption) {
                editBgArray[cOption].alpha = 0;
            }
            else {
                editBgArray[cOption].alpha = 0.4;
            }
        }
        else {
            console.log("Unexpected edit bar value.");
        }
    }
}
/// <reference path="references.ts" />
var DescCard = (function () {
    function DescCard(givenPoint, givenTile) {
        this.clkPoint = [];
        this.tile = null;
        this.tArray = [];
        this.clkPoint = givenPoint;
        this.tile = givenTile;
        var dPosition = [];
        var tDevel = develArray[this.tile.development];
        // Make display card on left
        if (this.clkPoint[0] > 0) {
            dPosition[0] = 20;
        }
        else if (this.clkPoint[0] <= 0) {
            dPosition[0] = renderer.width - 550;
        }
        else {
            console.log("Unexpected describing point value.");
        }
        dPosition[1] = 40;
        // Card background
        var sprName = "tallblank.png";
        if (tDevel.color === eDCLR.Black) {
            sprName = "blackcard.png";
        }
        else if (tDevel.color === eDCLR.Blue) {
            sprName = "bluecard.png";
        }
        else if (tDevel.color === eDCLR.Green) {
            sprName = "greencard.png";
        }
        else if (tDevel.color === eDCLR.Orange) {
            sprName = "orangecard.png";
        }
        else if (tDevel.color === eDCLR.Red) {
            sprName = "redcard.png";
        }
        else if (tDevel.color === eDCLR.Violet) {
            sprName = "violetcard.png";
        }
        else {
            console.log("Error, unexpected dev color value.");
        }
        this.tArray[0] = new Sprite(sprMed[sprName]);
        this.tArray[0].position.set(dPosition[0], dPosition[1]);
        this.tArray[0].scale.set(0.65, 0.65);
        // Development name
        this.tArray.push(new Text(tDevel.name, { font: "24px sans-serif", fill: "black" }));
        this.tArray[this.tArray.length - 1].position.set((dPosition[0] + 28), (dPosition[1] + 38));
        // Background tile 
        this.tArray.push(new Sprite(sprMed[lscpArray[tDevel.lscpRequired[0]].sprID]));
        this.tArray[this.tArray.length - 1].scale.set(0.5, 0.5);
        this.tArray[this.tArray.length - 1].position.set((dPosition[0] + 93), (dPosition[1] + 181));
        // Development sprite
        this.tArray.push(new Sprite(sprMed[tDevel.sprID[0]]));
        this.tArray[this.tArray.length - 1].scale.set(0.5, 0.5);
        this.tArray[this.tArray.length - 1].position.set((dPosition[0] + 93), (dPosition[1] + 101));
        // Development description
        var expDesc = [];
        expDesc = this.expandDescription(tDevel);
        for (var tExpD = 0; tExpD < expDesc.length; tExpD++) {
            this.tArray.push(new Text(expDesc[tExpD], { font: "16px sans-serif", fill: "black" }));
            this.tArray[this.tArray.length - 1].position.set((dPosition[0] + 28), (dPosition[1] + 298 + (tExpD * 20)));
        }
        // Development cost
        var expCost = this.expandCost(tDevel);
        this.tArray.push(new Text(expCost, { font: "16px sans-serif", fill: "black" }));
        this.tArray[this.tArray.length - 1].position.set((dPosition[0] + 28), (dPosition[1] + 475));
        // Development required tiles
        var tLscpReq = tDevel.lscpRequired;
        for (var tLReq = 0; tLReq < tLscpReq.length; tLReq++) {
            this.tArray.push(new Sprite(sprMed[lscpArray[tLscpReq[tLReq]].tinyID]));
            this.tArray[this.tArray.length - 1].position.set(((dPosition[0] + 255) -
                (tLReq * 32)), (dPosition[1] + 475));
        }
        // Applying description sprites to stage
        for (var tSpr = 0; tSpr < this.tArray.length; tSpr++) {
            stage.addChild(this.tArray[tSpr]);
        }
    }
    DescCard.prototype.expandDescription = function (tDevel) {
        var pieces = tDevel.description.split(";");
        var result = [];
        var anyOver30 = false;
        for (var tPiece = 0; tPiece < pieces.length; tPiece++) {
            // If any individual pieces is too long to fit on a line
            if (pieces[tPiece].length > 34) {
                anyOver30 = true;
                // Split the pieces array into 'before' and 'after'
                var beforeT = [];
                for (var iii = 0; iii < tPiece; iii++) {
                    beforeT[iii] = pieces[iii];
                }
                var afterT = [];
                for (var iii = tPiece + 1; iii < pieces.length; iii++) {
                    afterT[iii] = pieces[iii];
                }
                // Break the >30 character piece along a space
                var tooLong = pieces[tPiece];
                var metaPieces = [];
                // Use pseudo-while loop to break an indeterminate number of times
                for (var iii = 0; iii < 80; iii++) {
                    if (tooLong.length > 34) {
                        for (var jjj = 35; jjj > 0; jjj--) {
                            if (tooLong[jjj] === " ") {
                                metaPieces.push(tooLong.slice(1, jjj));
                                tooLong = tooLong.slice(jjj);
                                break;
                            }
                        }
                    }
                    else {
                        metaPieces.push(tooLong.slice(1, tooLong.length));
                        break;
                    }
                }
                // Re-assemble the pieces array
                result = [];
                result = beforeT.concat(metaPieces, afterT);
            }
        }
        if (anyOver30 === false) {
            result = pieces;
        }
        return result;
    };
    DescCard.prototype.expandCost = function (tDevel) {
        if (tDevel.cost.length > 0) {
            var result = "";
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
        else {
            return "";
        }
    };
    DescCard.prototype.selfDestruct = function () {
        for (var tSpr = 0; tSpr < this.tArray.length; tSpr++) {
            stage.removeChild(this.tArray[tSpr]);
        }
        currDescCard = null;
    };
    return DescCard;
}());
/// <reference path="references.ts" />
// The selected array of tileIDs pulse over time
var pulseState = 0;
function vePulse(selTiles) {
    pulseState += 3;
    for (var tTileID = 0; tTileID < selTiles.length; tTileID++) {
        // If the pulse state is between 0 and 50, increase darkness; vice versa if between
        //  50 and 100, if greater than 100 reset
        var pVal = 220;
        if ((pulseState < 200) && (pulseState >= 100)) {
            pVal = 220 - (100 - (pulseState - 100));
        }
        else if (pulseState < 100) {
            pVal = 220 - pulseState;
        }
        else {
            pulseState = 0;
        }
        currLand.spriteArray[selTiles[tTileID]].tint = rgbToHclr([pVal, pVal, pVal]);
    }
}
function veClearTint(selTiles) {
    for (var tTileID = 0; tTileID < selTiles.length; tTileID++) {
        currLand.spriteArray[selTiles[tTileID]].tint = rgbToHclr([255, 255, 255]);
    }
}
function veAllEffects() {
    if (glbPulseArray != []) {
        vePulse(glbPulseArray);
    }
}
/// <reference path="global.ts" />
/// <reference path="tile.ts" />
/// <reference path="player.ts" />
/// <reference path="land.ts" />
/// <reference path="climate.ts" />
/// <reference path="landscape.ts" />
/// <reference path="development.ts" />
/// <reference path="setup.ts" />
/// <reference path="action.ts" />
/// <reference path="description.ts" />
/// <reference path="effect.ts" />
/// <reference path="state.ts" /> 
/// <reference path="references.ts" />
function onImageLoad() {
    // Fill sprite reference with texture info
    sprMed = loader.resources["static/img/images-0.json"].textures;
    var spr2 = loader.resources["static/img/images-1.json"].textures;
    for (var key in spr2) {
        sprMed[key] = spr2[key];
    }
    // Create the Tink instance
    tb = new Tink(PIXI, renderer.view);
    pointer = tb.makePointer();
    // This code runs when the texture atlas has loaded
    currLand.generateLand();
    currLand.displayLand();
    currLand.genDevSelection();
    formPlayerBar();
    formEditBar();
    // Start the game loop
    gameLoop();
}
function gameLoop() {
    requestAnimationFrame(gameLoop);
    // Update Tink
    tb.update();
    // Process any visual effects
    veAllEffects();
    // Utilize the current game state
    glbState();
    renderer.render(stage);
}
// Executes on loop when game is in 'edit' state
var lastHex = null;
function edit() {
    // Click event handling
    if (pointer.isDown === true) {
        if ((pointer.x) < (renderer.width - 200)) {
            editHold([pointer.x, pointer.y]);
        }
    }
    pointer.tap = function () {
        if ((pointer.x) > (renderer.width - 200)) {
            editBarClick([pointer.x, pointer.y]);
        }
        else {
            editClick([pointer.x, pointer.y]);
        }
    };
    if (pointer.x < (renderer.width - 200)) {
        hoverTile([pointer.x, pointer.y]);
    }
    else {
        hoverEditBar([pointer.x, pointer.y]);
    }
}
// Applies prior to every game round
function monthSetup() {
}
// Applies prior to each player's round
function plrMonSetup() {
    // Draw the hand of three developments
    for (var tCard = 0; tCard < 3; tCard++) {
        if (currPlayer.deck.length === 0) {
            currPlayer.shuffleDeck();
            currPlayer.drawDev();
        }
        else {
            currPlayer.drawDev();
        }
    }
    currPlayer.displayActives();
    currPlayer.displayHand();
    glbState = active;
}
// Player chooses which of their active developments to use
function active() {
    // Click event handling
    pointer.tap = function () {
        if ((pointer.x) < (renderer.width - 200)) {
            activeClick([pointer.x, pointer.y]);
        }
        else {
            activeBarClick([pointer.x, pointer.y]);
        }
    };
    if (pointer.x < (renderer.width - 200)) {
        hoverTile([pointer.x, pointer.y]);
    }
    else {
        hoverActiveBar([pointer.x, pointer.y]);
    }
}
// Choosing a target for a development's effect
function selDevel() {
}
// Player chooses new developments to purchase
function buy() {
}
// Set up the graphical/logical backing for the building state
function buildSetup() {
    if (glbMonth === 0) {
        glbBuildSel = eDEVEL.BaseCamp;
    }
    var tDevel = develArray[glbBuildSel];
    glbTileSelArray = [];
    glbTileSelArray = currLand.getSel(null, tDevel.lscpRequired);
    if (glbTileSelArray != []) {
        glbPulseArray = glbTileSelArray;
        removeEditBar();
        glbState = build;
    }
    else {
        console.log("No applicable tile.");
    }
}
// Player chooses where to build a newly bought development
function build() {
    // Click event handling
    pointer.tap = function () {
        buildClick([pointer.x, pointer.y]);
    };
    hoverTile([pointer.x, pointer.y]);
}
// Applies after a player has finished their turn
function cleanup() {
}
