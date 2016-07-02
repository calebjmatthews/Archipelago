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
function veAllEffects() {
    if (glbPulseArray != []) {
        vePulse(glbPulseArray);
    }
}