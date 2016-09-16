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
var glbLastHex = null;
var glbPointerDown = false;
var glbNumLscps = 6;
var glbNumBlkDevels = 3;
var glbNumRes = 8;
var glbLscpCeil = 0.225;
var glbMonth = 0;
var glbEditBarSel = null;
var glbBuildSel = null;
var glbTileSelArray = [];
var glbSideBar = null;
// Set global button constants
var glbBPadding = 3;
var glbBWidth = 160;
var glbBHeight = 30;
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
    eDEVEL[eDEVEL["SeaSideParade"] = 6] = "SeaSideParade";
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
        var tBSprite = currLand.sprBorderArray[arraySpot];
        var tDevSpr = currLand.sprDevArray[arraySpot];
        tSprite.texture = sprMed[lscpArray[this.landscape].sprID];
        if (this.ownedBy != null) {
            tBSprite.alpha = 1;
            tBSprite.tint = rgbToHclr(cPlayerArray[this.ownedBy].color);
        }
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
        this.color = [255, 255, 255];
        this.food = 2;
        this.material = 2;
        this.treasure = 0;
        this.ships = 0;
        this.territory = [];
        this.ownedDevs = [];
        this.deck = [];
        this.hand = [];
        this.inPlay = [];
        this.discard = [];
        this.trash = [];
        this.activeEffects = [];
        this.actions = 3;
        this.actionHistory = [];
        this.playerID = playerIncrement;
        playerIncrement++;
        if (this.playerID === 0) {
            this.color = [255, 0, 0];
        }
        else if (this.playerID === 1) {
            this.color = [0, 0, 255];
        }
    }
    Player.prototype.getResource = function (resource) {
        if (resource === eCOST.Food) {
            return this.food;
        }
        else if (resource === eCOST.Material) {
            return this.material;
        }
        else if (resource === eCOST.Treasure) {
            return this.treasure;
        }
        else {
            console.log("Error: Unexpected resource request to Player.");
        }
    };
    Player.prototype.giveResource = function (resource, amount) {
        if (resource === eCOST.Food) {
            this.food += amount;
        }
        else if (resource === eCOST.Material) {
            this.material += amount;
        }
        else if (resource === eCOST.Treasure) {
            this.treasure += amount;
        }
        else {
            console.log("Error: Unexpected resource request to Player.");
        }
    };
    Player.prototype.addTerritory = function (tTileID) {
        var tTile = currLand.tileArray[tTileID];
        tTile.development = glbBuildSel;
        tTile.ownedBy = currPlayer.playerID;
        currPlayer.ownedDevs.push(tTile.development);
        currPlayer.discard.push(tTileID);
        if (!(inArr(this.territory, tTileID))) {
            this.territory.push(tTileID);
        }
        var neighbors = tTile.getNeighbors();
        for (var cNeigh = 0; cNeigh < neighbors.length; cNeigh++) {
            if (!(inArr(this.territory, neighbors[cNeigh]))) {
                this.territory.push(currLand.getID(neighbors[cNeigh]));
                var tNTile = currLand.tileArray[currLand.getID(neighbors[cNeigh])];
                // If the neighboring tile has an ownerless black development, add it to the
                //  territory
                if (tNTile.development != null) {
                    if ((develArray[tNTile.development].color === eDCLR.Black) &&
                        (tNTile.ownedBy === null)) {
                        tNTile.ownedBy = currPlayer.playerID;
                        currPlayer.ownedDevs.push(tNTile.development);
                        currPlayer.discard.push(currLand.getID(neighbors[cNeigh]));
                    }
                }
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
            // randDev is a random integer such that 0 ≤ randDev ≤ deckSpot
            var randDev = Math.floor(Math.random() * (deckSpot + 1));
            var dsValue = this.deck[deckSpot];
            var rdValue = this.deck[randDev];
            // Exchange values
            this.deck[deckSpot] = rdValue;
            this.deck[randDev] = dsValue;
        }
    };
    Player.prototype.drawContainer = function () {
        if ((currPlayer.deck.length === 0) && (currPlayer.discard.length === 0)) {
            return;
        }
        else if (currPlayer.deck.length === 0) {
            currPlayer.shuffleDeck();
            currPlayer.drawDev();
        }
        else {
            currPlayer.drawDev();
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
    Player.prototype.discardHand = function () {
        for (var tHandCard = 0; tHandCard < this.hand.length; tHandCard++) {
            this.discard.push(this.hand[tHandCard]);
        }
        this.hand = [];
    };
    Player.prototype.discardInPlay = function () {
        for (var tPlayCard = 0; tPlayCard < this.inPlay.length; tPlayCard++) {
            this.discard.push(this.inPlay[tPlayCard]);
        }
        this.inPlay = [];
    };
    Player.prototype.removeCard = function (tileID) {
        var handSpot = null;
        for (var tCard = 0; tCard < this.hand.length; tCard++) {
            if (this.hand[tCard] === tileID) {
                handSpot = tCard;
            }
        }
        if (handSpot === null) {
            console.log("Error: Tile not found in hand.");
        }
        this.inPlay.push(this.hand[handSpot]);
        var newHand = this.hand.slice(0, handSpot);
        for (var tCard = (newHand.length + 1); tCard < this.hand.length; tCard++) {
            newHand.push(this.hand[tCard]);
        }
        this.hand = newHand;
    };
    return Player;
}());
/// <reference path="references.ts" />
var landIncrement = 0; // Global incrementing variable used to set landID
var Land = (function () {
    function Land(sentSettings) {
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
        var landBSprites = [];
        var landDevSprs = [];
        for (var currX = (-1 * glbBoundary); currX < glbBoundary; currX++) {
            for (var currY = (-1 * glbBoundary); currY < glbBoundary; currY++) {
                var arraySpot = this.getID([currX, currY]);
                if (arraySpot != null) {
                    // Add landscape sprite
                    var tTile = lTiles[arraySpot];
                    var tSprite = new Sprite(sprMed[lscpArray[tTile.landscape].sprID]);
                    tSprite.scale.set(tTile.scale, tTile.scale);
                    var sPos = hexToPoint([currX, currY]);
                    tSprite.position.set(sPos[0], sPos[1]);
                    stage.addChild(tSprite);
                    landSprites[arraySpot] = tSprite;
                    // Add border sprite
                    var tBSprite = new Sprite(sprMed["whiteborder.png"]);
                    tBSprite.scale.set(tTile.scale, tTile.scale);
                    tBSprite.position.set(sPos[0], sPos[1]);
                    stage.addChild(tBSprite);
                    landBSprites[arraySpot] = tBSprite;
                    landBSprites[arraySpot].alpha = 0;
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
        this.sprBorderArray = landBSprites;
        this.sprDevArray = landDevSprs;
        renderer.render(stage);
    };
    Land.prototype.refreshLandSpr = function () {
        for (var cTileID = 0; cTileID < this.tileArray.length - 1; cTileID++) {
            var cTile = this.tileArray[cTileID];
            cTile.reDrawTile();
        }
    };
    return Land;
}());
/// <reference path="references.ts" />
var DevSet = (function () {
    function DevSet() {
    }
    DevSet.prototype.genDevSelection = function () {
        this.dSet = [];
        for (var tDev = 0; tDev < 12; tDev++) {
            // Ensure 1 of each color except black, 2 of violet, and fill the rest of the 12 
            //  randomly
            if (tDev < 4) {
                this.dSet.push(develArray[this.getClrDev(tDev + 1)]);
            }
            else if (tDev === 4) {
                this.dSet.push(develArray[this.getClrDev(tDev + 1)]);
                this.dSet.push(develArray[this.getClrDev(tDev + 1)]);
                tDev++;
            }
            else {
                this.dSet.push(develArray[this.getClrDev(null)]);
            }
        }
        this.dSet.sort(function (a, b) {
            return (a.id - b.id);
        });
    };
    DevSet.prototype.getClrDev = function (devClr) {
        var devIds = [];
        for (var cDev = 0; cDev < this.dSet.length; cDev++) {
            devIds.push(this.dSet[cDev].id);
        }
        for (var attempts = 0; attempts < 80; attempts++) {
            var randDevId = Math.floor(Math.random() * 27) + 4;
            if (devClr === null) {
                if (!inArr(devIds, randDevId)) {
                    return randDevId;
                }
            }
            else {
                if ((!inArr(devIds, randDevId)) &&
                    (develArray[randDevId].color === devClr)) {
                    return randDevId;
                }
            }
        }
        console.log("Error, could not return appropriate development.");
        return 0;
    };
    DevSet.prototype.organizeByCost = function () {
        var buyableSet = [];
        var rejectSet = [];
        for (var cDev = 0; cDev < this.dSet.length; cDev++) {
            var buyable = true;
            if (!this.dSet[cDev].checkCost(eCOST.Food)) {
                buyable = false;
            }
            if (!this.dSet[cDev].checkCost(eCOST.Material)) {
                buyable = false;
            }
            if (!this.dSet[cDev].checkCost(eCOST.Treasure)) {
                buyable = false;
            }
            if (buyable) {
                buyableSet.push(this.dSet[cDev]);
            }
            else {
                rejectSet.push(this.dSet[cDev]);
            }
        }
        return [buyableSet, rejectSet];
    };
    return DevSet;
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
lscpArray[eLSCP.Forested] = new Landcape(eLSCP.Forested, "forested.png", "tinyforested.png", "Forest", eDEVEL.Jungle);
lscpArray[eLSCP.Grassy] = new Landcape(eLSCP.Desert, "grassy.png", "tinygrassy.png", "Plain", eDEVEL.Freshwater);
lscpArray[eLSCP.Rocky] = new Landcape(eLSCP.Rocky, "rocky.png", "tinyrocky.png", "Highlands", eDEVEL.Cave);
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
    Development.prototype.checkCost = function (resource) {
        var test = currPlayer.getResource(resource);
        if ((this.cost[resource] === undefined) ||
            (this.cost[resource] <= currPlayer.getResource(resource))) {
            return true;
        }
        else {
            return false;
        }
    };
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
develArray[eDEVEL.FireCrew].cost[eCOST.Material] = 1;
develArray[eDEVEL.FireCrew].requirement = [];
develArray[eDEVEL.FireCrew].result = [];
develArray[eDEVEL.FireCrew].result[eRES.Destroy] = 1;
develArray[eDEVEL.FireCrew].result[eRES.Active] = 1;
develArray[eDEVEL.LaborPort] = new Development(eDEVEL.LaborPort, ["laborport.png"], "Labor Port", eDCLR.Blue, [eLSCP.Shore], "Requires: 1 Treasure,; Result: +3 Actives");
develArray[eDEVEL.LaborPort].cost = [];
develArray[eDEVEL.LaborPort].cost[eCOST.Material] = 1;
develArray[eDEVEL.LaborPort].cost[eCOST.Treasure] = 1;
develArray[eDEVEL.LaborPort].requirement = [];
develArray[eDEVEL.LaborPort].requirement[eREQ.Treasure] = 1;
develArray[eDEVEL.LaborPort].result = [];
develArray[eDEVEL.LaborPort].result[eRES.Active] = 3;
develArray[eDEVEL.SeaSideParade] = new Development(eDEVEL.SeaSideParade, ["seasideparade.png"], "Sea Side Parade", eDCLR.Blue, [eLSCP.Shore], ("Requires: 1 Material,; Result: For the rest of the month, all Blue developments " +
    "give an additional +1 Treasure"));
develArray[eDEVEL.SeaSideParade].cost = [];
develArray[eDEVEL.SeaSideParade].cost[eCOST.Food] = 2;
develArray[eDEVEL.SeaSideParade].cost[eCOST.Material] = 2;
develArray[eDEVEL.SeaSideParade].cost[eCOST.Treasure] = 2;
develArray[eDEVEL.SeaSideParade].requirement = [];
develArray[eDEVEL.SeaSideParade].requirement[eREQ.Material] = 1;
develArray[eDEVEL.SeaSideParade].result = [];
develArray[eDEVEL.SeaSideParade].result[eRES.BlueTreasure] = 1;
develArray[eDEVEL.TradeHarbor] = new Development(eDEVEL.TradeHarbor, ["tradeharbor.png"], "Trade Harbor", eDCLR.Blue, [eLSCP.Shore], ("Requires: 1 Food, 1 Material,; Result: +1 Treasure"));
develArray[eDEVEL.TradeHarbor].cost = [];
develArray[eDEVEL.TradeHarbor].cost[eCOST.Material] = 2;
develArray[eDEVEL.TradeHarbor].requirement = [];
develArray[eDEVEL.TradeHarbor].requirement[eREQ.Food] = 1;
develArray[eDEVEL.TradeHarbor].requirement[eREQ.Material] = 1;
develArray[eDEVEL.TradeHarbor].result = [];
develArray[eDEVEL.TradeHarbor].result[eRES.Treasure] = 1;
develArray[eDEVEL.AuctionHouse] = new Development(eDEVEL.AuctionHouse, ["auctionhouse.png"], "Auction House", eDCLR.Blue, [eLSCP.Shore], ("Requires: 1 Treasure,; Result: +2 Treasure"));
develArray[eDEVEL.AuctionHouse].cost = [];
develArray[eDEVEL.AuctionHouse].cost[eCOST.Material] = 3;
develArray[eDEVEL.AuctionHouse].cost[eCOST.Treasure] = 1;
develArray[eDEVEL.AuctionHouse].requirement = [];
develArray[eDEVEL.AuctionHouse].requirement[eREQ.Treasure] = 1;
develArray[eDEVEL.AuctionHouse].result = [];
develArray[eDEVEL.AuctionHouse].result[eRES.Treasure] = 2;
develArray[eDEVEL.EnvoyHarbor] = new Development(eDEVEL.EnvoyHarbor, ["envoyharbor.png"], "Envoy Harbor", eDCLR.Blue, [eLSCP.Shore], ("Requires: 1 Treasure,; Result: +2 Food, +2 Material"));
develArray[eDEVEL.EnvoyHarbor].cost = [];
develArray[eDEVEL.EnvoyHarbor].cost[eCOST.Treasure] = 3;
develArray[eDEVEL.EnvoyHarbor].requirement = [];
develArray[eDEVEL.EnvoyHarbor].requirement[eREQ.Treasure] = 1;
develArray[eDEVEL.EnvoyHarbor].result = [];
develArray[eDEVEL.EnvoyHarbor].result[eRES.Food] = 2;
develArray[eDEVEL.EnvoyHarbor].result[eRES.Material] = 2;
develArray[eDEVEL.RicePaddy] = new Development(eDEVEL.RicePaddy, ["ricepaddy.png"], "Rice Paddy", eDCLR.Green, [eLSCP.Grassy], ("Result: +1 Food"));
develArray[eDEVEL.RicePaddy].cost = [];
develArray[eDEVEL.RicePaddy].cost[eCOST.Material] = 1;
develArray[eDEVEL.RicePaddy].requirement = [];
develArray[eDEVEL.RicePaddy].result = [];
develArray[eDEVEL.RicePaddy].result[eRES.Food] = 1;
develArray[eDEVEL.BoarRanch] = new Development(eDEVEL.BoarRanch, ["boarranch.png"], "Boar Ranch", eDCLR.Green, [eLSCP.Grassy], ("Requires: 1 Food,; Result: +3 Food"));
develArray[eDEVEL.BoarRanch].cost = [];
develArray[eDEVEL.BoarRanch].cost[eCOST.Food] = 1;
develArray[eDEVEL.BoarRanch].cost[eCOST.Material] = 1;
develArray[eDEVEL.BoarRanch].requirement = [];
develArray[eDEVEL.BoarRanch].requirement[eREQ.Food] = 1;
develArray[eDEVEL.BoarRanch].result = [];
develArray[eDEVEL.BoarRanch].result[eRES.Food] = 3;
develArray[eDEVEL.HuntingCamp] = new Development(eDEVEL.HuntingCamp, ["huntingcamp.png"], "Hunting Camp", eDCLR.Green, [eLSCP.Forested], ("Result: +1 Food, +1 Active"));
develArray[eDEVEL.HuntingCamp].cost = [];
develArray[eDEVEL.HuntingCamp].cost[eCOST.Material] = 2;
develArray[eDEVEL.HuntingCamp].requirement = [];
develArray[eDEVEL.HuntingCamp].result = [];
develArray[eDEVEL.HuntingCamp].result[eRES.Food] = 1;
develArray[eDEVEL.HuntingCamp].result[eRES.Active] = 1;
develArray[eDEVEL.SmokeHouse] = new Development(eDEVEL.SmokeHouse, ["smokehouse.png"], "Smoke House", eDCLR.Green, [eLSCP.Grassy], ("Requires: 1 Material,; Result: +3 Food"));
develArray[eDEVEL.SmokeHouse].cost = [];
develArray[eDEVEL.SmokeHouse].cost[eCOST.Material] = 2;
develArray[eDEVEL.SmokeHouse].requirement = [];
develArray[eDEVEL.SmokeHouse].requirement[eREQ.Material] = 1;
develArray[eDEVEL.SmokeHouse].result = [];
develArray[eDEVEL.SmokeHouse].result[eRES.Food] = 3;
develArray[eDEVEL.PeachOrchard] = new Development(eDEVEL.PeachOrchard, ["peachorchard.png"], "Peach Orchard", eDCLR.Green, [eLSCP.Grassy], ("Result: +2 Food"));
develArray[eDEVEL.PeachOrchard].cost = [];
develArray[eDEVEL.PeachOrchard].cost[eCOST.Material] = 2;
develArray[eDEVEL.PeachOrchard].requirement = [];
develArray[eDEVEL.PeachOrchard].result = [];
develArray[eDEVEL.PeachOrchard].result[eRES.Food] = 2;
develArray[eDEVEL.Woodcutters] = new Development(eDEVEL.Woodcutters, ["woodcutters.png"], "Woodcutters", eDCLR.Orange, [eLSCP.Forested], ("Result: +1 Material"));
develArray[eDEVEL.Woodcutters].cost = [];
develArray[eDEVEL.Woodcutters].cost[eCOST.Material] = 1;
develArray[eDEVEL.Woodcutters].requirement = [];
develArray[eDEVEL.Woodcutters].result = [];
develArray[eDEVEL.Woodcutters].result[eRES.Material] = 1;
develArray[eDEVEL.SilverMine] = new Development(eDEVEL.SilverMine, ["silvermine.png"], "Silver Mine", eDCLR.Orange, [eLSCP.Rocky], ("Requires: 2 Food,; Result: +1 Treasure"));
develArray[eDEVEL.SilverMine].cost = [];
develArray[eDEVEL.SilverMine].cost[eCOST.Material] = 2;
develArray[eDEVEL.SilverMine].requirement = [];
develArray[eDEVEL.SilverMine].requirement[eREQ.Food] = 2;
develArray[eDEVEL.SilverMine].result = [];
develArray[eDEVEL.SilverMine].result[eRES.Treasure] = 1;
develArray[eDEVEL.StoneQuarry] = new Development(eDEVEL.StoneQuarry, ["stonequarry.png"], "Stone Quarry", eDCLR.Orange, [eLSCP.Rocky], ("Requires: 1 Food,; Result: +3 Material"));
develArray[eDEVEL.StoneQuarry].cost = [];
develArray[eDEVEL.StoneQuarry].cost[eCOST.Material] = 2;
develArray[eDEVEL.StoneQuarry].requirement = [];
develArray[eDEVEL.StoneQuarry].requirement[eREQ.Food] = 1;
develArray[eDEVEL.StoneQuarry].result = [];
develArray[eDEVEL.StoneQuarry].result[eRES.Material] = 3;
develArray[eDEVEL.CharcoalFurnace] = new Development(eDEVEL.CharcoalFurnace, ["charcoalfurnace.png"], "Charcoal Furnace", eDCLR.Orange, [eLSCP.Forested], ("Result: +2 Material"));
develArray[eDEVEL.CharcoalFurnace].cost = [];
develArray[eDEVEL.CharcoalFurnace].cost[eCOST.Material] = 2;
develArray[eDEVEL.CharcoalFurnace].requirement = [];
develArray[eDEVEL.CharcoalFurnace].requirement[eREQ.Material] = 1;
develArray[eDEVEL.CharcoalFurnace].result = [];
develArray[eDEVEL.CharcoalFurnace].result[eRES.Material] = 3;
develArray[eDEVEL.CobaltMine] = new Development(eDEVEL.CobaltMine, ["cobaltmine.png"], "Cobalt Mine", eDCLR.Orange, [eLSCP.Rocky], ("Result: +1 Treasure"));
develArray[eDEVEL.CobaltMine].cost = [];
develArray[eDEVEL.CobaltMine].cost[eCOST.Material] = 4;
develArray[eDEVEL.CobaltMine].requirement = [];
develArray[eDEVEL.CobaltMine].result = [];
develArray[eDEVEL.CobaltMine].result[eRES.Treasure] = 1;
develArray[eDEVEL.WorkerVillage] = new Development(eDEVEL.WorkerVillage, ["workervillage.png"], "Worker Village", eDCLR.Red, [eLSCP.Desert, eLSCP.Forested, eLSCP.Grassy, eLSCP.Rocky, eLSCP.Shore], ("Requires: 1 Food,; Result: +2 Active"));
develArray[eDEVEL.WorkerVillage].cost = [];
develArray[eDEVEL.WorkerVillage].cost[eCOST.Material] = 1;
develArray[eDEVEL.WorkerVillage].requirement = [];
develArray[eDEVEL.WorkerVillage].requirement[eREQ.Food] = 1;
develArray[eDEVEL.WorkerVillage].result = [];
develArray[eDEVEL.WorkerVillage].result[eRES.Active] = 2;
develArray[eDEVEL.TeaHouse] = new Development(eDEVEL.TeaHouse, ["teahouse.png"], "Tea House", eDCLR.Red, [eLSCP.Desert, eLSCP.Forested, eLSCP.Grassy, eLSCP.Rocky, eLSCP.Shore], ("Requires: 1 Food,; Result: For the rest of the month, all Red developments give " +
    "an additional +1 Active"));
develArray[eDEVEL.TeaHouse].cost = [];
develArray[eDEVEL.TeaHouse].cost[eCOST.Material] = 1;
develArray[eDEVEL.TeaHouse].cost[eCOST.Treasure] = 1;
develArray[eDEVEL.TeaHouse].requirement = [];
develArray[eDEVEL.TeaHouse].requirement[eREQ.Food] = 1;
develArray[eDEVEL.TeaHouse].result = [];
develArray[eDEVEL.TeaHouse].result[eRES.RedActive] = 1;
develArray[eDEVEL.Demolition] = new Development(eDEVEL.Demolition, ["demolition.png"], "Demolition", eDCLR.Red, [eLSCP.Desert, eLSCP.Forested, eLSCP.Grassy, eLSCP.Rocky, eLSCP.Shore], ("Requires: Destroy 1 Development,; Result: +1 Material"));
develArray[eDEVEL.Demolition].cost = [];
develArray[eDEVEL.Demolition].cost[eCOST.Material] = 2;
develArray[eDEVEL.Demolition].requirement = [];
develArray[eDEVEL.Demolition].requirement[eREQ.Destroy] = 1;
develArray[eDEVEL.Demolition].result = [];
develArray[eDEVEL.Demolition].result[eRES.Material] = 1;
develArray[eDEVEL.ShepherdVillage] = new Development(eDEVEL.ShepherdVillage, ["shepherdvillage.png"], "Shepherd Village", eDCLR.Red, [eLSCP.Grassy], ("Requires: 1 Food,; Result: +2 Active, +1 Material"));
develArray[eDEVEL.ShepherdVillage].cost = [];
develArray[eDEVEL.ShepherdVillage].cost[eCOST.Food] = 1;
develArray[eDEVEL.ShepherdVillage].cost[eCOST.Material] = 2;
develArray[eDEVEL.ShepherdVillage].requirement = [];
develArray[eDEVEL.ShepherdVillage].requirement[eREQ.Food] = 1;
develArray[eDEVEL.ShepherdVillage].result = [];
develArray[eDEVEL.ShepherdVillage].result[eRES.Active] = 2;
develArray[eDEVEL.ShepherdVillage].result[eRES.Material] = 1;
develArray[eDEVEL.Town] = new Development(eDEVEL.Town, ["town.png"], "Town", eDCLR.Red, [eLSCP.Desert, eLSCP.Forested, eLSCP.Grassy, eLSCP.Rocky, eLSCP.Shore], ("Requires: 2 Food,; Result: +3 Active"));
develArray[eDEVEL.Town].cost = [];
develArray[eDEVEL.Town].cost[eCOST.Material] = 3;
develArray[eDEVEL.Town].cost[eCOST.Treasure] = 1;
develArray[eDEVEL.Town].requirement = [];
develArray[eDEVEL.Town].requirement[eREQ.Food] = 2;
develArray[eDEVEL.Town].result = [];
develArray[eDEVEL.Town].result[eRES.Active] = 3;
develArray[eDEVEL.MerchantShip] = new Development(eDEVEL.MerchantShip, ["merchantship.png"], "Merchant Ship", eDCLR.Violet, [eLSCP.Sea], ("Requires: Destroy 1 Blue Development to build this,; Result: +1 Ship"));
develArray[eDEVEL.MerchantShip].cost = [];
develArray[eDEVEL.MerchantShip].cost[eCOST.Treasure] = 2;
develArray[eDEVEL.MerchantShip].cost[eCOST.Material] = 1;
develArray[eDEVEL.MerchantShip].cost[eCOST.DestroyBlue] = 1;
develArray[eDEVEL.MerchantShip].requirement = [];
develArray[eDEVEL.MerchantShip].result = [];
develArray[eDEVEL.MerchantShip].result[eRES.Ship] = 1;
develArray[eDEVEL.VentureShip] = new Development(eDEVEL.VentureShip, ["ventureship.png"], "Venture Ship", eDCLR.Violet, [eLSCP.Sea], ("Requires: Destroy 1 Green Development to build this,; Result: +1 Ship"));
develArray[eDEVEL.VentureShip].cost = [];
develArray[eDEVEL.VentureShip].cost[eCOST.Food] = 4;
develArray[eDEVEL.VentureShip].cost[eCOST.Material] = 1;
develArray[eDEVEL.VentureShip].cost[eCOST.DestroyGreen] = 1;
develArray[eDEVEL.VentureShip].requirement = [];
develArray[eDEVEL.VentureShip].result = [];
develArray[eDEVEL.VentureShip].result[eRES.Ship] = 1;
develArray[eDEVEL.WorkmanShip] = new Development(eDEVEL.WorkmanShip, ["workmanship.png"], "Workman Ship", eDCLR.Violet, [eLSCP.Sea], ("Requires: Destroy 1 Orange Development to build this,; Result: +1 Ship"));
develArray[eDEVEL.WorkmanShip].cost = [];
develArray[eDEVEL.WorkmanShip].cost[eCOST.Material] = 4;
develArray[eDEVEL.WorkmanShip].cost[eCOST.DestroyOrange] = 1;
develArray[eDEVEL.WorkmanShip].requirement = [];
develArray[eDEVEL.WorkmanShip].result = [];
develArray[eDEVEL.WorkmanShip].result[eRES.Ship] = 1;
develArray[eDEVEL.OpulentVessel] = new Development(eDEVEL.OpulentVessel, ["opulentvessel.png"], "Opulent Vessel", eDCLR.Violet, [eLSCP.Sea], ("Result: +1 Ship"));
develArray[eDEVEL.OpulentVessel].cost = [];
develArray[eDEVEL.OpulentVessel].cost[eCOST.Treasure] = 3;
develArray[eDEVEL.OpulentVessel].cost[eCOST.Material] = 2;
develArray[eDEVEL.OpulentVessel].requirement = [];
develArray[eDEVEL.OpulentVessel].result = [];
develArray[eDEVEL.OpulentVessel].result[eRES.Ship] = 1;
develArray[eDEVEL.AbundantVessel] = new Development(eDEVEL.AbundantVessel, ["abundantvessel.png"], "Abundant Vessel", eDCLR.Violet, [eLSCP.Sea], ("Result: +1 Ship"));
develArray[eDEVEL.AbundantVessel].cost = [];
develArray[eDEVEL.AbundantVessel].cost[eCOST.Food] = 6;
develArray[eDEVEL.AbundantVessel].cost[eCOST.Material] = 2;
develArray[eDEVEL.AbundantVessel].requirement = [];
develArray[eDEVEL.AbundantVessel].result = [];
develArray[eDEVEL.AbundantVessel].result[eRES.Ship] = 1;
develArray[eDEVEL.SteadyVessel] = new Development(eDEVEL.SteadyVessel, ["steadyvessel.png"], "Steady Vessel", eDCLR.Violet, [eLSCP.Sea], ("Result: +1 Ship"));
develArray[eDEVEL.SteadyVessel].cost = [];
develArray[eDEVEL.SteadyVessel].cost[eCOST.Material] = 7;
develArray[eDEVEL.SteadyVessel].requirement = [];
develArray[eDEVEL.SteadyVessel].result = [];
develArray[eDEVEL.SteadyVessel].result[eRES.Ship] = 1;
/// <reference path="references.ts" />
// Set up pixi.js
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
// Load sprite atlases
loader
    .add("static/img/images-0.json")
    .add("static/img/images-1.json")
    .load(onImageLoad);
// Single reference sprite  to be filled later
var sprMed = null;
// Create global Pixi and Tink variables
var tb = null;
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
var currHovDescCard = null;
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
var SideBar = (function () {
    function SideBar() {
        this.buttonArray = [];
        // The current page state of the bar, in case of overflow
        this.cPage = 0;
        this.nPages = 1;
        // The origin for placement of non-navigational buttons
        this.oriB = [renderer.width - 180, 20];
        // The pixel height of bottom-anchored elements that a given bar possesses
        this.btmHeight = 0;
        // The number of standard buttons that can fit in a bar's page, in case of overflow
        this.slotsAvailable = null;
    }
    // Create the black background that exists for all sidebars
    SideBar.prototype.formBacking = function () {
        var designBG = new Graphics();
        designBG.beginFill(0x000000);
        designBG.drawRect(0, 0, 200, (renderer.height));
        designBG.endFill();
        designBG.x = renderer.width - 200;
        designBG.y = 0;
        stage.addChild(designBG);
    };
    SideBar.prototype.baseHoverBar = function () {
        for (var cButton = 0; cButton < this.buttonArray.length; cButton++) {
            if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {
                this.buttonArray[cButton].sprBg.alpha = 0.6;
            }
            else if (glbEditBarSel === cButton) {
                this.buttonArray[cButton].sprBg.alpha = 0.4;
            }
            else {
                this.buttonArray[cButton].sprBg.alpha = 0;
            }
        }
    };
    SideBar.prototype.checkBarExcess = function () {
        var barMax = this.buttonArray.length * (this.buttonArray[0].bHeight + 10);
        var overflowRatio = Math.ceil((renderer.height - this.btmHeight) / barMax);
        if (overflowRatio < 1) {
            return 0;
        }
        else {
            return overflowRatio;
        }
    };
    // The top and bottom page buttons will be the final members of the buttonArray
    SideBar.prototype.formPageButtons = function () {
        // Push the standard buttons down to allow room for top page button
        this.oriB[1] += 40;
        // Form top button
        this.buttonArray[this.buttonArray.length] = new ArcButton("page", 0, null);
        this.buttonArray[(this.buttonArray.length - 1)].bWidth = 140;
        this.buttonArray[(this.buttonArray.length - 1)].bHeight = 20;
        this.buttonArray[(this.buttonArray.length - 1)].enabled = false;
        this.buttonArray[(this.buttonArray.length - 1)].displayButton([(renderer.width - 200 + 30), 20]);
        // Form bottom button
        this.buttonArray[this.buttonArray.length] = new ArcButton("page", 1, null);
        this.buttonArray[(this.buttonArray.length - 1)].bWidth = 140;
        this.buttonArray[(this.buttonArray.length - 1)].bHeight = 20;
        this.buttonArray[(this.buttonArray.length - 1)].displayButton([(renderer.width - 200 + 30), (renderer.height - 50 - this.btmHeight)]);
    };
    SideBar.prototype.assignPageNumbers = function () {
        var buttonFullHeight = this.buttonArray[0].bHeight + 10;
        var barMax = this.buttonArray.length * (buttonFullHeight);
        var spaceAvailable = renderer.height - 40 - this.btmHeight;
        var displayRatio = (spaceAvailable / barMax);
        this.slotsAvailable = Math.floor(spaceAvailable / buttonFullHeight) - 1;
        for (var cButton = 0; cButton < (this.buttonArray.length - 2); cButton++) {
            this.buttonArray[cButton].nPage = Math.floor(((cButton + 1) / (this.buttonArray.length - 2)) / displayRatio);
            // Set the side bar's number of pages to the page of the final element
            if (cButton === this.buttonArray.length - 3) {
                this.nPages = this.buttonArray[cButton].nPage + 1;
            }
        }
    };
    SideBar.prototype.baseClickBar = function () {
        if (currDescCard != null) {
            currDescCard.selfDestruct();
        }
        if (this.nPages > 1) {
            // Up button
            if ((this.buttonArray[this.buttonArray.length - 2].
                withinButton([pointer.x, pointer.y])) &&
                (this.cPage > 0)) {
                this.cPage--;
                this.removeMain();
                this.formMain();
            }
            else if ((this.buttonArray[this.buttonArray.length - 1].
                withinButton([pointer.x, pointer.y])) &&
                (this.cPage < (this.nPages - 1))) {
                this.cPage++;
                this.removeMain();
                this.formMain();
            }
            // If pages can be navigated to, enable page up/down buttons and vice versa
            if (this.cPage > 0) {
                this.buttonArray[this.buttonArray.length - 2].enabled = true;
                this.buttonArray[this.buttonArray.length - 2].sprFirst.alpha = 1;
            }
            else {
                this.buttonArray[this.buttonArray.length - 2].enabled = false;
                this.buttonArray[this.buttonArray.length - 2].sprFirst.alpha = 0.5;
            }
            if (this.cPage < (this.nPages - 1)) {
                this.buttonArray[this.buttonArray.length - 1].enabled = true;
                this.buttonArray[this.buttonArray.length - 1].sprFirst.alpha = 1;
            }
            else {
                this.buttonArray[this.buttonArray.length - 1].enabled = false;
                this.buttonArray[this.buttonArray.length - 1].sprFirst.alpha = 0.5;
            }
        }
    };
    // Empty function allows the parent to call the child class's method
    SideBar.prototype.removeBar = function () { };
    SideBar.prototype.displayBar = function () { };
    SideBar.prototype.removeMain = function () { };
    SideBar.prototype.formMain = function () { };
    return SideBar;
}());
/// <reference path="references.ts" />
var EditBar = (function (_super) {
    __extends(EditBar, _super);
    function EditBar() {
        // Blank super call, as SideBar doesn't have a constructor
        _super.call(this);
        this.btmHeight = 80;
    }
    EditBar.prototype.formBar = function () {
        // Edit bar has the buttons for each landscape, each black development, and the
        //  "Randomize" and "Finish" buttons
        for (var cButton = 0; cButton < (glbNumLscps + glbNumBlkDevels + 2); cButton++) {
            if (cButton < glbNumLscps) {
                this.buttonArray[cButton] = new ArcButton("landscape", cButton, null);
            }
            else if (cButton < (glbNumLscps + glbNumBlkDevels)) {
                this.buttonArray[cButton] = new ArcButton("development", (cButton - glbNumLscps), null);
            }
            else if (cButton === (glbNumLscps + glbNumBlkDevels)) {
                this.buttonArray[cButton] = new ArcButton("other", null, "Randomize");
            }
            else if (cButton === (glbNumLscps + glbNumBlkDevels + 1)) {
                this.buttonArray[cButton] = new ArcButton("other", null, "Finish");
            }
            else {
                console.log("Error, unexpected menu button value.");
            }
        }
        this.displayBar();
    };
    EditBar.prototype.displayBar = function () {
        for (var cButton = 0; cButton < (glbNumLscps + glbNumBlkDevels + 2); cButton++) {
            if (cButton < glbNumLscps) {
                this.buttonArray[cButton].displayButton([this.oriB[0], (this.oriB[1] + (cButton * 40))]);
            }
            else if (cButton < (glbNumLscps + glbNumBlkDevels)) {
                this.buttonArray[cButton].displayButton([this.oriB[0], (this.oriB[1] + 20 + (cButton * 40))]);
            }
            else if (cButton === (glbNumLscps + glbNumBlkDevels)) {
                this.buttonArray[cButton].displayButton([this.oriB[0], (renderer.height - 90)]);
            }
            else if (cButton === (glbNumLscps + glbNumBlkDevels + 1)) {
                this.buttonArray[cButton].displayButton([this.oriB[0], (renderer.height - 50)]);
            }
            else {
                console.log("Error, unexpected menu button value.");
            }
        }
    };
    EditBar.prototype.removeBar = function () {
        for (var cButton = 0; cButton < (glbNumLscps + glbNumBlkDevels + 2); cButton++) {
            if (cButton < glbNumLscps) {
                stage.removeChild(this.buttonArray[cButton].sprBg);
                stage.removeChild(this.buttonArray[cButton].sprFirst);
                stage.removeChild(this.buttonArray[cButton].txtLabel);
            }
            else if ((cButton > (glbNumLscps - 1)) &&
                (cButton < (glbNumLscps + glbNumBlkDevels))) {
                stage.removeChild(this.buttonArray[cButton].sprBg);
                stage.removeChild(this.buttonArray[cButton].sprFirst);
                stage.removeChild(this.buttonArray[cButton].sprSecond);
                stage.removeChild(this.buttonArray[cButton].txtLabel);
            }
            else if (cButton < (glbNumLscps + glbNumBlkDevels + 2)) {
                stage.removeChild(this.buttonArray[cButton].sprBg);
                stage.removeChild(this.buttonArray[cButton].txtLabel);
            }
            else {
                console.log("Error, unexpected menu button value.");
                break;
            }
        }
        this.buttonArray = [];
    };
    EditBar.prototype.hoverOverBar = function () { this.baseHoverBar(); };
    EditBar.prototype.clickBar = function () {
        this.baseClickBar();
        var actionTaken = false;
        for (var cButton = 0; cButton < (glbNumLscps + glbNumBlkDevels + 2); cButton++) {
            if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {
                // Landscape / Development buttons
                if (cButton < (glbNumLscps + glbNumBlkDevels)) {
                    glbPainting = cButton;
                    glbEditBarSel = cButton;
                    actionTaken = true;
                }
                else if (cButton === (glbNumLscps + glbNumBlkDevels)) {
                    currLand.lSize = (Math.floor(Math.random() * 3));
                    currLand.lClimate = (Math.floor(Math.random() * 7));
                    currLand.generateLand();
                    currLand.devSelection.genDevSelection();
                    currLand.refreshLandSpr();
                    actionTaken = true;
                }
                else if (cButton === (glbNumLscps + glbNumBlkDevels + 1)) {
                    glbState = buildSetup;
                }
                else {
                    console.log("Unexpected edit bar value.");
                }
            }
        }
        if (!actionTaken) {
            glbPainting = null;
            glbEditBarSel = null;
        }
    };
    return EditBar;
}(SideBar));
/// <reference path="references.ts" />
var BuildBar = (function (_super) {
    __extends(BuildBar, _super);
    function BuildBar() {
        _super.apply(this, arguments);
        this.buttonArray = [];
    }
    BuildBar.prototype.formBar = function () {
        this.buttonArray[0] = new ArcButton("other", null, "Back");
        this.displayBar();
    };
    BuildBar.prototype.displayBar = function () {
        this.buttonArray[0].displayButton([this.oriB[0], (renderer.height - 50)]);
    };
    BuildBar.prototype.removeBar = function () {
        stage.removeChild(this.buttonArray[0].sprBg);
        stage.removeChild(this.buttonArray[0].txtLabel);
        this.buttonArray = [];
    };
    BuildBar.prototype.clickBar = function () {
        // Back button
        if (this.buttonArray[0].withinButton([pointer.x, pointer.y])) {
            veClearTint(glbPulseArray);
            glbTileSelArray = [];
            glbPulseArray = [];
            if (glbMonth === 0) {
                glbState = editSetup;
                glbPointerDown = false; // Fix for stuck pointer after hitting back button
            }
            else {
                glbState = buySetup;
            }
        }
    };
    BuildBar.prototype.hoverOverBar = function () {
        this.baseHoverBar();
    };
    return BuildBar;
}(SideBar));
/// <reference path="references.ts" />
var ActionBar = (function (_super) {
    __extends(ActionBar, _super);
    function ActionBar() {
        // Blank super call, as SideBar doesn't have a constructor
        _super.call(this);
        this.buttonArray = [];
        this.numActives = 0;
        this.btmHeight = 100;
        if (currPlayer.hand.length < 3) {
            this.numActives = 3;
        }
        else {
            this.numActives = currPlayer.hand.length;
        }
    }
    // Returns the x,y position of an active slot
    ActionBar.prototype.getActivePos = function (activeSpot) {
        var xPos = 0;
        var yPos = 0;
        if ((activeSpot % 3) === 0) {
            xPos = 100 - glbHWidth - (glbHWidth / 2);
            yPos = 110 - glbHHeight - (glbHWidth / 2) +
                ((((activeSpot) * 1.3) / 3) * glbHHeight);
        }
        else if (((activeSpot - 1) % 3) === 0) {
            xPos = 100 - (glbHWidth / 2);
            // Y positioning uses hex width in order to create an even margin on  both 
            //  top and sides
            yPos = (glbHWidth / 2) + ((((activeSpot - 1) * 1.3) / 3) * glbHHeight);
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
        // Move the active selection to the bottom of the window
        yPos = yPos + 450;
        return [xPos, yPos];
    };
    ActionBar.prototype.formBar = function () {
        // The action bar has buttons for each development in the player's hand, as well as
        //  "Build" and "Pass" buttons.  The bar also has a display of chosen actions (at 
        //  least three) at the bottom.
        for (var cButton = 0; cButton < (currPlayer.hand.length + 3 + this.numActives + 1); cButton++) {
            if (cButton < currPlayer.hand.length) {
                this.buttonArray[cButton] = new ActionButton("development", (currLand.tileArray[currPlayer.hand[cButton]].development), null);
                if (currPlayer.actions === 0) {
                    this.buttonArray[cButton].enabled = false;
                }
            }
            else if (cButton === (currPlayer.hand.length)) {
                this.buttonArray[cButton] = new ActionButton("otherAction", null, "Build");
                if (currPlayer.actions === 0) {
                    this.buttonArray[cButton].enabled = false;
                }
            }
            else if (cButton === (currPlayer.hand.length + 1)) {
                this.buttonArray[cButton] = new ActionButton("otherAction", null, "Pass");
                if (currPlayer.actions === 0) {
                    this.buttonArray[cButton].enabled = false;
                }
            }
            else if (cButton === (currPlayer.hand.length + 2)) {
                this.buttonArray[cButton] = new ActionButton("counter", null, "Actions");
            }
            else if (cButton < (currPlayer.hand.length + 3 + this.numActives)) {
                this.buttonArray[cButton] = new ActionButton("active", (cButton - (currPlayer.hand.length + 3)), null);
            }
            else if (cButton === (currPlayer.hand.length + 3 + this.numActives)) {
                this.buttonArray[cButton] = new ActionButton("other", null, "Finish");
                if (currPlayer.actions > 0) {
                    this.buttonArray[cButton].enabled = false;
                }
                else {
                    this.buttonArray[cButton].enabled = true;
                }
            }
            else {
                console.log("Error, unexpected menu button value.");
            }
        }
        this.displayBar();
    };
    ActionBar.prototype.displayBar = function () {
        for (var cButton = 0; cButton < (currPlayer.hand.length + 3 + this.numActives + 1); cButton++) {
            if (this.buttonArray[cButton].type === "active") {
                this.buttonArray[cButton].displayActiveSlot(this.getActivePos(cButton - (currPlayer.hand.length + 3)));
            }
            else if (this.buttonArray[cButton].type === "otherAction") {
                this.buttonArray[cButton].displayOtherAction([this.oriB[0], (this.oriB[1] + 20 + (cButton * 40))]);
            }
            else if (this.buttonArray[cButton].type === "counter") {
                this.buttonArray[cButton].displayCounter([this.oriB[0], (this.oriB[1] + 425)]);
            }
            else if (this.buttonArray[cButton].type === "other") {
                this.buttonArray[cButton].displayButton([this.oriB[0], (renderer.height - 50)]);
            }
            else {
                this.buttonArray[cButton].displayButton([this.oriB[0], (this.oriB[1] + 20 + (cButton * 40))]);
            }
        }
    };
    ActionBar.prototype.removeBar = function () {
        for (var cButton = 0; cButton < (currPlayer.hand.length + 3 + this.numActives + 1); cButton++) {
            if (cButton < currPlayer.hand.length + 2) {
                stage.removeChild(this.buttonArray[cButton].sprBg);
                stage.removeChild(this.buttonArray[cButton].sprFirst);
                stage.removeChild(this.buttonArray[cButton].sprSecond);
                stage.removeChild(this.buttonArray[cButton].txtLabel);
            }
            else if (cButton === (currPlayer.hand.length + 2)) {
                stage.removeChild(this.buttonArray[cButton].txtLabel);
            }
            else if (cButton < (currPlayer.hand.length + 3 + this.numActives)) {
                stage.removeChild(this.buttonArray[cButton].sprBg);
                stage.removeChild(this.buttonArray[cButton].sprSecond);
            }
            else if (cButton === (currPlayer.hand.length + 3 + this.numActives)) {
                stage.removeChild(this.buttonArray[cButton].sprBg);
                stage.removeChild(this.buttonArray[cButton].txtLabel);
            }
            else {
                console.log("Error, unexpected menu button value.");
                break;
            }
        }
        this.buttonArray = [];
    };
    ActionBar.prototype.hoverOverBar = function () {
        for (var cButton = 0; cButton < this.buttonArray.length; cButton++) {
            if (this.buttonArray[cButton].type === "active") {
                if (this.buttonArray[cButton].inActiveHex([pointer.x, pointer.y])) {
                    this.buttonArray[cButton].sprBg.tint = rgbToHclr([150, 150, 150]);
                }
                else {
                    this.buttonArray[cButton].sprBg.tint = rgbToHclr([255, 255, 255]);
                }
            }
            else if (this.buttonArray[cButton].type === "counter") {
                continue;
            }
            else {
                if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {
                    if (this.buttonArray[cButton].enabled) {
                        this.buttonArray[cButton].sprBg.alpha = 0.6;
                    }
                    else {
                        this.buttonArray[cButton].sprBg.alpha = 0.2;
                    }
                }
                else {
                    this.buttonArray[cButton].sprBg.alpha = 0;
                }
            }
        }
    };
    ActionBar.prototype.clickBar = function () {
        this.baseClickBar();
        for (var cButton = 0; cButton < (currPlayer.hand.length + 3 + this.numActives + 1); cButton++) {
            if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {
                // Development buttons
                if (cButton < currPlayer.hand.length) {
                    applyDevEffect(currPlayer.hand[cButton]);
                }
                else if (cButton === currPlayer.hand.length) {
                    glbState = buySetup;
                }
                else if (cButton === (currPlayer.hand.length + 1)) {
                    currPlayer.actions--;
                    var ahSpot = currPlayer.actionHistory.length;
                    currPlayer.actionHistory[ahSpot] = new ArcHistory("pass");
                    glbState = activeSetup;
                }
                else if (cButton === (currPlayer.hand.length + 3 + this.numActives)) {
                    glbState = cleanup;
                }
                else {
                    console.log("Unexpected edit bar value.");
                }
            }
        }
    };
    return ActionBar;
}(SideBar));
/// <reference path="references.ts" />
var ArcButton = (function () {
    function ArcButton(setType, setId, setOtherName) {
        // Set the height and width of the button to the defaults
        this.bWidth = glbBWidth;
        this.bHeight = glbBHeight;
        // Which navitagional page the button belongs to
        this.nPage = 0;
        // What the button represents, e.g. landscape, development, or other
        this.type = null;
        // This id links the button to another element, e.g. for a development-type button
        //  this would be the related development's id
        this.id = null;
        // If this is an other-type button the id will be null and this name will signify the
        //  button's name and function
        this.otherName = null;
        // An array of four numbers that defines the bounds of the button, from the upper left
        //  point and continuing clockwise
        this.bounds = [];
        // Whether or not the button is able to be clicked, has a graphical effect
        this.enabled = true;
        this.type = setType;
        this.id = setId;
        this.otherName = setOtherName;
    }
    ArcButton.prototype.formStandardBounds = function (setOrigin) {
        // Initialize the four empty points that describe the button's boundaries
        this.bounds[0] = [];
        this.bounds[1] = [];
        this.bounds[2] = [];
        this.bounds[3] = [];
        this.bounds[0] = [(setOrigin[0] - glbBPadding),
            (setOrigin[1] - glbBPadding)];
        this.bounds[1] = [(setOrigin[0] + this.bWidth + glbBPadding),
            (setOrigin[1] - glbBPadding)];
        this.bounds[2] = [(setOrigin[0] + this.bWidth + glbBPadding),
            (setOrigin[1] + this.bHeight + glbBPadding)];
        this.bounds[3] = [(setOrigin[0] - glbBPadding),
            (setOrigin[1] + this.bHeight + glbBPadding)];
    };
    ArcButton.prototype.displayButton = function (setOrigin) {
        this.formStandardBounds(setOrigin);
        // Initially invisible background for hovering/selecting effects
        this.sprBg = new Graphics();
        this.sprBg.beginFill(0xFFFFFF);
        this.sprBg.drawRect(0, 0, (this.bWidth + (glbBPadding * 2)), (this.bHeight + (glbBPadding * 2)));
        this.sprBg.endFill();
        this.sprBg.x = this.bounds[0][0];
        this.sprBg.y = this.bounds[0][1];
        this.sprBg.alpha = 0;
        stage.addChild(this.sprBg);
        if (this.type === "landscape") {
            this.displayLscpButton();
        }
        else if (this.type === "development") {
            this.displayDevButton();
        }
        else if (this.type === "page") {
            this.displayPageButton();
        }
        else if (this.type === "other") {
            this.displayTextLayer(this.otherName, [(this.bounds[0][0] + glbBPadding), (this.bounds[0][1] + 5 + glbBPadding)]);
        }
        // Greyed text and sprites for inactive buttons
        if (!this.enabled) {
            if (this.txtLabel != undefined) {
                this.txtLabel.alpha = 0.5;
            }
            if (this.sprFirst != undefined) {
                this.sprFirst.tint = rgbToHclr([150, 150, 150]);
            }
            if (this.sprSecond != undefined) {
                this.sprSecond.tint = rgbToHclr([150, 150, 150]);
            }
        }
    };
    ArcButton.prototype.displayLscpLayer = function (lscpId) {
        // Display the landscape tile in question
        this.sprFirst = new Sprite(sprMed[lscpArray[lscpId].sprID]);
        this.sprFirst.position.set((this.bounds[0][0] + glbBPadding), (this.bounds[0][1] + glbBPadding));
        this.sprFirst.scale.set(0.2, 0.2);
        stage.addChild(this.sprFirst);
    };
    ArcButton.prototype.displayTextLayer = function (setText, location) {
        this.txtLabel = new Text(setText, { font: "16px sans-serif", fill: "white" });
        this.txtLabel.position.set(location[0], location[1]);
        stage.addChild(this.txtLabel);
    };
    ArcButton.prototype.displayLscpButton = function () {
        this.displayLscpLayer(this.id);
        this.displayTextLayer(lscpArray[this.id].name, [(this.bounds[0][0] + 70 + glbBPadding), (this.bounds[0][1] + 5 + glbBPadding)]);
    };
    ArcButton.prototype.displayDevButton = function () {
        // Display a sprite of the landscape required by this development
        this.displayLscpLayer(develArray[this.id].lscpRequired[0]);
        this.displayTextLayer(develArray[this.id].name, [(this.bounds[0][0] + 70 + glbBPadding), (this.bounds[0][1] + 5 + glbBPadding)]);
        // Display the first development in the array above the landscape tile, 30 pixels
        //  higher to account for the extra height of development sprites
        this.sprSecond = new Sprite(sprMed[develArray[this.id].sprID[0]]);
        this.sprSecond.scale.set(0.2, 0.2);
        this.sprSecond.position.set((this.bounds[0][0] + glbBPadding), (this.bounds[0][1] + glbBPadding - 30));
        stage.addChild(this.sprSecond);
    };
    ArcButton.prototype.displayPageButton = function () {
        this.sprFirst = null;
        if (this.id === 0) {
            this.sprFirst = new Sprite(sprMed["uparrow.png"]);
        }
        else if (this.id === 1) {
            this.sprFirst = new Sprite(sprMed["downarrow.png"]);
        }
        this.sprFirst.position.set((this.bounds[0][0] + glbBPadding), (this.bounds[0][1] + glbBPadding));
        if (!this.enabled) {
            this.sprFirst.alpha = 0.5;
        }
        stage.addChild(this.sprFirst);
    };
    ArcButton.prototype.withinButton = function (givenPoint) {
        if (((this.nPage === glbSideBar.cPage) || (this.type === "page") ||
            (this.type === "other")) &&
            (givenPoint[0] > this.bounds[0][0]) && (givenPoint[0] < this.bounds[2][0]) &&
            (givenPoint[1] > this.bounds[0][1]) && (givenPoint[1] < this.bounds[2][1])) {
            return true;
        }
        else {
            return false;
        }
    };
    return ArcButton;
}());
/// <reference path="references.ts" />
var ActionButton = (function (_super) {
    __extends(ActionButton, _super);
    function ActionButton() {
        _super.apply(this, arguments);
    }
    ActionButton.prototype.formHexBounds = function (setOrigin) {
        this.bounds[0] = [];
        this.bounds[1] = [];
        this.bounds[2] = [];
        this.bounds[3] = [];
        this.bounds[0] = [setOrigin[0], setOrigin[1]];
        this.bounds[1] = [(setOrigin[0] + glbHWidth), setOrigin[1]];
        this.bounds[2] = [(setOrigin[0] + glbHWidth), (setOrigin[1] + glbHHeight)];
        this.bounds[3] = [setOrigin[0], (setOrigin[1] + glbHHeight)];
    };
    ActionButton.prototype.displayOtherAction = function (setOrigin) {
        // Display initially transparent background
        this.displayButton(setOrigin);
        // Display the black outline
        this.sprFirst = new Sprite(sprMed["hex.png"]);
        this.sprFirst.position.set((this.bounds[0][0] + glbBPadding), (this.bounds[0][1] + glbBPadding));
        this.sprFirst.scale.set(0.2, 0.2);
        stage.addChild(this.sprFirst);
        // Display the icon
        var sprOAName = "";
        if (this.otherName === "Build") {
            sprOAName = "build.png";
        }
        else if (this.otherName === "Pass") {
            sprOAName = "pass.png";
        }
        this.sprSecond = new Sprite(sprMed[sprOAName]);
        this.sprSecond.scale.set(0.2, 0.2);
        this.sprSecond.position.set((this.bounds[0][0] + glbBPadding), (this.bounds[0][1] + glbBPadding - 30));
        stage.addChild(this.sprSecond);
        // Display the related text
        this.displayTextLayer(this.otherName, [(this.bounds[0][0] + 73), (this.bounds[0][1]) + 7]);
        if (!this.enabled) {
            this.sprSecond.tint = rgbToHclr([150, 150, 150]);
            this.txtLabel.alpha = 0.5;
        }
    };
    ActionButton.prototype.displayCounter = function (setOrigin) {
        this.formStandardBounds(setOrigin);
        var setText = ("Actions: " + currPlayer.actions + "/" +
            (currPlayer.actions + currPlayer.actionHistory.length));
        this.txtLabel = new Text(setText, { font: "18px sans-serif", fill: "white" });
        this.txtLabel.position.set(this.bounds[0][0], this.bounds[0][1]);
        stage.addChild(this.txtLabel);
    };
    ActionButton.prototype.displayActiveSlot = function (setOrigin) {
        this.formHexBounds(setOrigin);
        // Display the white background
        this.sprBg = new Sprite(sprMed["whitehex.png"]);
        this.sprBg.scale.set(0.2, 0.2);
        // Subtract hex height from sprite to correct for tallness
        this.sprBg.position.set(this.bounds[0][0], (this.bounds[0][1] - glbHHeight));
        stage.addChild(this.sprBg);
        if (currPlayer.actionHistory[this.id] != undefined) {
            if (currPlayer.actionHistory[this.id].type === "development") {
                var tileId = currPlayer.actionHistory[this.id].id;
                var tSprName = develArray[currLand.tileArray[tileId].development].sprID[0];
                this.sprSecond = new Sprite(sprMed[tSprName]);
            }
            else if ((currPlayer.actionHistory[this.id].type === "build")) {
                this.sprSecond = new Sprite(sprMed["build.png"]);
            }
            else if ((currPlayer.actionHistory[this.id].type === "pass")) {
                this.sprSecond = new Sprite(sprMed["pass.png"]);
            }
            this.sprSecond.scale.set(0.2, 0.2);
            this.sprSecond.position.set(this.bounds[0][0], (this.bounds[0][1] - 30));
            stage.addChild(this.sprSecond);
        }
    };
    ActionButton.prototype.inActiveHex = function (corPoint) {
        // 1. Is the point within the possible range of any active hex?
        // 2. Is the point in this hex's bounding box?
        // 3. Which quadrant?  If not in upper right, translate point to upper right
        // 4. Is it outside the rectangular portion?
        // 5. Is it in the triangular point segment?
        // A "no" to any step (other than 3) ends the function and returns false
        var activePos = this.bounds[0];
        // Is the cursor point within the hex's bounding box?
        if ((corPoint[0] > activePos[0]) && (corPoint[0] < (activePos[0] + glbHWidth)) &&
            (corPoint[1] > activePos[1]) && (corPoint[1] < (activePos[1] + glbHHeight))) {
            return this.inActiveRect(activePos, corPoint);
        }
        else {
            return false;
        }
    };
    ActionButton.prototype.inActiveRect = function (activePos, corPoint) {
        // Which quadrant?  If not in upper right, translate point to upper right
        var diffX = Math.abs((activePos[0] + (glbHWidth / 2)) - corPoint[0]);
        var diffY = Math.abs((activePos[1] + (glbHHeight / 2)) - corPoint[1]);
        // Is the point within the rectangular segment?
        if (diffX < ((glbHWidth / 2) - (glbHHeight / 2))) {
            return true;
        }
        else {
            return this.inActiveTri(diffX, diffY);
        }
    };
    ActionButton.prototype.inActiveTri = function (diffX, diffY) {
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
    return ActionButton;
}(ArcButton));
/// <reference path="references.ts" />
function editHold(corPoint) {
    var clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];
    var clkAxial = pointToHex(clkPoint);
    var clkTile = currLand.tileArray[currLand.getID(clkAxial)];
    if ((clkAxial != undefined) && ((clkPoint[0] + glbOrigin[0]) < (renderer.width - 200))) {
        if (clkTile != undefined) {
            if (glbPainting != null) {
                if (glbPainting < glbNumLscps) {
                    clkTile.landscape = glbPainting;
                    clkTile.development = null;
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
                currDescCard = new DescCard(corPoint, develArray[clkTile.development]);
            }
            else if (currDescCard != null) {
                currDescCard.selfDestruct();
            }
        }
    }
}
function buildClick(corPoint) {
    if (currDescCard != null) {
        currDescCard.selfDestruct();
    }
    var clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];
    var clkAxial = pointToHex(clkPoint);
    var clkTileID = currLand.getID(clkAxial);
    var clkTile = currLand.tileArray[clkTileID];
    if ((clkAxial != undefined) && ((clkPoint[0] + glbOrigin[0]) < (renderer.width - 200))) {
        if (clkTile != undefined) {
            if (inArr(glbTileSelArray, clkTileID)) {
                // Build the selected development and it to player's territory
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
                    glbState = monthSetup;
                }
                else {
                    var ahSpot = currPlayer.actionHistory.length;
                    subtractPrice();
                    updatePlayerBar();
                    currPlayer.actionHistory[ahSpot] = new ArcHistory("build");
                    currPlayer.actionHistory[ahSpot].recordBuildTileId(clkTileID);
                    currPlayer.actions--;
                    veClearTint(glbPulseArray);
                    glbTileSelArray = [];
                    glbPulseArray = [];
                    glbState = activeSetup;
                }
            }
            else {
                currDescCard = new DescCard(corPoint, develArray[clkTile.development]);
            }
        }
    }
}
function subtractPrice() {
    var tDev = develArray[glbBuildSel];
    var rArray = [eCOST.Food, eCOST.Material, eCOST.Treasure];
    for (var iii = 0; iii < rArray.length; iii++) {
        var tResource = rArray[iii];
        if ((tResource === eCOST.Food) ||
            (tResource === eCOST.Material) ||
            (tResource === eCOST.Treasure)) {
            if (tDev.cost[tResource] != undefined) {
                currPlayer.giveResource(tResource, (-1 * tDev.cost[tResource]));
            }
        }
    }
}
function activeClick(corPoint) {
    if (currDescCard != null) {
        currDescCard.selfDestruct();
    }
    var clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];
    var clkAxial = pointToHex(clkPoint);
    var clkTile = currLand.tileArray[currLand.getID(clkAxial)];
    if ((clkAxial != undefined) && ((clkPoint[0] + glbOrigin[0]) < (renderer.width - 200))) {
        if (clkTile != undefined) {
            if (clkTile.development != null) {
                if (currDescCard != null) {
                    currDescCard.selfDestruct();
                }
                currDescCard = new DescCard(corPoint, develArray[clkTile.development]);
            }
        }
    }
}
function hoverTile(corPoint) {
    if (currHovDescCard != null) {
        currHovDescCard.selfDestruct();
    }
    var clkPoint = [(corPoint[0] - glbOrigin[0]), (corPoint[1] - glbOrigin[1])];
    var hovAxial = pointToHex(clkPoint);
    if (hovAxial != undefined) {
        var hovArraySpot = currLand.getID([hovAxial[0], hovAxial[1]]);
        if (currLand.spriteArray[hovArraySpot] != undefined) {
            if (glbLastHex != null) {
                var lastArraySpot = currLand.getID([glbLastHex[0], glbLastHex[1]]);
                if (currLand.spriteArray[lastArraySpot] != undefined) {
                    currLand.spriteArray[lastArraySpot].tint = rgbToHclr([255, 255, 255]);
                }
            }
            currLand.spriteArray[hovArraySpot].tint = rgbToHclr([160, 160, 160]);
            glbLastHex = hovAxial;
        }
        else {
            if (glbLastHex != null) {
                var lastArraySpot = currLand.getID([glbLastHex[0], glbLastHex[1]]);
                currLand.spriteArray[lastArraySpot].tint = rgbToHclr([255, 255, 255]);
            }
        }
    }
}
/// <reference path="references.ts" />
var DescCard = (function () {
    function DescCard(givenPoint, givenDevel) {
        this.clkPoint = [];
        this.devel = null;
        this.tArray = [];
        this.clkPoint = givenPoint;
        this.devel = givenDevel;
        var dPosition = [];
        var tDevel = this.devel;
        // Make display card on left
        if (this.clkPoint[0] > glbOrigin[0]) {
            dPosition[0] = 20;
        }
        else if (this.clkPoint[0] <= glbOrigin[0]) {
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
        this.tArray[this.tArray.length - 1].position.set((dPosition[0] + 93), (dPosition[1] + 107));
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
        var pieces = tDevel.description.split("; ");
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
                for (var iii = (tPiece + 1); iii < pieces.length; iii++) {
                    afterT[iii] = pieces[iii];
                }
                // Break the >30 character piece along a space
                var tooLong = pieces[tPiece];
                var metaPieces = [];
                // Use pseudo-while loop to break an indeterminate number of times
                for (var iii = 0; iii < 80; iii++) {
                    if (tooLong.length > 34) {
                        for (var jjj = 34; jjj > 0; jjj--) {
                            if (tooLong[jjj] === " ") {
                                metaPieces.push(tooLong.slice(0, jjj));
                                tooLong = tooLong.slice(jjj);
                                break;
                            }
                        }
                    }
                    else {
                        metaPieces.push(tooLong.slice(0, tooLong.length));
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
        currHovDescCard = null;
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
/// <reference path="references.ts" />
function applyDevEffect(tileID, undoing) {
    if (undoing === void 0) { undoing = false; }
    beforeEffect();
    var tDev = develArray[currLand.tileArray[tileID].development];
    var resultArray = considerPlayerEffects(tDev);
    if (requirementCheck(tileID, undoing)) {
        for (var cResult = 0; cResult < glbNumRes; cResult++) {
            if (tDev.result[cResult] != undefined) {
                applySingleEffect(resultArray, cResult, undoing);
            }
        }
        applyRequirement(tileID, undoing);
        afterEffect(tileID, undoing);
    }
    else {
        glbState = activeSetup;
    }
}
function beforeEffect() {
    glbSideBar.removeBar();
}
function considerPlayerEffects(tDev) {
    var resultArray = tDev.result;
    if (currPlayer.activeEffects.length === 0) {
        return resultArray;
    }
    // Apply active player effects to the result of the selected development
    for (var cEffect = 0; cEffect < glbNumRes; cEffect++) {
        var effectValue = currPlayer.activeEffects[cEffect];
        if (effectValue != undefined) {
            if ((cEffect === eRES.BlueTreasure) && (tDev.color === eDCLR.Blue)) {
                resultArray[eRES.Treasure] += effectValue;
            }
            else if ((cEffect === eRES.RedActive) && (tDev.color === eDCLR.Red)) {
                resultArray[eRES.Active] += effectValue;
            }
        }
    }
    return resultArray;
}
function requirementCheck(tileId, undoing) {
    var tDev = develArray[currLand.tileArray[tileId].development];
    if (tDev.requirement === []) {
        return true;
    }
    if (undoing) {
        return true;
    }
    else {
        var reqArray = [eREQ.Active, eREQ.Destroy, eREQ.Food, eREQ.Material, eREQ.Material,
            eREQ.Ship, eREQ.Treasure];
        for (var cReqSpot = 0; cReqSpot < tDev.requirement.length; cReqSpot++) {
            var cReq = reqArray[cReqSpot];
            if ((cReq === eREQ.Active) && (tDev.requirement[cReq] != undefined)) {
                if (currPlayer.actions < tDev.requirement[cReq]) {
                    return false;
                }
            }
            else if ((cReq === eREQ.Destroy) && (tDev.requirement[cReq] != undefined)) {
                if (currPlayer.ownedDevs === []) {
                    return false;
                }
            }
            else if ((cReq === eREQ.Food) && (tDev.requirement[cReq] != undefined)) {
                if (currPlayer.food < tDev.requirement[cReq]) {
                    return false;
                }
            }
            else if ((cReq === eREQ.Material) && (tDev.requirement[cReq] != undefined)) {
                if (currPlayer.material < tDev.requirement[cReq]) {
                    return false;
                }
            }
            else if ((cReq === eREQ.Ship) && (tDev.requirement[cReq] != undefined)) {
                if (currPlayer.ships < tDev.requirement[cReq]) {
                    return false;
                }
            }
            else if ((cReq === eREQ.Treasure) && (tDev.requirement[cReq] != undefined)) {
                if (currPlayer.treasure < tDev.requirement[cReq]) {
                    return false;
                }
            }
            else {
                console.log("Error: unexpected dev requirement value.");
            }
        }
        return true;
    }
}
function applySingleEffect(resultArray, cResult, undoing) {
    var undModify = 1;
    if (undoing) {
        undModify = -1;
    }
    if (cResult === eRES.Active) {
        for (var iii = 0; iii < resultArray[eRES.Active]; iii++) {
            currPlayer.actions += (1 * undModify);
            currPlayer.drawContainer();
        }
    }
    else if (cResult === eRES.BlueTreasure) {
        currPlayer.activeEffects[eRES.BlueTreasure] +=
            (resultArray[eRES.BlueTreasure] * undModify);
    }
    else if (cResult === eRES.Destroy) {
        currPlayer.activeEffects[eRES.Destroy] = resultArray[eRES.Destroy];
        // Changes game state in order to select a development for destruction
        glbState = selDevel;
    }
    else if (cResult === eRES.Food) {
        currPlayer.food += (resultArray[eRES.Food] * undModify);
    }
    else if (cResult === eRES.Material) {
        currPlayer.material += (resultArray[eRES.Material] * undModify);
    }
    else if (cResult === eRES.RedActive) {
        currPlayer.activeEffects[eRES.RedActive] +=
            (resultArray[eRES.RedActive] * undModify);
    }
    else if (cResult === eRES.Ship) {
        currPlayer.ships += (resultArray[eRES.Ship] * undModify);
    }
    else if (cResult === eRES.Treasure) {
        currPlayer.treasure += (resultArray[eRES.Treasure] * undModify);
    }
}
function applyRequirement(tileId, undoing) {
    var tDev = develArray[currLand.tileArray[tileId].development];
    var undModify = 1;
    if (undoing) {
        undModify = -1;
    }
    if (tDev.requirement === []) {
        return;
    }
    else {
        var reqArray = [eREQ.Active, eREQ.Destroy, eREQ.Food, eREQ.Material,
            eREQ.Ship, eREQ.Treasure];
        for (var cReqSpot = 0; cReqSpot < reqArray.length; cReqSpot++) {
            var cReq = reqArray[cReqSpot];
            if ((cReq === eREQ.Active) && (tDev.requirement[cReq] != undefined)) {
                currPlayer.actions -= (tDev.requirement[cReq] * undModify);
            }
            else if ((cReq === eREQ.Destroy) && (tDev.requirement[cReq] != undefined)) {
            }
            else if ((cReq === eREQ.Food) && (tDev.requirement[cReq] != undefined)) {
                currPlayer.food -= (tDev.requirement[cReq] * undModify);
            }
            else if ((cReq === eREQ.Material) && (tDev.requirement[cReq] != undefined)) {
                currPlayer.material -= (tDev.requirement[cReq] * undModify);
            }
            else if ((cReq === eREQ.Ship) && (tDev.requirement[cReq] != undefined)) {
                currPlayer.ships -= (tDev.requirement[cReq] * undModify);
            }
            else if ((cReq === eREQ.Treasure) && (tDev.requirement[cReq] != undefined)) {
                currPlayer.treasure -= (tDev.requirement[cReq] * undModify);
            }
            else {
                console.log("Error: unexpected dev requirement value.");
            }
        }
    }
}
function afterEffect(tileID, undoing) {
    var undModify = 1;
    if (undoing) {
        undModify = -1;
    }
    // Account for spent card
    currPlayer.actions += (-1 * undModify);
    if (!undoing) {
        var ahSpot = currPlayer.actionHistory.length;
        currPlayer.actionHistory[ahSpot] = new ArcHistory("development");
        currPlayer.actionHistory[ahSpot].recordDevAction(tileID);
    }
    else {
        // Remove the undone card from the array
        var ahSpot = currPlayer.actionHistory.length - 1;
        currPlayer.actionHistory = currPlayer.actionHistory.slice(0, ahSpot);
    }
    // Update display
    updatePlayerBar();
    currPlayer.removeCard(tileID);
    glbSideBar.formBar();
}
/// <reference path="references.ts" />
var BuyBar = (function (_super) {
    __extends(BuyBar, _super);
    function BuyBar() {
        // Blank super call, as SideBar doesn't have a constructor
        _super.call(this);
        this.buttonArray = [];
        this.btmHeight = 40;
    }
    BuyBar.prototype.formBar = function () {
        // Organize the bar according to what can be bought
        // organizeByCost returns two arrays, one of buyable developments, and a second 
        //  array containing the remainer
        var joinedDArray = currLand.devSelection.organizeByCost();
        var buyableDSet = joinedDArray[0];
        var rejectDSet = joinedDArray[1];
        // Buy bar has the buttons for each development option and the "Back" button
        for (var cButton = 0; cButton < buyableDSet.length; cButton++) {
            if (cButton < buyableDSet.length) {
                this.buttonArray[cButton] = new BuyButton("choice", buyableDSet[cButton].id, null);
            }
            else {
                console.log("Error, unexpected menu button value.");
            }
        }
        for (var cButton = buyableDSet.length; cButton < (buyableDSet.length + rejectDSet.length + 1); cButton++) {
            if (cButton < (buyableDSet.length + rejectDSet.length)) {
                this.buttonArray[cButton] = new BuyButton("choice", rejectDSet[(cButton - buyableDSet.length)].id, null);
                this.buttonArray[cButton].enabled = false;
            }
            else if (cButton === (buyableDSet.length + rejectDSet.length)) {
                this.buttonArray[cButton] = new BuyButton("other", null, "Back");
            }
            else {
                console.log("Error, unexpected menu button value.");
            }
        }
        if (this.checkBarExcess() > 0) {
            this.formPageButtons();
            this.assignPageNumbers();
        }
        this.displayBar();
    };
    BuyBar.prototype.displayBar = function () {
        this.formMain();
        this.buttonArray[currLand.devSelection.dSet.length].displayButton([
            this.oriB[0], (renderer.height - 50)]);
    };
    BuyBar.prototype.formMain = function () {
        for (var cButton = 0; cButton < (currLand.devSelection.dSet.length); cButton++) {
            if (this.buttonArray[cButton].nPage === this.cPage) {
                var displaySpot = cButton - (this.cPage * (this.slotsAvailable));
                this.buttonArray[cButton].displayChoice([this.oriB[0], (this.oriB[1] + (displaySpot * 55))]);
            }
        }
    };
    BuyBar.prototype.removeBar = function () {
        this.removeMain();
        for (var cButton = currLand.devSelection.dSet.length; cButton < (currLand.devSelection.dSet.length + 3); cButton++) {
            if (cButton === currLand.devSelection.dSet.length) {
                stage.removeChild(this.buttonArray[cButton].sprBg);
                stage.removeChild(this.buttonArray[cButton].txtLabel);
            }
            else if (cButton < currLand.devSelection.dSet.length + 3) {
                stage.removeChild(this.buttonArray[cButton].sprBg);
                stage.removeChild(this.buttonArray[cButton].sprFirst);
            }
            else {
                console.log("Error, unexpected menu button value.");
                break;
            }
        }
        this.buttonArray = [];
    };
    BuyBar.prototype.removeMain = function () {
        for (var cButton = 0; cButton < (currLand.devSelection.dSet.length); cButton++) {
            if (cButton < currLand.devSelection.dSet.length) {
                stage.removeChild(this.buttonArray[cButton].sprBg);
                stage.removeChild(this.buttonArray[cButton].sprFirst);
                stage.removeChild(this.buttonArray[cButton].sprSecond);
                stage.removeChild(this.buttonArray[cButton].txtLabel);
                stage.removeChild(this.buttonArray[cButton].txtCost[0]);
                stage.removeChild(this.buttonArray[cButton].txtCost[1]);
                stage.removeChild(this.buttonArray[cButton].txtCost[2]);
            }
            else {
                console.log("Error, unexpected menu button value.");
                break;
            }
        }
    };
    BuyBar.prototype.clickBar = function () {
        this.baseClickBar();
        for (var cButton = 0; cButton < (currLand.devSelection.dSet.length + 1); cButton++) {
            if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {
                // Landscape / Development buttons
                if (cButton < currLand.devSelection.dSet.length) {
                    glbBuildSel = this.buttonArray[cButton].id;
                    glbState = buildSetup;
                }
                else if (cButton === currLand.devSelection.dSet.length) {
                    glbState = active;
                    glbSideBar.removeBar();
                    glbSideBar = new ActionBar();
                    glbSideBar.formBar();
                }
                else {
                    console.log("Unexpected buy bar value.");
                }
            }
        }
    };
    BuyBar.prototype.hoverOverBar = function () {
        var inAnyButton = false;
        for (var cButton = 0; cButton < this.buttonArray.length; cButton++) {
            if ((this.buttonArray[cButton].nPage === this.cPage) ||
                (this.buttonArray[cButton].type === "other") ||
                (this.buttonArray[cButton].type === "page")) {
                if (this.buttonArray[cButton].withinButton([pointer.x, pointer.y])) {
                    inAnyButton = true;
                    if (this.buttonArray[cButton].enabled) {
                        this.buttonArray[cButton].sprBg.alpha = 0.6;
                    }
                    if ((this.buttonArray[cButton].type === "choice") &&
                        (currHovDescCard === null)) {
                        currHovDescCard = new DescCard([pointer.x, pointer.y], develArray[this.buttonArray[cButton].id]);
                    }
                    else if ((this.buttonArray[cButton].type === "choice") &&
                        (currHovDescCard != null)) {
                        if (currHovDescCard.devel.id === this.buttonArray[cButton].id) {
                            continue;
                        }
                        else {
                            currHovDescCard.selfDestruct();
                        }
                    }
                }
                else {
                    this.buttonArray[cButton].sprBg.alpha = 0;
                }
            }
        }
        if (!inAnyButton) {
            if (currHovDescCard != null) {
                currHovDescCard.selfDestruct();
            }
        }
    };
    return BuyBar;
}(SideBar));
/// <reference path="references.ts" />
var BuyButton = (function (_super) {
    __extends(BuyButton, _super);
    function BuyButton(setType, setId, setOtherName) {
        _super.call(this, setType, setId, setOtherName);
        this.txtCost = [];
        if (this.type === "choice") {
            this.bHeight = glbBHeight * 1.5;
        }
    }
    BuyButton.prototype.displayChoice = function (setOrigin) {
        this.displayButton(setOrigin);
        var tDev = develArray[this.id];
        // Display a sprite of the landscape required by this development
        this.sprFirst = new Sprite(sprMed[lscpArray[develArray[this.id].lscpRequired[0]].sprID]);
        this.sprFirst.scale.set(0.2, 0.2);
        this.sprFirst.position.set((this.bounds[0][0] + glbBPadding), (this.bounds[0][1] + glbBPadding + 8));
        stage.addChild(this.sprFirst);
        this.displayTextLayer(develArray[this.id].name, [(this.bounds[0][0] + 70 + glbBPadding), (this.bounds[0][1] + glbBPadding)]);
        // Display text that indicates the price of the development
        var tResource = [eCOST.Food, eCOST.Material, eCOST.Treasure];
        var labelLetter = ["F", "M", "T"];
        for (var iii = 0; iii < 3; iii++) {
            var setText = null;
            if (tDev.cost[tResource[iii]] === undefined) {
                setText = labelLetter[iii] + "-0";
            }
            else {
                setText = labelLetter[iii] + "-" + tDev.cost[tResource[iii]];
            }
            var setFill = null;
            if (tDev.checkCost(tResource[iii])) {
                setFill = "white";
            }
            else {
                setFill = "red";
            }
            this.txtCost[iii] = new Text(setText, { font: "13px sans-serif", fill: setFill });
            this.txtCost[iii].position.set((this.bounds[0][0] + glbBPadding + 70 + (iii * 30)), (this.bounds[0][1] + glbBPadding + 25));
            stage.addChild(this.txtCost[iii]);
        }
        // Display the first development in the array above the landscape tile, 30 pixels
        //  higher to account for the extra height of development sprites
        this.sprSecond = new Sprite(sprMed[develArray[this.id].sprID[0]]);
        this.sprSecond.scale.set(0.2, 0.2);
        this.sprSecond.position.set((this.bounds[0][0] + glbBPadding), (this.bounds[0][1] + glbBPadding - 22));
        stage.addChild(this.sprSecond);
        // Shrink the development's name so that it fits into the button
        var shrinkValue = 0;
        if (tDev.name.length > 10) {
            shrinkValue = Math.round((tDev.name.length - 9) / 2);
            this.txtLabel.style.font = (15 - shrinkValue) + "px sans-serif";
            this.txtLabel.position.set = ((this.bounds[0][0] + 70 + glbBPadding),
                (this.bounds[0][1] + glbBPadding + shrinkValue));
        }
        else {
            this.txtLabel.style.font = "15px sans-serif";
        }
        // Grey out disabled buttons
        if (!this.enabled) {
            this.sprFirst.tint = rgbToHclr([150, 150, 150]);
            this.sprSecond.tint = rgbToHclr([150, 150, 150]);
            this.txtLabel.alpha = 0.5;
            for (var iii = 0; iii < 3; iii++) {
                if (tDev.checkCost(tResource[iii])) {
                    this.txtCost[iii].alpha = 0.5;
                }
            }
        }
    };
    return BuyButton;
}(ArcButton));
/// <reference path="references.ts" />
var ArcHistory = (function () {
    function ArcHistory(setType) {
        // The type of action this represents, e.g. resource change or development built
        this.type = null;
        // If developments were built, this contains the location(s)
        this.buildTileId = [];
        // If development(s) were destroyed, this contains the location(s)
        this.destroyedTileId = [];
        // If development(s) was destroyed, this contains the development(s)'s id(s)
        this.destroyedDev = [];
        this.type = setType;
    }
    ArcHistory.prototype.recordDevAction = function (setTileId) {
        this.id = setTileId;
    };
    ArcHistory.prototype.recordBuildTileId = function (setBuildTileId) {
        this.buildTileId.push(setBuildTileId);
    };
    ArcHistory.prototype.recordDestruction = function (setDestroyedTileId, setDestroyedDev) {
        this.destroyedTileId.push(setDestroyedTileId);
        this.destroyedDev.push(setDestroyedDev);
    };
    ArcHistory.prototype.undoAction = function () {
        if (this.type === "development") {
            applyDevEffect(this.id, true);
        }
        else if (this.type === "build") {
        }
        else if (this.type === "pass") {
        }
    };
    ArcHistory.prototype.undoBuildCost = function () {
    };
    return ArcHistory;
}());
/// <reference path="global.ts" />
/// <reference path="tile.ts" />
/// <reference path="player.ts" />
/// <reference path="land.ts" />
/// <reference path="dev-set.ts" />
/// <reference path="climate.ts" />
/// <reference path="landscape.ts" />
/// <reference path="development.ts" />
/// <reference path="setup.ts" />
/// <reference path="side-bar.ts" />
/// <reference path="edit-bar.ts" />
/// <reference path="build-bar.ts" />
/// <reference path="action-bar.ts" />
/// <reference path="arc-button.ts" />
/// <reference path="action-button.ts" />
/// <reference path="action.ts" />
/// <reference path="description.ts" />
/// <reference path="effect.ts" />
/// <reference path="action-effect.ts" />
/// <reference path="buy-bar.ts" />
/// <reference path="buy-button.ts" />
/// <reference path="arc-history.ts" />
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
    currLand.devSelection = new DevSet();
    currLand.devSelection.genDevSelection();
    formPlayerBar();
    glbSideBar = new SideBar();
    glbSideBar.formBacking();
    glbState = editSetup;
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
function editSetup() {
    if (glbSideBar.buttonArray.length != 0) {
        glbSideBar.removeBar();
    }
    glbSideBar = new EditBar();
    glbSideBar.formBar();
    glbState = edit;
}
// Executes on loop when game is in 'edit' state
function edit() {
    // Click event handling
    pointer.press = function () { editStateClick(); };
    pointer.tap = function () { editTap(); };
    pointer.release = function () { glbPointerDown = false; };
    // Click and drag event handling
    if (glbPointerDown === true) {
        if ((pointer.x) < (renderer.width - 200)) {
            editHold([pointer.x, pointer.y]);
        }
    }
    // Hover event handling
    if (pointer.x < (renderer.width - 200)) {
        hoverTile([pointer.x, pointer.y]);
    }
    else {
        glbSideBar.hoverOverBar();
    }
}
function editTap() {
    // Check that this tap doesn't occur in the sidebar, so the click isn't applied twice
    if ((pointer.x) < (renderer.width - 200)) {
        editStateClick();
    }
    glbPointerDown = false;
}
function editStateClick() {
    if ((pointer.x) > (renderer.width - 200)) {
        glbSideBar.clickBar();
    }
    else {
        editClick([pointer.x, pointer.y]);
        editHold([pointer.x, pointer.y]);
    }
    glbPointerDown = true;
}
// Applies prior to every game round
function monthSetup() {
    glbMonth++;
    updatePlayerBar();
    // Months should begin with Player 2, and plrMonSetup switches the current player
    //  Therefore, set the current player to Player 1 here
    currPlayer = cPlayerArray[0];
    glbState = plrMonSetup;
}
// Applies prior to each player's round
function plrMonSetup() {
    if (glbSideBar.buttonArray.length != 0) {
        glbSideBar.removeBar();
    }
    if (currPlayer.playerID === 1) {
        currPlayer = cPlayerArray[0];
    }
    else {
        currPlayer = cPlayerArray[1];
    }
    // Draw the hand of three developments
    for (var tCard = 0; tCard < 3; tCard++) {
        currPlayer.drawContainer();
    }
    currPlayer.actions = 3;
    currPlayer.actionHistory = [];
    glbState = activeSetup;
}
function activeSetup() {
    if (glbSideBar.buttonArray.length != 0) {
        glbSideBar.removeBar();
    }
    glbSideBar = new ActionBar();
    glbSideBar.formBar();
    glbState = active;
}
var dirtyClick = false; // To avoid multiple press events for the same click
// Player chooses which of their active developments to use
function active() {
    // Click event handling
    pointer.press = function () {
        if (!dirtyClick) {
            if ((pointer.x) < (renderer.width - 200)) {
                activeClick([pointer.x, pointer.y]);
            }
            else {
                glbSideBar.clickBar([pointer.x, pointer.y]);
            }
        }
        dirtyClick = true;
    };
    pointer.release = function () {
        dirtyClick = false;
    };
    // Hover event handling
    if (pointer.x < (renderer.width - 200)) {
        hoverTile([pointer.x, pointer.y]);
    }
    else {
        glbSideBar.hoverOverBar();
    }
}
// Choosing a development as a target for another development's effect
function selDevel() {
}
// Prepare the logic/visuals for development purchasing
function buySetup() {
    if (glbSideBar.buttonArray.length != 0) {
        glbSideBar.removeBar();
    }
    glbSideBar = new BuyBar();
    glbSideBar.formBar();
    glbState = buy;
}
// Player chooses new developments to purchase
function buy() {
    // Click event handling
    pointer.press = function () {
        if ((pointer.x) < (renderer.width - 200)) {
            activeClick([pointer.x, pointer.y]);
        }
        else {
            glbSideBar.clickBar([pointer.x, pointer.y]);
        }
    };
    // Hover event handling
    if (pointer.x < (renderer.width - 200)) {
        hoverTile([pointer.x, pointer.y]);
    }
    else {
        glbSideBar.hoverOverBar();
    }
}
// Set up the graphical/logical backing for the building state
function buildSetup() {
    var selTerritory = null;
    if (glbMonth === 0) {
        glbBuildSel = eDEVEL.BaseCamp;
    }
    else {
        selTerritory = currPlayer.territory;
    }
    var tDevel = develArray[glbBuildSel];
    if (glbTileSelArray != []) {
        glbTileSelArray = currLand.getSel(selTerritory, tDevel.lscpRequired);
        glbPulseArray = glbTileSelArray;
        glbSideBar.removeBar();
        glbSideBar = new BuildBar();
        glbSideBar.formBar();
        glbState = build;
    }
    else {
        console.log("No applicable tile.");
        glbState = buy;
    }
}
// Player chooses where to build a newly bought development
function build() {
    // Click event handling
    pointer.tap = function () {
        buildClick([pointer.x, pointer.y]);
    };
    // Hover event handling
    if (pointer.x < (renderer.width - 200)) {
        hoverTile([pointer.x, pointer.y]);
    }
    else {
        glbSideBar.hoverOverBar();
    }
}
// Applies after a player has finished their turn
function cleanup() {
    if (glbSideBar.buttonArray.length != 0) {
        glbSideBar.removeBar();
    }
    currPlayer.discardHand();
    currPlayer.discardInPlay();
    if (currPlayer === cPlayerArray[1]) {
        glbState = plrMonSetup;
    }
    else if (currPlayer === cPlayerArray[0]) {
        glbState = monthSetup;
    }
}
