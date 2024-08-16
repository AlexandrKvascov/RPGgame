package game

import (
	"github.com/mygame/config"
	"github.com/mygame/config/location"
)

type MyGame struct {
	WindowWidth, WindowHeight int
	Config                    config.GameData
	Location                  location.Location
}
