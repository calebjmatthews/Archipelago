/// <reference path="references.ts" />

class ArcHistory {
	// The type of action this represents, e.g. resource change or development built
	type: string = null;
	// If the effect came from a development, this is the development's tileID
	id: number;
	// If developments were built, this contains the location(s)
	buildTileId: number[];
	// If development(s) were destroyed, this contains the location(s)
	destroyedTileId: number[];
	// If development(s) was destroyed, this contains the development(s)'s id(s)
	destroyedDev: number[];

	constructor(setType: string) {
		this.type = setType;
	}

	recordDevAction(setTileId: number) {
		this.id = setTileId;
	}

	recordBuildTileId(setBuildTileId: number) {
		this.buildTileId.push(setBuildTileId);
	}

	recordDestruction(setDestroyedTileId: number, setDestroyedDev: number) {
		this.destroyedTileId.push(setDestroyedTileId);
		this.destroyedDev.push(setDestroyedDev);
	}

	undoAction() {
		if (this.type === "development") {
			applyDevEffect(this.id, true);
		}
		else if (this.type === "build") {

		}
		else if (this.type === "pass") {

		}
	}

	undoBuildCost() {

	}
}