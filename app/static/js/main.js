/*

Main menu with selection between:
Single player
    Player vs computer
    Player vs 2-3 computers, possible teams
    Player vs no one (peaceful)
Local multi player
    Player vs player
    Three players (with possible 1 computer)
    Four players (with possible 1-2 computers)
    Player vs player on separate islands (peaceful)

After selection load pre-created island or generate new island
For random generation can select: size, shape (round, bay, twin, jagged, thin),
    climate (grassy, forested, rocky, desert)
Load development options based on pre-created island choice or randomly select new
    options
Player who moves first is randomly selected
First player chooses where to place their base camp
Second player chooses where to place their base camp, then begins first month
First month only has base camp avaialble with 1 Food and 1 Material
Turns work like this:
    Three developments are randomly selected and become active
    Active developments can be used, can give additional actions
    If an additional action is given, an unused development is randomly selected
    Developments which have been used cannot be re-used until next month
        Development effects (for now) have these possibilites:
        -Resources / +Resources
        Destroy a developments
        Build a development
        Build a development irregardless of distance
        For remainer of month, other developments effects are changed
        Copy the effect of an adjacent development
        Some allow the user a choice between multiple effects
    Once all developments are used up or the player passes, the player can build
    Building is unlimited, but consumes Food/Material/Treasure
        Building should be done with a function that takes option and cost variables
        Option can be the normal set for the game, could be something specific (if triggered
        by a development effect)
        Cost (for now) could only be normal or none (if triggered by a development effect)
        Normally, developments can only be built next to existing developments
        Some developments require special action to build
        Can build a ship, which sails away
    Once building is finished, the player's month is over
The gave ends after month ten
The player with the most ships built wins
In the case of a tie, the player with the most treasures wins, then materials, then food

*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eSIZE;
(function (eSIZE) {
    eSIZE[eSIZE["Small"] = 0] = "Small";
    eSIZE[eSIZE["Medium"] = 1] = "Medium";
    eSIZE[eSIZE["Large"] = 2] = "Large";
    eSIZE[eSIZE["Gigantic"] = 3] = "Gigantic";
})(eSIZE || (eSIZE = {}));
var eSHAPE;
(function (eSHAPE) {
    eSHAPE[eSHAPE["Round"] = 0] = "Round";
    eSHAPE[eSHAPE["Bay"] = 1] = "Bay";
    eSHAPE[eSHAPE["Twin"] = 2] = "Twin";
    eSHAPE[eSHAPE["Jagged"] = 3] = "Jagged";
    eSHAPE[eSHAPE["Thin"] = 4] = "Thin";
})(eSHAPE || (eSHAPE = {}));
var eCLIMATE;
(function (eCLIMATE) {
    eCLIMATE[eCLIMATE["Grassy"] = 0] = "Grassy";
    eCLIMATE[eCLIMATE["Forested"] = 1] = "Forested";
    eCLIMATE[eCLIMATE["Rocky"] = 2] = "Rocky";
    eCLIMATE[eCLIMATE["Desert"] = 3] = "Desert";
    eCLIMATE[eCLIMATE["Varied"] = 4] = "Varied";
})(eCLIMATE || (eCLIMATE = {}));
var eLAND;
(function (eLAND) {
    eLAND[eLAND["Grassy"] = 0] = "Grassy";
    eLAND[eLAND["Shore"] = 1] = "Shore";
    eLAND[eLAND["Forested"] = 2] = "Forested";
    eLAND[eLAND["Rocky"] = 3] = "Rocky";
    eLAND[eLAND["Desert"] = 4] = "Desert";
})(eLAND || (eLAND = {}));
var Hex = (function () {
    function Hex(setPos) {
        this.axialRow = setPos[0];
        this.axialCol = setPos[1];
        this.hexID = setPos[0] + "," + setPos[1];
    }
    // method to return the expected hexID of the instance's six neighbors.  Non-existant
    //  hexIDs are included in this.  The method starts with the horizontal-right nieghbor
    //  and proceeds clockwise
    Hex.prototype.getNeighbors = function () {
        var aNeighbors = [];
        aNeighbors[0] = [this.axialRow, (this.axialCol + 1)];
        aNeighbors[1] = [(this.axialRow + 1), this.axialCol];
        aNeighbors[2] = [(this.axialRow + 1), (this.axialCol - 1)];
        aNeighbors[3] = [this.axialRow, (this.axialCol - 1)];
        aNeighbors[4] = [(this.axialRow - 1), this.axialCol];
        aNeighbors[5] = [(this.axialRow - 1), (this.axialCol + 1)];
        return aNeighbors;
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
        this.development = 0;
        this.ownedBy = 0;
    }
    return Tile;
}(Hex));
var playerIncrement = 0; // Global incrementing variable used to set playerID
var Player = (function () {
    function Player() {
        this.playerOrder = 0;
        this.food = 2;
        this.material = 2;
        this.treasure = 0;
        this.ships = 0;
        this.canClick = false;
        this.playerID = playerIncrement;
        playerIncrement++;
    }
    return Player;
}());
var Land = (function () {
    function Land(setSize, setShape, setClimate) {
        this.lSize = setSize;
        this.lShape = setShape;
        this.lClimate = setClimate;
    }
    Land.prototype.debugLand = function () {
        console.log("This island's numbers are: " + this.lSize + " + " + this.lShape +
            " + " + this.lClimate);
    };
    Land.prototype.describeLand = function () {
        console.log("This island is " + eSIZE[this.lSize] + ", " + eSHAPE[this.lShape] +
            ", and " + eCLIMATE[this.lClimate]);
    };
    Land.prototype.readLand = function () {
        // Read land tile data from json file
    };
    Land.prototype.generateLand = function () {
        // Procedurally generatre land tiles based on selected land properties
    };
    Land.prototype.genTestLand = function () {
        // Generate a small debug land
        var landWidth = 3;
    };
    return Land;
}());
// Set up pixi.js
// Create an new instance of a pixi stage with a grey background
var stage = new PIXI.Stage(0x888888);
// Create a renderer instance width=640 height=480
var renderer = PIXI.autoDetectRenderer(640, 480);
// Importing a texture atlas
var tileAtlas = ["images.json"];
var loader = new PIXI.AssetLoader(tileAtlas);
var gameContainer = new PIXI.DisplayObjectContainer();
stage.addChild(gameContainer);
document.body.appendChild(renderer.view);
// Use callback
loader.onComplete = onTilesLoaded;
loader.load();
var littleLand = new Land(eSIZE.Small, eSHAPE.Round, eCLIMATE.Varied);
littleLand.tileArray = [];
littleLand.tileArray[0] = [];
littleLand.tileArray[0][0] = new Tile([7, 7]);
littleLand.tileArray[-1] = [];
littleLand.tileArray[-1][6] = new Tile([-1, 6]);
console.log(littleLand.tileArray[0][0].getNeighbors());
console.log(littleLand.tileArray[-1][6].getNeighbors());
