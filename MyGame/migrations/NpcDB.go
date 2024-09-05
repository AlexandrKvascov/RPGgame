package migrations

import (
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"os"
	"strconv"

	"github.com/mygame/config/Npc"
	"github.com/mygame/config/player"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func ReadOneNpc(collection *mongo.Collection, playerId int) ([]Npc.Npc, error) {

	filter := bson.M{"id": playerId}
	var NpcStatus player.Player
	err := collection.FindOne(context.Background(), filter).Decode(&NpcStatus)
	if err != nil {
		fmt.Println(err)
	}
	var result []Npc.Npc
	count := 0
	for _, npc := range NpcStatus.Npc {
		if !npc.Dead {
			count += 1
		}
	}
	if count == 0 {
		return nil, nil
	}
	var livingEnemy []int
	for _, npc := range NpcStatus.Npc {
		if !npc.Dead {
			livingEnemy = append(livingEnemy, npc.Id_npc)
		}
	}

	id := rand.Intn(len(livingEnemy))

	for _, npc := range NpcStatus.Npc {
		if npc.Id_npc == livingEnemy[id] && !npc.Dead {

			result = append(result, npc)
		}
	}
	return result, nil
}

func CreateNpc() ([]Npc.Npc, error) {

	jsonData, err := os.ReadFile("./migrations/CSV_date/csv.json")
	if err != nil {
		fmt.Println(err)
	}
	var npcs []Npc.Npc
	err = json.Unmarshal(jsonData, &npcs)
	if err != nil {
		return nil, err
	}
	return npcs, nil
}
func DeleteNpc(npcCollect *mongo.Collection) {
	err := npcCollect.Drop(context.TODO())
	if err != nil {
		fmt.Println(err)
	}
}
func DeadNpc(collection *mongo.Collection, npcId int, playerId int) {

	filter := bson.M{"id": playerId}
	update := bson.M{"$set": bson.M{"npc." + strconv.Itoa(npcId-1) + ".dead": true}}
	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		fmt.Println(err)
	}
}
