class ArcButton {
	// What the button represents, e.g. landscape, development, or other
	type: string = null;
	// This id links the button to another element, e.g. for a development-type button
	//  this would be the related development's id
	id: number = null;
	// If this is an other-type button the id will be null and this name will signify the
	//  button's name and function
	otherName: string = null;
	// An array of four numbers that defines the bounds of the button, from the upper left
	//  point and continuing clockwise
	bounds: number[][] = [];

	constructor(setType: string, setId: number, setOtherName: string, 
			setOrigin: number[][]) {
		this.type = setType;
		this.id = setId;
		this.otherName = setOtherName;
		this.bounds[0] = [];
		this.bounds[1] = [];
		this.bounds[2] = [];
		this.bounds[3] = [];
	}
}