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
develArray[eDEVEL.FireCrew].cost[eCOST.Material] = -1;
develArray[eDEVEL.LaborPort].requirement = [];
develArray[eDEVEL.FireCrew].result = [];
develArray[eDEVEL.FireCrew].result[eRES.Destroy] = 1;
develArray[eDEVEL.FireCrew].result[eRES.Active] = 1;

develArray[eDEVEL.LaborPort] = new Development(eDEVEL.LaborPort, "laborport.png", 
	"Labor Port", eDCLR.Blue, [eLSCP.Shore], "req: -1 Treasure; res: +3 Actives");
develArray[eDEVEL.LaborPort].cost = [];
develArray[eDEVEL.LaborPort].cost[eCOST.Material] = -1;
develArray[eDEVEL.LaborPort].cost[eCOST.Treasure] = -1;
develArray[eDEVEL.LaborPort].requirement = [];
develArray[eDEVEL.LaborPort].requirement[eREQ.Treasure] = -1;
develArray[eDEVEL.LaborPort].result = [];
develArray[eDEVEL.LaborPort].result[eRES.Active] = 3;

develArray[eDEVEL.SeasSideParade] = new Development(eDEVEL.SeasSideParade, 
	"seassideparade.png", "Sea Side Parade", eDCLR.Blue, [eLSCP.Shore], 
	("req: -1 Material; res: For the rest of the month, all Blue developments " + 
		"give an additional +1 Treasure"));
develArray[eDEVEL.SeasSideParade].cost = [];
develArray[eDEVEL.SeasSideParade].cost[eCOST.Food] = -2;
develArray[eDEVEL.SeasSideParade].cost[eCOST.Material] = -2;
develArray[eDEVEL.SeasSideParade].cost[eCOST.Treasure] = -2;
develArray[eDEVEL.SeasSideParade].requirement = []
develArray[eDEVEL.SeasSideParade].requirement[eREQ.Material] = -1;
develArray[eDEVEL.SeasSideParade].result = [];
develArray[eDEVEL.SeasSideParade].result[eRES.BlueTreasure] = 1;

develArray[eDEVEL.TradeHarbor] = new Development(eDEVEL.TradeHarbor, 
	"tradeharbor.png", "Trade Harbor", eDCLR.Blue, [eLSCP.Shore], 
	("req: -1 Food, -1 Material; res: +1 Treasure"));
develArray[eDEVEL.TradeHarbor].cost = [];
develArray[eDEVEL.TradeHarbor].cost[eCOST.Material] = -2;
develArray[eDEVEL.TradeHarbor].requirement = []
develArray[eDEVEL.TradeHarbor].requirement[eREQ.Food] = -1;
develArray[eDEVEL.TradeHarbor].requirement[eREQ.Material] = -1;
develArray[eDEVEL.TradeHarbor].result = [];
develArray[eDEVEL.TradeHarbor].result[eRES.Treasure] = 1;

develArray[eDEVEL.AuctionHouse] = new Development(eDEVEL.AuctionHouse, 
	"actionhouse.png", "Auction House", eDCLR.Blue, [eLSCP.Shore], 
	("req: -1 Treasure; res: +2 Treasure"));
develArray[eDEVEL.AuctionHouse].cost = [];
develArray[eDEVEL.AuctionHouse].cost[eCOST.Material] = -3;
develArray[eDEVEL.AuctionHouse].cost[eCOST.Treasure] = -1;
develArray[eDEVEL.AuctionHouse].requirement = [];
develArray[eDEVEL.AuctionHouse].requirement[eREQ.Treasure] = -1;
develArray[eDEVEL.AuctionHouse].result = [];
develArray[eDEVEL.AuctionHouse].result[eRES.Treasure] = 2;

develArray[eDEVEL.EnvoyHarbor] = new Development(eDEVEL.EnvoyHarbor, 
	"envoyharbor.png", "Envoy Harbor", eDCLR.Blue, [eLSCP.Shore], 
	("req: -1 Treasure; res: +2 Food, +2 Material"));
develArray[eDEVEL.EnvoyHarbor].cost = [];
develArray[eDEVEL.EnvoyHarbor].cost[eCOST.Treasure] = -3;
develArray[eDEVEL.EnvoyHarbor].requirement = [];
develArray[eDEVEL.EnvoyHarbor].requirement[eREQ.Treasure] = -1;
develArray[eDEVEL.EnvoyHarbor].result = [];
develArray[eDEVEL.EnvoyHarbor].result[eRES.Food] = 2;
develArray[eDEVEL.EnvoyHarbor].result[eRES.Material] = 2;

develArray[eDEVEL.RicePaddy] = new Development(eDEVEL.RicePaddy, 
	"ricepaddy.png", "Rice Paddy", eDCLR.Green, [eLSCP.Grassy], 
	("res: +1 Food"));
develArray[eDEVEL.RicePaddy].cost = [];
develArray[eDEVEL.RicePaddy].cost[eCOST.Material] = -1;
develArray[eDEVEL.RicePaddy].requirement = [];
develArray[eDEVEL.RicePaddy].result = [];
develArray[eDEVEL.RicePaddy].result[eRES.Food] = 1;

develArray[eDEVEL.BoarRanch] = new Development(eDEVEL.BoarRanch, 
	"boarranch.png", "Boar Ranch", eDCLR.Green, [eLSCP.Grassy], 
	("req: -1 Food, res: +3 Food"));
develArray[eDEVEL.BoarRanch].cost = [];
develArray[eDEVEL.BoarRanch].cost[eCOST.Food] = -1;
develArray[eDEVEL.BoarRanch].cost[eCOST.Material] = -1;
develArray[eDEVEL.BoarRanch].requirement = [];
develArray[eDEVEL.BoarRanch].requirement[eREQ.Food] = -1;
develArray[eDEVEL.BoarRanch].result = [];
develArray[eDEVEL.BoarRanch].result[eRES.Food] = 3;

develArray[eDEVEL.HuntingCamp] = new Development(eDEVEL.HuntingCamp, 
	"huntingcamp.png", "Hunting Camp", eDCLR.Green, [eLSCP.Forested], 
	("res: +1 Food, +1 Active"));
develArray[eDEVEL.HuntingCamp].cost = [];
develArray[eDEVEL.HuntingCamp].cost[eCOST.Material] = -2;
develArray[eDEVEL.HuntingCamp].requirement = [];
develArray[eDEVEL.HuntingCamp].result = [];
develArray[eDEVEL.HuntingCamp].result[eRES.Food] = 1;
develArray[eDEVEL.HuntingCamp].result[eRES.Active] = 1;

develArray[eDEVEL.SmokeHouse] = new Development(eDEVEL.SmokeHouse, 
	"smokehouse.png", "Smoke House", eDCLR.Green, [eLSCP.Grassy], 
	("req: -1 Material, res: +3 Food"));
develArray[eDEVEL.SmokeHouse].cost = [];
develArray[eDEVEL.SmokeHouse].cost[eCOST.Material] = -2;
develArray[eDEVEL.SmokeHouse].requirement = [];
develArray[eDEVEL.SmokeHouse].requirement[eREQ.Material] = -1;
develArray[eDEVEL.SmokeHouse].result = [];
develArray[eDEVEL.SmokeHouse].result[eRES.Food] = 3;

develArray[eDEVEL.PeachOrchard] = new Development(eDEVEL.PeachOrchard, 
	"peachorchard.png", "Peach Orchard", eDCLR.Green, [eLSCP.Grassy], 
	("res: +2 Food"));
develArray[eDEVEL.PeachOrchard].cost = [];
develArray[eDEVEL.PeachOrchard].cost[eCOST.Material] = -2;
develArray[eDEVEL.PeachOrchard].requirement = [];
develArray[eDEVEL.PeachOrchard].result = [];
develArray[eDEVEL.PeachOrchard].result[eRES.Food] = 2;

develArray[eDEVEL.BambooCutters] = new Development(eDEVEL.BambooCutters, 
	"bamboocutters.png", "Bamboo Cutters", eDCLR.Orange, [eLSCP.Forested], 
	("res: +1 Material"));
develArray[eDEVEL.BambooCutters].cost = [];
develArray[eDEVEL.BambooCutters].cost[eCOST.Material] = -1;
develArray[eDEVEL.BambooCutters].requirement = [];
develArray[eDEVEL.BambooCutters].result = [];
develArray[eDEVEL.BambooCutters].result[eRES.Material] = 1;

develArray[eDEVEL.SilverMine] = new Development(eDEVEL.SilverMine, 
	"silvermine.png", "Silver Mine", eDCLR.Orange, [eLSCP.Rocky], 
	("req: -2 Food; res: +1 Treasure"));
develArray[eDEVEL.SilverMine].cost = [];
develArray[eDEVEL.SilverMine].cost[eCOST.Material] = -2;
develArray[eDEVEL.SilverMine].requirement = [];
develArray[eDEVEL.SilverMine].requirement[eREQ.Food] = -2;
develArray[eDEVEL.SilverMine].result = [];
develArray[eDEVEL.SilverMine].result[eRES.Treasure] = 1;

develArray[eDEVEL.StoneQuarry] = new Development(eDEVEL.StoneQuarry, 
	"stonequarry.png", "Stone Quarry", eDCLR.Orange, [eLSCP.Rocky], 
	("req: -1 Food; res: +3 Material"));
develArray[eDEVEL.StoneQuarry].cost = [];
develArray[eDEVEL.StoneQuarry].cost[eCOST.Material] = -2;
develArray[eDEVEL.StoneQuarry].requirement = [];
develArray[eDEVEL.StoneQuarry].requirement[eREQ.Food] = -1;
develArray[eDEVEL.StoneQuarry].result = [];
develArray[eDEVEL.StoneQuarry].result[eRES.Material] = 3;

develArray[eDEVEL.Woodcutters] = new Development(eDEVEL.Woodcutters, 
	"woodcutters.png", "Woodcutters", eDCLR.Orange, [eLSCP.Rocky], 
	("res: +2 Material"));
develArray[eDEVEL.Woodcutters].cost = [];
develArray[eDEVEL.Woodcutters].cost[eCOST.Material] = -2;
develArray[eDEVEL.Woodcutters].requirement = [];
develArray[eDEVEL.Woodcutters].result = [];
develArray[eDEVEL.Woodcutters].result[eRES.Material] = 2;

develArray[eDEVEL.CobaltMine] = new Development(eDEVEL.CobaltMine, 
	"cobaltmine.png", "Cobalt Mine", eDCLR.Orange, [eLSCP.Rocky], 
	("res: +1 Treasure"));
develArray[eDEVEL.CobaltMine].cost = [];
develArray[eDEVEL.CobaltMine].cost[eCOST.Material] = -4;
develArray[eDEVEL.CobaltMine].requirement = [];
develArray[eDEVEL.CobaltMine].result = [];
develArray[eDEVEL.CobaltMine].result[eRES.Treasure] = 1;

develArray[eDEVEL.WorkerVillage] = new Development(eDEVEL.WorkerVillage, 
	"workervillage.png", "Worker Village", eDCLR.Red, 
	[eLSCP.Desert, eLSCP.Forested, eLSCP.Grassy, eLSCP.Rocky, eLSCP.Shore], 
	("req: -1 Food; res: +2 Active"));
develArray[eDEVEL.WorkerVillage].cost = [];
develArray[eDEVEL.WorkerVillage].cost[eCOST.Material] = -1;
develArray[eDEVEL.WorkerVillage].requirement = [];
develArray[eDEVEL.WorkerVillage].requirement[eREQ.Food] = -1;
develArray[eDEVEL.WorkerVillage].result = [];
develArray[eDEVEL.WorkerVillage].result[eRES.Active] = 2;

develArray[eDEVEL.TeaHouse] = new Development(eDEVEL.TeaHouse, 
	"teahouse.png", "Tea House", eDCLR.Red, 
	[eLSCP.Desert, eLSCP.Forested, eLSCP.Grassy, eLSCP.Rocky, eLSCP.Shore], 
	("req: -1 Food; res: For the rest of the month, all Red developments give " + 
		"an additional +1 Active"));
develArray[eDEVEL.TeaHouse].cost = [];
develArray[eDEVEL.TeaHouse].cost[eCOST.Material] = -1;
develArray[eDEVEL.TeaHouse].cost[eCOST.Treasure] = -1;
develArray[eDEVEL.TeaHouse].requirement = [];
develArray[eDEVEL.TeaHouse].requirement[eREQ.Food] = -1;
develArray[eDEVEL.TeaHouse].result = [];
develArray[eDEVEL.TeaHouse].result[eRES.RedActive] = 1;

develArray[eDEVEL.Demolition] = new Development(eDEVEL.Demolition, 
	"demolition.png", "Demolition", eDCLR.Red, 
	[eLSCP.Desert, eLSCP.Forested, eLSCP.Grassy, eLSCP.Rocky, eLSCP.Shore], 
	("req: Destroy 1 Development; res: +1 Material"));
develArray[eDEVEL.Demolition].cost = [];
develArray[eDEVEL.Demolition].cost[eCOST.Material] = -2;
develArray[eDEVEL.Demolition].requirement = [];
develArray[eDEVEL.Demolition].requirement[eREQ.Destroy] = 1;
develArray[eDEVEL.Demolition].result = [];
develArray[eDEVEL.Demolition].result[eRES.Material] = 1;

develArray[eDEVEL.ShepherdVillage] = new Development(eDEVEL.ShepherdVillage, 
	"shepherdvillage.png", "Shepherd Village", eDCLR.Red, 
	[eLSCP.Grassy], ("req: -1 Food; res: +2 Active,  +1 Material"));
develArray[eDEVEL.ShepherdVillage].cost = [];
develArray[eDEVEL.ShepherdVillage].cost[eCOST.Food] = -1;
develArray[eDEVEL.ShepherdVillage].cost[eCOST.Material] = -2;
develArray[eDEVEL.ShepherdVillage].requirement = [];
develArray[eDEVEL.ShepherdVillage].requirement[eREQ.Food] = -1;
develArray[eDEVEL.ShepherdVillage].result = [];
develArray[eDEVEL.ShepherdVillage].result[eRES.Active] = 2;
develArray[eDEVEL.ShepherdVillage].result[eRES.Material] = 1;

develArray[eDEVEL.Town] = new Development(eDEVEL.Town, 
	"town.png", "Town", eDCLR.Red, 
	[eLSCP.Desert, eLSCP.Forested, eLSCP.Grassy, eLSCP.Rocky, eLSCP.Shore], 
	("req: -2 Food; res: +3 Active"));
develArray[eDEVEL.Town].cost = [];
develArray[eDEVEL.Town].cost[eCOST.Material] = -3;
develArray[eDEVEL.Town].cost[eCOST.Treasure] = -1;
develArray[eDEVEL.Town].requirement = [];
develArray[eDEVEL.Town].requirement[eREQ.Food] = -2;
develArray[eDEVEL.Town].result = [];
develArray[eDEVEL.Town].result[eRES.Active] = 3;

develArray[eDEVEL.MerchantShip] = new Development(eDEVEL.MerchantShip, 
	"merchantship.png", "Merchant Ship", eDCLR.Violet, 
	null, ("req: Destroy 1 Blue Development to build this; res: +1 Ship"));
develArray[eDEVEL.MerchantShip].cost = [];
develArray[eDEVEL.MerchantShip].cost[eCOST.Treasure] = -2;
develArray[eDEVEL.WorkmanShip].cost[eCOST.Material] = -1;
develArray[eDEVEL.MerchantShip].cost[eCOST.DestroyBlue] = 1;
develArray[eDEVEL.MerchantShip].requirement = [];
develArray[eDEVEL.MerchantShip].result = [];
develArray[eDEVEL.MerchantShip].result[eRES.Ship] = 1;

develArray[eDEVEL.VentureShip] = new Development(eDEVEL.VentureShip, 
	"ventureship.png", "Venture Ship", eDCLR.Violet, 
	null, ("req: Destroy 1 Green Development to build this; res: +1 Ship"));
develArray[eDEVEL.VentureShip].cost = [];
develArray[eDEVEL.VentureShip].cost[eCOST.Food] = -4;
develArray[eDEVEL.WorkmanShip].cost[eCOST.Material] = -1;
develArray[eDEVEL.VentureShip].cost[eCOST.DestroyGreen] = 1;
develArray[eDEVEL.VentureShip].requirement = [];
develArray[eDEVEL.VentureShip].result = [];
develArray[eDEVEL.VentureShip].result[eRES.Ship] = 1;

develArray[eDEVEL.WorkmanShip] = new Development(eDEVEL.WorkmanShip, 
	"workmanship.png", "Workman Ship", eDCLR.Violet, 
	null, ("req: Destroy 1 Orange Development to build this; res: +1 Ship"));
develArray[eDEVEL.WorkmanShip].cost = [];
develArray[eDEVEL.WorkmanShip].cost[eCOST.Material] = -4;
develArray[eDEVEL.WorkmanShip].cost[eCOST.DestroyOrange] = 1;
develArray[eDEVEL.WorkmanShip].requirement = [];
develArray[eDEVEL.WorkmanShip].result = [];
develArray[eDEVEL.WorkmanShip].result[eRES.Ship] = 1;

develArray[eDEVEL.OpulentVessel] = new Development(eDEVEL.OpulentVessel, 
	"opulentvessel.png", "Opulent Vessel", eDCLR.Violet, null, ("res: +1 Ship"));
develArray[eDEVEL.OpulentVessel].cost = [];
develArray[eDEVEL.OpulentVessel].cost[eCOST.Treasure] = -3;
develArray[eDEVEL.AbundantVessel].cost[eCOST.Material] = -2;
develArray[eDEVEL.OpulentVessel].requirement = [];
develArray[eDEVEL.OpulentVessel].result = [];
develArray[eDEVEL.OpulentVessel].result[eRES.Ship] = 1;

develArray[eDEVEL.AbundantVessel] = new Development(eDEVEL.AbundantVessel, 
	"abundantvessel.png", "Abundant Vessel", eDCLR.Violet, null, ("res: +1 Ship"));
develArray[eDEVEL.AbundantVessel].cost = [];
develArray[eDEVEL.AbundantVessel].cost[eCOST.Food] = -6;
develArray[eDEVEL.AbundantVessel].cost[eCOST.Material] = -2;
develArray[eDEVEL.AbundantVessel].requirement = [];
develArray[eDEVEL.AbundantVessel].result = [];
develArray[eDEVEL.AbundantVessel].result[eRES.Ship] = 1;

develArray[eDEVEL.SteadyVessel] = new Development(eDEVEL.SteadyVessel, 
	"steadyvessel.png", "Steady Vessel", eDCLR.Violet, null, ("res: +1 Ship"));
develArray[eDEVEL.SteadyVessel].cost = [];
develArray[eDEVEL.SteadyVessel].cost[eCOST.Material] = -7;
develArray[eDEVEL.SteadyVessel].requirement = [];
develArray[eDEVEL.SteadyVessel].result = [];
develArray[eDEVEL.SteadyVessel].result[eRES.Ship] = 1;

// develArray[eDEVEL.Cave].sprID = "hex.png";
develArray[eDEVEL.FireCrew].sprID = "hex.png";
// develArray[eDEVEL.Freshwater].sprID = "hex.png";
// develArray[eDEVEL.Jungle].sprID = "hex.png";
develArray[eDEVEL.LaborPort].sprID = "hex.png";
develArray[eDEVEL.SeasSideParade].sprID = "hex.png";