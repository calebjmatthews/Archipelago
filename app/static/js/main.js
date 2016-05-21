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
    eLAND[eLAND["Sea"] = 5] = "Sea";
})(eLAND || (eLAND = {}));
// Global gameplay variables
var glbBoundary = 14;
var glbOrigin = [508, 268];
var glbHHeight = 30;
var glbHWidth = 60;
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
var Hex = (function () {
    function Hex(setPos) {
        // Defines the graphical height/width of all hexagons in game
        this.height = 30;
        this.width = 60;
        this.scale = 0.2;
        this.axialRow = setPos[0];
        this.axialCol = setPos[1];
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
    Tile.prototype.getSpriteId = function () {
        if (this.landscape === eLAND.Desert) {
            return "desert.png";
        }
        else if (this.landscape === eLAND.Forested) {
            return "forested.png";
        }
        else if (this.landscape === eLAND.Grassy) {
            return "grassy.png";
        }
        else if (this.landscape === eLAND.Rocky) {
            return "rocky.png";
        }
        else if (this.landscape === eLAND.Sea) {
            return "sea.png";
        }
        else if (this.landscape === eLAND.Shore) {
            return "shore.png";
        }
        else {
            return "hex.png";
        }
    };
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
    function Land(sentSettings) {
        this.lSize = sentSettings[0];
        this.lShape = sentSettings[1];
        this.lClimate = sentSettings[2];
    }
    Land.prototype.readLand = function () {
        // Read land tile data from json file
    };
    Land.prototype.generateLand = function () {
        // Procedurally generate land tiles based on selected land properties
    };
    Land.prototype.genTestLand = function () {
        // Generate a small debug land
        var landWidth = 2;
        var landTiles = [];
        for (var currWidth = 0; currWidth < landWidth; currWidth++) {
            // Make grassy center
            if (currWidth === 0) {
                landTiles[0] = [];
                landTiles[0][0] = new Tile([0, 0]);
                landTiles[0][0].landscape = eLAND.Grassy;
            }
            else if (currWidth === 1) {
                var centerNeighbors = landTiles[0][0].getNeighbors();
                for (var currNbr = 0; currNbr < centerNeighbors.length; currNbr++) {
                    var tNbr = centerNeighbors[currNbr];
                    if (landTiles[tNbr[0]] === undefined) {
                        landTiles[tNbr[0]] = [];
                    }
                    landTiles[tNbr[0]][tNbr[1]] = new Tile([tNbr[0], tNbr[1]]);
                    landTiles[tNbr[0]][tNbr[1]].landscape = eLAND.Shore;
                }
            }
        }
        // Fill the rest with sea
        for (var currX = (-1 * glbBoundary); currX < glbBoundary; currX++) {
            for (var currY = (-1 * glbBoundary); currY < glbBoundary; currY++) {
                if (landTiles[currX] === undefined) {
                    landTiles[currX] = [];
                }
                if (landTiles[currX][currY] === undefined) {
                    landTiles[currX][currY] = new Tile([currX, currY]);
                    landTiles[currX][currY].landscape = eLAND.Sea;
                }
            }
        }
        this.tileArray = landTiles;
    };
    Land.prototype.displayLand = function () {
        // Create an intermediate sprite ID alias
        var sprId = loader.resources["static/img/images.json"].textures;
        var lTiles = this.tileArray;
        var landSprites = [];
        for (var currX = (-1 * glbBoundary); currX < glbBoundary; currX++) {
            for (var currY = (-1 * glbBoundary); currY < glbBoundary; currY++) {
                var tTile = lTiles[currX][currY];
                var tSprite = new Sprite(sprId[tTile.getSpriteId()]);
                tSprite.scale.set(tTile.scale, tTile.scale);
                var sPos = hexToPoint([currX, currY]);
                tSprite.position.set(sPos[0], sPos[1]);
                stage.addChild(tSprite);
                if (landSprites[currX] === undefined) {
                    landSprites[currX] = [];
                }
                landSprites[currX][currY] = tSprite;
            }
        }
        this.spriteArray = landSprites;
        renderer.render(stage);
    };
    return Land;
}());
// ~~~~ Set up pixi.js ~~~~
// PIXI Aliases
var Container = PIXI.Container, autoDetectRenderer = PIXI.autoDetectRenderer, loader = PIXI.loader, resources = PIXI.loader.resources, Sprite = PIXI.Sprite, TextureCache = PIXI.utils.TextureCache;
Graphics = PIXI.Graphics;
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
// Set the default game state to 'play'
var state = play;
var pointer = null;
var littleLand = new Land([eSIZE.Small, eSHAPE.Round, eCLIMATE.Varied]);
var msgPoint = null;
var msgAxial = null;
var msgLastAx = null;
function formEditBar() {
    for (var cButton = 0; cButton < 6; cButton++) {
        var sprId = loader.resources["static/img/images.json"].textures;
        var tSprite = new Sprite(sprId[cButton]);
        var bScale = 0.2;
        tSprite.scale.set(bScale, bScale);
    }
}
function formDebugBar() {
    // Display text
    msgPoint = new Text(("Coords: "), { font: "16px sans-serif", fill: "white" });
    msgPoint.position.set((stage.width - 280), 20);
    stage.addChild(msgPoint);
    msgAxial = new Text(("Hex: "), { font: "16px sans-serif", fill: "white" });
    msgAxial.position.set((stage.width - 280), 60);
    stage.addChild(msgAxial);
}
function onImageLoad() {
    // Create the Tink instance
    tb = new Tink(PIXI, renderer.view);
    pointer = tb.makePointer();
    // This code runs when the texture atlas has loaded
    littleLand.genTestLand();
    littleLand.displayLand();
    // Create design bar on right
    var designBG = new Graphics();
    designBG.beginFill(0x000000);
    designBG.drawRect(0, 0, 205, (stage.height));
    designBG.endFill();
    designBG.x = stage.width - 200;
    designBG.y = 0;
    stage.addChild(designBG);
    formDebugBar();
    // Start the game loop
    gameLoop();
}
function gameLoop() {
    requestAnimationFrame(gameLoop);
    // Update Tink
    tb.update();
    // Utilize the current game state
    state();
    renderer.render(stage);
}
// Executes on loop when game is in 'play' state
var lastHex = null;
function play() {
    // Highlight hovered hex
    var corPoint = [(pointer.x - glbOrigin[0]), (pointer.y - glbOrigin[1])];
    var hovAxial = pointToHex(corPoint);
    if (hovAxial != undefined) {
        if (lastHex != undefined) {
            littleLand.spriteArray[lastHex[0]][lastHex[1]].tint = 0xffffff;
        }
        littleLand.spriteArray[hovAxial[0]][hovAxial[1]].tint = 0x424949;
    }
    lastHex = hovAxial;
    msgPoint.text = ("Coords: " + corPoint);
    msgAxial.text = ("Hex: " + hovAxial);
}
