package battle

import (
	"context"
	"fmt"
	"math/rand"
	"time"

	_ "github.com/lib/pq"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Fight struct {
}
type Npc struct {
	Id       int
	Type     string
	Lvl      int
	Health   int
	Strength int
	Location string
	Dead     bool
}

func (n *Npc) TakeNpc(npcCollect *mongo.Collection, num int) (Npc, error) {

	var NpcStatus Npc
	id := rand.Intn(20) + 1
	filter := bson.M{"id": id}
	fmt.Println(id)
	err := npcCollect.FindOne(context.Background(), filter).Decode(&NpcStatus)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(34)
	fmt.Println(&NpcStatus)
	return NpcStatus, nil
}

func (n *Npc) battle(hpEnemy, dmgEnemy, hp, dmg int) {
	for {
		cube := RandInt()
		time.Sleep(1 * time.Second)

		if cube < 10 {

			time.Sleep(1 * time.Second)
			hp -= dmgEnemy

		} else {
			fmt.Println("You attack!")
			hpEnemy -= dmg

		}
		if hp <= 0 {
			hp = 0

			break
		}
		if hpEnemy <= 0 {
			hpEnemy = 0
			fmt.Println("You win!")
			break
		}
	}

}
func RandInt() int {
	return rand.Intn(50) + 1
}
