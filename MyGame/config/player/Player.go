package player

import "github.com/mygame/config/Npc"

type Player struct {
	Id             int
	Name           string
	Health         int
	Strenght       int
	Lvl            int
	Hp             int
	Exp            int
	CollectionName string
	UserPlayers    string
	Npc            []Npc.Npc
}
