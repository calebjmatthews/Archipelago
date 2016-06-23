/// <reference path="references.ts" />

class Development {
	id: number;
	sprID: string;
	name: string;
	color: number;
	lscpRequired: number[];
	description: string;
	cost: number[];
	requirement: number[];
	result: number[];

	constructor(setID: number, setSprID: string, setName: string, setColor: number,
		setLscpRequired: number[], setDescription: string) {
		this.id = setID;
		this.sprID = setSprID;
		this.name = setName;
		this.color = setColor;
		this.lscpRequired = setLscpRequired;
		this.description = setDescription;
	}
}

var develArray = [];

develArray[eDEVEL.Jungle] = new Development(eDEVEL.Jungle, "jungle.png", 
	"Jungle", eDCLR.Black, [eLSCP.Forested], "No effect");

develArray[eDEVEL.Freshwater] = new Development(eDEVEL.Freshwater, "freshwater.png", 
	"Freshwater", eDCLR.Black, [eLSCP.Grassy], "No effect");

develArray[eDEVEL.Cave] = new Development(eDEVEL.Cave, "cave.png", "Cave", 
	eDCLR.Black, [eLSCP.Rocky], "No effect");

develArray[eDEVEL.FireCrew] = new Development(eDEVEL.FireCrew, "firecrew.png", 
	"Fire Crew", eDCLR.Blue, [eLSCP.Shore], "res: Destroy Development; res: +1 Active");
develArray[eDEVEL.FireCrew].cost = [];
develArray[eDEVEL.FireCrew].cost[eCOST.Material] = 1;
develArray[eDEVEL.FireCrew].requirement = null;
develArray[eDEVEL.FireCrew].result = [];
develArray[eDEVEL.FireCrew].result[eRES.Destroy] = 1;
develArray[eDEVEL.FireCrew].result[eRES.Active] = 1;

develArray[eDEVEL.LaborPort] = new Development(eDEVEL.LaborPort, "laborport.png", 
	"Labor Port", eDCLR.Blue, [eLSCP.Shore], "req: -1 Treasure; res: +3 Actives");
develArray[eDEVEL.LaborPort].cost = [];
develArray[eDEVEL.LaborPort].cost[eCOST.Material] = 1;
develArray[eDEVEL.LaborPort].cost[eCOST.Treasure] = 1;
develArray[eDEVEL.LaborPort].requirement = []
develArray[eDEVEL.LaborPort].requirement[eREQ.Treasure] = 1;
develArray[eDEVEL.LaborPort].result = [];
develArray[eDEVEL.LaborPort].result[eRES.Active] = 3;

develArray[eDEVEL.SeasSideParade] = new Development(eDEVEL.SeasSideParade, 
	"seassideparade.png", "Sea Side Parade", eDCLR.Blue, [eLSCP.Shore], 
	("req: -1 Material; res: For the rest of the month, all Blue developments " + 
		"give an additional +1 Treasure"));
develArray[eDEVEL.SeasSideParade].cost = [];
develArray[eDEVEL.SeasSideParade].cost[eCOST.Food] = 2;
develArray[eDEVEL.SeasSideParade].cost[eCOST.Material] = 2;
develArray[eDEVEL.SeasSideParade].cost[eCOST.Treasure] = 2;
develArray[eDEVEL.SeasSideParade].requirement = []
develArray[eDEVEL.SeasSideParade].requirement[eREQ.Material] = 1;
develArray[eDEVEL.SeasSideParade].result = [];
develArray[eDEVEL.SeasSideParade].result[eRES.BlueTreasure] = 1;

develArray[eDEVEL.TradeHarbor] = new Development(eDEVEL.TradeHarbor, 
	"tradeharbor.png", "Trade Harbor", eDCLR.Blue, [eLSCP.Shore], 
	("req: -1 Food, -1 Material; res: +1 Treasure"));
develArray[eDEVEL.TradeHarbor].cost = [];
develArray[eDEVEL.TradeHarbor].cost[eCOST.Material] = 2;
develArray[eDEVEL.TradeHarbor].requirement = []
develArray[eDEVEL.TradeHarbor].requirement[eREQ.Food] = 1;
develArray[eDEVEL.TradeHarbor].requirement[eREQ.Material] = 1;
develArray[eDEVEL.TradeHarbor].result = [];
develArray[eDEVEL.TradeHarbor].result[eRES.Treasure] = 1;

develArray[eDEVEL.AuctionHouse] = new Development(eDEVEL.AuctionHouse, 
	"actionhouse.png", "Auction House", eDCLR.Blue, [eLSCP.Shore], 
	("req: -1 Treasure; res: +2 Treasure"));
develArray[eDEVEL.AuctionHouse].cost = [];
develArray[eDEVEL.AuctionHouse].cost[eCOST.Material] = 3;
develArray[eDEVEL.AuctionHouse].cost[eCOST.Treasure] = 1;
develArray[eDEVEL.AuctionHouse].requirement = []
develArray[eDEVEL.AuctionHouse].requirement[eREQ.Treasure] = 1;
develArray[eDEVEL.AuctionHouse].result = [];
develArray[eDEVEL.AuctionHouse].result[eRES.Treasure] = 2;

develArray[eDEVEL.EnvoyHarbor] = new Development(eDEVEL.EnvoyHarbor, 
	"envoyharbor.png", "Envoy Harbor", eDCLR.Blue, [eLSCP.Shore], 
	("req: -1 Treasure; res: +2 Food, +2 Material"));
develArray[eDEVEL.EnvoyHarbor].cost = [];
develArray[eDEVEL.EnvoyHarbor].cost[eCOST.Treasure] = 3;
develArray[eDEVEL.EnvoyHarbor].requirement = []
develArray[eDEVEL.EnvoyHarbor].requirement[eREQ.Treasure] = 1;
develArray[eDEVEL.EnvoyHarbor].result = [];
develArray[eDEVEL.EnvoyHarbor].result[eRES.Food] = 2;
develArray[eDEVEL.EnvoyHarbor].result[eRES.Material] = 2;

develArray[eDEVEL.RicePaddy] = new Development(eDEVEL.RicePaddy, 
	"ricepaddy.png", "Rice Paddy", eDCLR.Green, [eLSCP.Grassy], 
	("res: +1 Food"));
develArray[eDEVEL.RicePaddy].cost = [];
develArray[eDEVEL.RicePaddy].cost[eCOST.Material] = 1;
develArray[eDEVEL.RicePaddy].requirement = []
develArray[eDEVEL.RicePaddy].result = [];
develArray[eDEVEL.RicePaddy].result[eRES.Food] = 1;

develArray[eDEVEL.BoarRanch] = new Development(eDEVEL.BoarRanch, 
	"boarranch.png", "Boar Ranch", eDCLR.Green, [eLSCP.Grassy], 
	("req: -1 Food, res: +3 Food"));
develArray[eDEVEL.BoarRanch].cost = [];
develArray[eDEVEL.BoarRanch].cost[eCOST.Food] = 1;
develArray[eDEVEL.BoarRanch].cost[eCOST.Material] = 1;
develArray[eDEVEL.BoarRanch].requirement = []
develArray[eDEVEL.BoarRanch].requirement[eCOST.Food] = 1;
develArray[eDEVEL.BoarRanch].result = [];
develArray[eDEVEL.BoarRanch].result[eRES.Food] = 3;

develArray[eDEVEL.HuntingCamp] = new Development(eDEVEL.HuntingCamp, 
	"huntingcamp.png", "Hunting Camp", eDCLR.Green, [eLSCP.Forested], 
	("res: +1 Food, +1 Active"));
develArray[eDEVEL.HuntingCamp].cost = [];
develArray[eDEVEL.HuntingCamp].cost[eCOST.Material] = 2;
develArray[eDEVEL.HuntingCamp].requirement = []
develArray[eDEVEL.HuntingCamp].result = [];
develArray[eDEVEL.HuntingCamp].result[eRES.Food] = 1;
develArray[eDEVEL.HuntingCamp].result[eRES.Active] = 1;

develArray[eDEVEL.SmokeHouse] = new Development(eDEVEL.SmokeHouse, 
	"smokehouse.png", "Smoke House", eDCLR.Green, [eLSCP.Grassy], 
	("req: -1 Material, res: +3 Food"));
develArray[eDEVEL.SmokeHouse].cost = [];
develArray[eDEVEL.SmokeHouse].cost[eCOST.Material] = 2;
develArray[eDEVEL.SmokeHouse].requirement = []
develArray[eDEVEL.SmokeHouse].requirement[eREQ.Material] = 1;
develArray[eDEVEL.SmokeHouse].result = [];
develArray[eDEVEL.SmokeHouse].result[eRES.Food] = 3;

develArray[eDEVEL.PeachOrchard] = new Development(eDEVEL.PeachOrchard, 
	"peachorchard.png", "Peach Orchard", eDCLR.Green, [eLSCP.Grassy], 
	("res: +2 Food"));
develArray[eDEVEL.PeachOrchard].cost = [];
develArray[eDEVEL.PeachOrchard].cost[eCOST.Material] = 2;
develArray[eDEVEL.PeachOrchard].requirement = []
develArray[eDEVEL.PeachOrchard].result = [];
develArray[eDEVEL.PeachOrchard].result[eRES.Food] = 2;

// develArray[eDEVEL.Cave].sprID = "hex.png";
develArray[eDEVEL.FireCrew].sprID = "hex.png";
// develArray[eDEVEL.Freshwater].sprID = "hex.png";
// develArray[eDEVEL.Jungle].sprID = "hex.png";
develArray[eDEVEL.LaborPort].sprID = "hex.png";
develArray[eDEVEL.SeasSideParade].sprID = "hex.png";