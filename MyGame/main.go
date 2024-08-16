package main

import (
	"context"
	"fmt"
	"strconv"

	// "strconv"

	"math/rand"
	"net/http"

	_ "github.com/lib/pq"
	"github.com/mygame/activity/battle"
	"github.com/mygame/activity/walk"
	"github.com/mygame/config"
	"github.com/mygame/config/location"

	"github.com/mygame/config/player"
	// "github.com/mygame/migrations/migrations"
	"github.com/redis/go-redis/v9"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"encoding/json"
)

type myGame struct {
	config   config.GameData
	location location.Location
	// migrate migrations
	player player.Player
}

var NUM int = 1

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	g := &myGame{
		config:   config.GameData{},
		location: location.Location{},
		player:   player.Player{},
	}

	ctx, cancel := context.WithCancel(context.Background())

	clientOptins := options.Client().ApplyURI("mongodb://localhost:27017/")
	clientOptins.SetAuth(options.Credential{
		Username: "Kosov_AA",
		Password: "Af1971985623",
	})
	var client *mongo.Client
	client, err := mongo.Connect(ctx, clientOptins)
	if err != nil {
		panic(err)
	}
	defer cancel()

	db := client.Database("myGame")

	// if err = migrate(db); err!=nil{
	// 	fmt.Println("Error migrating database: ", err)
	// 	return
	// }

	collection := db.Collection("players")
	npcCollect := db.Collection("npc")
	redClient := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	fmt.Println(redClient)
	if answ, err := npcCollect.CountDocuments(ctx, bson.M{}); err != nil {
		fmt.Println("NPC collection not found", answ)
	} else {
		fmt.Println("NPC collection  found", answ)

	}

	go g.HandleInputName(collection, redClient)
	go g.HandleMove(collection, redClient)
	go g.Handlefight(npcCollect)
	go g.HandleBattle(collection)

	fmt.Println("Сервер запущен на порту 8080")
	err = http.ListenAndServe(":8080", corsMiddleware(http.DefaultServeMux))
	if err != nil {
		fmt.Println("Ошибка запуска сервера:", err)
	}

}
func (g *myGame) HandleInputName(collection *mongo.Collection, redClient *redis.Client) {
	http.HandleFunc("/newgame", func(w http.ResponseWriter, r *http.Request) {
		name := r.URL.Query().Get("name")
		id := g.newId(collection)

		player := player.Player{
			Id:       id,
			Name:     name,
			Health:   30,
			Strenght: 10,
			Lvl:      1,
			Hp:       3,
		}
		_, err := collection.InsertOne(context.Background(), player)

		if err != nil {
			panic(err)
		}
		err = redClient.HMSet(context.Background(), "player:"+strconv.Itoa(player.Id), map[string]interface{}{
			"name":     player.Name,
			"health":   player.Health,
			"strenght": player.Strenght,
			"lvl":      player.Lvl,
			"hp":       player.Hp,
		}).Err()
		g.config.Player.Id = player.Id
		g.config.Player.Name = player.Name
		g.config.Player.Health = player.Health
		g.config.Player.Strenght = player.Strenght
		g.config.Player.Lvl = player.Lvl
		g.config.Player.Hp = player.Hp
		fmt.Println(g.config.Player)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(g.config.Player)
	})
}
func (g *myGame) HandleMove(collection *mongo.Collection, redClient *redis.Client) {
	http.HandleFunc("/move", func(w http.ResponseWriter, r *http.Request) {
		direction := r.URL.Query().Get("direction")

		a := &walk.Activity{}

		name, description := a.HandleInput(direction)
		var local []string = []string{name, description}
		fmt.Println(local)
		val, err := redClient.HGet(context.Background(), "player:"+strconv.Itoa(6), "name").Result()
		if err != nil {
			fmt.Println(err, 1)
		} else {
			// val - это строка, содержащая значение поля "name"
			fmt.Println(val)
		}
		json.NewEncoder(w).Encode(local)
	})
}

func (g *myGame) Handlefight(npcCollect *mongo.Collection) {
	http.HandleFunc("/battle", func(w http.ResponseWriter, r *http.Request) {
		a := &battle.Npc{}
		state, err := a.TakeNpc(npcCollect, NUM)

		fmt.Println(state)
		// a.TakeNpc(npcCollect, NUM)
		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(w).Encode(state)

	})
}

func (g *myGame) HandleBattle(collection *mongo.Collection) {

	http.HandleFunc("/getbattle", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Request body:", r.Body)
		var data struct {
			Coin string `json:"coin"`
		}

		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		fmt.Println(data.Coin)
		if data.Coin == "battle" {
			num := RandInt()

			w.Header().Set("Content-Type", "application/json")
			if err := json.NewEncoder(w).Encode(num); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)

			}
		}
		if data.Coin == "lose" {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode("okey")
		}
		if data.Coin == "win" {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode("win")
		}

	})
}

func RandInt() int {
	return rand.Intn(50) + 1
}

func (g *myGame) newId(collection *mongo.Collection) int {

	okey, err := collection.Find(context.Background(), bson.D{})
	if err != nil {
		panic(err)
	}

	var plr []player.Player
	err = okey.All(context.Background(), &plr)
	if err != nil {
		panic(err)
	}
	for range plr {
		if len(plr) > 0 {
			lastElement := plr[len(plr)-1]

			NUM = lastElement.Id + 1
		}

	}
	return NUM

}
