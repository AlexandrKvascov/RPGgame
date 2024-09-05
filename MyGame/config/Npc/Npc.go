package Npc

type Npc struct {
	Id_npc   int    `bson:"id_npc"`
	Type     string `bson:"type"`
	Lvl      int    `bson:"lvl"`
	Health   int    `bson:"health"`
	Strength int    `bson:"strength"`
	Location string `bson:"loacation"`
	Dead     bool   `bson:"dead"`
}
