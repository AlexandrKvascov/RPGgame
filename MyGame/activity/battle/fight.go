package battle

import (
	"github.com/mygame/config/Npc"

	"github.com/mygame/migrations"

	_ "github.com/lib/pq"
	"go.mongodb.org/mongo-driver/mongo"
)

type Fight struct {
}

func TakeNpc(npcCollect *mongo.Collection, playerId int) ([]Npc.Npc, error) {

	NpcStatus, err := migrations.ReadOneNpc(npcCollect, playerId)

	if err != nil {
		return NpcStatus, err
	}
	return NpcStatus, nil
}
