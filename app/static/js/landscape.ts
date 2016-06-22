/// <reference path="references.ts" />

class Landcape {
	id: number;
	sprID: string;
	name: string;
	black: number; // ID of related black development

	constructor(setID: number, setSprID: string, setName: string, setBlack: number) {
		this.id = setID;
		this.sprID = setSprID;
		this.name = setName;
		this.black = setBlack;
	}
}

var lscpArray = [];
lscpArray[eLSCP.Desert] = new Landcape(eLSCP.Desert, "desert.png", "Desert", null);
lscpArray[eLSCP.Forested] = new Landcape(eLSCP.Desert, "forested.png", 
	"Forested", eDEVEL.Jungle);
lscpArray[eLSCP.Grassy] = new Landcape(eLSCP.Desert, "grassy.png", 
	"Grassy", eDEVEL.Freshwater);
lscpArray[eLSCP.Rocky] = new Landcape(eLSCP.Rocky, "rocky.png", 
	"Rocky", eDEVEL.Cave);
lscpArray[eLSCP.Sea] = new Landcape(eLSCP.Sea, "sea.png", "Sea", null);
lscpArray[eLSCP.Shore] = new Landcape(eLSCP.Shore, "shore.png", "Shore", null);