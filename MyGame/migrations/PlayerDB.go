package migrations

import (
	"context"
	"fmt"

	"github.com/mygame/config/Npc"
	"github.com/mygame/config/player"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreatePlayer(collection *mongo.Collection, NUM int, name string, userPlayers string) player.Player {
	id := newId(collection, NUM)
	npcs, err := CreateNpc()
	player := player.Player{
		Id:          id,
		Name:        name,
		Health:      30,
		Strenght:    10,
		Lvl:         1,
		Hp:          3,
		Exp:         0,
		Npc:         npcs,
		UserPlayers: userPlayers,
	}
	_, err = collection.InsertOne(context.Background(), player)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Player created successfully")
	}
	return player
}

func newId(collection *mongo.Collection, NUM int) int {

	okey, err := collection.Find(context.Background(), bson.D{})
	if err != nil {
		panic(err)
	}

	var plr []player.Player
	err = okey.All(context.Background(), &plr)
	if err != nil {
		panic(err)
	}
	if len(plr) > 0 {
		lastElement := plr[len(plr)-1]
		NUM = lastElement.Id + 1
	}

	// Write new ID back to file
	return NUM

}

func UpdateLvlPlayer(collection *mongo.Collection, EnemyId, ExpNewLvl, MeExp int) {

	var NpcStatus player.Player
	var PlayerStatus player.Player

	filter := bson.M{"id": ExpNewLvl}

	err := collection.FindOne(context.Background(), filter).Decode(&NpcStatus)
	if err != nil {
		fmt.Println(err)
	}
	var npcRes []Npc.Npc
	for _, npc := range NpcStatus.Npc {
		if npc.Id_npc == EnemyId {
			npcRes = append(npcRes, npc)
		}
	}

	collection.FindOne(context.Background(), filter).Decode(&PlayerStatus)
	if len(npcRes) > 0 {

		Exp := (npcRes[0].Lvl*npcRes[0].Strength)/(PlayerStatus.Lvl+1) + MeExp
		if Exp >= 100 {
			lvlNew := PlayerStatus.Lvl + (Exp / 100)
			Exp = Exp % 100
			filter = bson.M{"id": ExpNewLvl}
			update := bson.M{"$set": bson.M{"exp": Exp, "lvl": lvlNew, "strenght": PlayerStatus.Strenght + 10, "health": PlayerStatus.Health + 10}}
			_, err := collection.UpdateOne(context.Background(), filter, update)
			if err != nil {
				fmt.Println(err)
			}
		} else {
			filter = bson.M{"id": ExpNewLvl}
			update := bson.M{"$set": bson.M{"exp": Exp}}
			_, err := collection.UpdateOne(context.Background(), filter, update)
			if err != nil {
				fmt.Println(err)
			}
		}
	}
}
func ReadInitPlayer(collection *mongo.Collection, playerId int) player.Player {

	filter := bson.M{"id": playerId}
	var PlayerStatus player.Player
	err := collection.FindOne(context.Background(), filter).Decode(&PlayerStatus)
	if err != nil {
		fmt.Println(err)
	}
	return PlayerStatus
}

func ReadAllPlayer(collection *mongo.Collection, userCode string) ([]player.Player, error) {
	filter := bson.M{"userplayers": userCode}
	var PlayerStatus []player.Player
	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var player player.Player
		err := cursor.Decode(&player)
		if err != nil {
			return nil, err
		}
		PlayerStatus = append(PlayerStatus, player)
	}
	if err := cursor.Err(); err != nil {
		return nil, err
	}
	return PlayerStatus, nil
}

func ReadNpcCollect(collection *mongo.Collection, id int) (string, error) {
	filter := bson.M{"id": id}
	var PlayerStatus player.Player
	err := collection.FindOne(context.Background(), filter).Decode(&PlayerStatus)
	if err != nil {
		fmt.Println(err)
		return "zero", err

	}
	return PlayerStatus.CollectionName, nil
}

func UpdateLifeMin(collection *mongo.Collection, id int) {
	filter := bson.M{"id": id}
	var playerStatus player.Player
	err := collection.FindOne(context.Background(), filter).Decode(&playerStatus)
	if err != nil {
		fmt.Println(err)
	}

	update := bson.M{"$set": bson.M{"hp": playerStatus.Hp - 1}}
	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		fmt.Println(err)

	}

}

func UpdateRelif(collection *mongo.Collection, id int) {
	filter := bson.M{"id": id}
	var playerStatus player.Player
	npcs, err := CreateNpc()

	err = collection.FindOne(context.Background(), filter).Decode(&playerStatus)
	if err != nil {
		fmt.Println(err)
	}
	update := bson.M{"$set": bson.M{"health": 30, "strenght": 10, "lvl": 1, "hp": 3, "exp": 0, "npc": npcs}}
	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		fmt.Println(err)

	}
}
