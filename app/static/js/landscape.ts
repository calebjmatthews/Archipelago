/// <reference path="references.ts" />

class Landcape {
	id: number;
	sprID: string;
	tinyID: string;
	name: string;
	black: number; // ID of related black development

	constructor(setID: number, setSprID: string, setTinyID: string, setName: string, 
		setBlack: number) {
		this.id = setID;
		this.sprID = setSprID;
		this.tinyID = setTinyID; 
		this.name = setName;
		this.black = setBlack;
	}
}

var lscpArray = [];
lscpArray[eLSCP.Desert] = new Landcape(eLSCP.Desert, "desert.png", "tinydesert.png", 
	"Desert", null);
lscpArray[eLSCP.Forested] = new Landcape(eLSCP.Forested, "forested.png", 
	"tinyforested.png", "Forest", eDEVEL.Jungle);
lscpArray[eLSCP.Grassy] = new Landcape(eLSCP.Desert, "grassy.png", "tinygrassy.png",  
	"Plain", eDEVEL.Freshwater);
lscpArray[eLSCP.Rocky] = new Landcape(eLSCP.Rocky, "rocky.png", "tinyrocky.png",  
	"Highlands", eDEVEL.Cave);
lscpArray[eLSCP.Sea] = new Landcape(eLSCP.Sea, "sea.png", "tinysea.png", "Sea", null);
lscpArray[eLSCP.Shore] = new Landcape(eLSCP.Shore, "shore.png", "tinyshore.png", 
	"Shore", null);