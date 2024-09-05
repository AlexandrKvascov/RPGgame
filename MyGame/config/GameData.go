package config

import (
	"github.com/mygame/config/Npc"
	"github.com/mygame/config/location"
	"github.com/mygame/config/player"
)

type GameData struct {
	Player   player.Player
	Location location.Location
	Items    []player.Item
	Npc      Npc.Npc
}
