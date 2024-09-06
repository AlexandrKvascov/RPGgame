package main

import (
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	_ "github.com/lib/pq"
	"github.com/mygame/activity/battle"
	"github.com/mygame/activity/walk"
	"github.com/mygame/config"
	"github.com/mygame/config/location"
	"github.com/mygame/config/player"
	"github.com/mygame/migrations"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type myGame struct {
	config   config.GameData
	location location.Location
	player   player.Player
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
	db := client.Database("myGame")
	src := rand.NewSource(time.Now().UnixNano())
	r := rand.New(src)
	timestamp := strconv.FormatInt(time.Now().UnixNano(), 10)
	randomInt := strconv.FormatInt(r.Int63(), 10)
	UserPlayers := "user" + timestamp + "-" + randomInt
	userCollect, collection := migrations.InitDB(db)
	defer cancel()

	go g.HandleRegistr(&userCollect, UserPlayers)
	go g.HandleAuth(&userCollect)
	go g.HandleInputName(&collection)
	go g.initPlayer(&collection)
	go g.HandleMove(&collection)
	go g.Handlefight(&collection)
	go g.HandleBattle(&collection)
	go g.newLvlPlayer(&collection)
	go g.HandleLoadPlayer(&collection)
	go g.HandlerLifeMin(&collection)
	go g.HandleRelif(&collection)

	fmt.Println("Сервер запущен на порту 8080")
	err = http.ListenAndServe(":8080", corsMiddleware(http.DefaultServeMux))
	if err != nil {
		fmt.Println("Ошибка запуска сервера:", err)
	}

}

func (g *myGame) HandleAuth(userCollect *mongo.Collection) {
	http.HandleFunc("/auth", func(w http.ResponseWriter, r *http.Request) {
		var data struct {
			Login    string `json:"username"`
			Password string `json:"password"`
		}
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		id, err := migrations.FindPlayerByLoginAndPassword(userCollect, data.Login, data.Password)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		} else {

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(id)
		}
	})
}

func (g *myGame) HandleRegistr(userCollect *mongo.Collection, userPlayers string) {
	http.HandleFunc("/registr", func(w http.ResponseWriter, r *http.Request) {
		var data struct {
			Login    string `json:"login"`
			Password string `json:"password"`
		}
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var resReg [2]string
		resReg[0] = data.Login
		resReg[1] = userPlayers
		migrations.CreateUser(userCollect, data.Login, data.Password, userPlayers)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resReg)
	})
}

func (g *myGame) HandleLoadPlayer(collection *mongo.Collection) {
	http.HandleFunc("/load", func(w http.ResponseWriter, r *http.Request) {
		userCode := r.URL.Query().Get("user")
		player, err := migrations.ReadAllPlayer(collection, userCode)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		} else {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(player)
		}
	})
}

func (g *myGame) HandleInputName(collection *mongo.Collection) {

	http.HandleFunc("/newgame", func(w http.ResponseWriter, r *http.Request) {

		var data struct {
			Name   string `json:"name"`
			UserId string `json:"userId"`
		}
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		player := migrations.CreatePlayer(collection, NUM, data.Name, data.UserId)
		NUM = player.Id
		g.config.Player.Id = player.Id

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(g.config.Player.Id)

	})

}

func (g *myGame) HandleMove(collection *mongo.Collection) {
	http.HandleFunc("/move", func(w http.ResponseWriter, r *http.Request) {
		direction := r.URL.Query().Get("direction")
		a := &walk.Activity{}
		name, description := a.HandleInput(direction)
		var local []string = []string{name, description}
		json.NewEncoder(w).Encode(local)
	})
}

func (g *myGame) Handlefight(collection *mongo.Collection) {
	http.HandleFunc("/battle", func(w http.ResponseWriter, r *http.Request) {
		playerId := r.URL.Query().Get("playerID")
		playId, err := strconv.Atoi(playerId)
		state, err := battle.TakeNpc(collection, playId)

		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(w).Encode(state)

	})
}

func (g *myGame) HandleBattle(collection *mongo.Collection) {

	http.HandleFunc("/getbattle", func(w http.ResponseWriter, r *http.Request) {
		var data struct {
			Coin string `json:"coin"`
		}

		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		if data.Coin == "battle" {
			num := rand.Intn(95) + 1

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

func (g *myGame) newLvlPlayer(collection *mongo.Collection) {
	http.HandleFunc("/newLvl", func(w http.ResponseWriter, r *http.Request) {

		var data struct {
			EnemyId   int `json:"EnemyId"`
			ExpNewLvl int `json:"ExpNewLvl"`
			MeExp     int `json:"MeExp"`
			PlayerId  int `json:"playerId"`
		}

		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		migrations.UpdateLvlPlayer(collection, data.EnemyId, data.ExpNewLvl, data.MeExp)
		migrations.DeadNpc(collection, data.EnemyId, data.PlayerId)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode("win")
	})

}

func (g *myGame) initPlayer(collection *mongo.Collection) {
	http.HandleFunc("/initPlayer", func(w http.ResponseWriter, r *http.Request) {
		player := r.URL.Query().Get("player")
		playerId, err := strconv.Atoi(player)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		PlayerStatus := migrations.ReadInitPlayer(collection, playerId)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(PlayerStatus)
	})
}

func (g *myGame) HandlerLifeMin(collection *mongo.Collection) {
	http.HandleFunc("/lifeMin", func(w http.ResponseWriter, r *http.Request) {
		player := r.URL.Query().Get("player")
		playerId, err := strconv.Atoi(player)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		migrations.UpdateLifeMin(collection, playerId)

	})
}

func (g *myGame) HandleRelif(collection *mongo.Collection) {
	http.HandleFunc("/relife", func(w http.ResponseWriter, r *http.Request) {
		player := r.URL.Query().Get("player")
		playerId, err := strconv.Atoi(player)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		migrations.UpdateRelif(collection, playerId)

	})
}
