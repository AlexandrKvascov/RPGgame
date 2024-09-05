package migrations

import (
	"context"
	"fmt"

	"github.com/mygame/config/Auth"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func FindPlayerByLoginAndPassword(userCollect *mongo.Collection, login, password string) (string, error) {
	filter := bson.M{"login": login, "password": password}
	var user Auth.Auth
	err := userCollect.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		fmt.Println("Error finding player:", err)
		return "nil", err
	}

	return user.Id, nil
}

func CreateUser(user *mongo.Collection, login, password, userPlayers string) {
	newUser := Auth.Auth{Id: userPlayers, Login: login, Password: password}
	_, err := user.InsertOne(context.Background(), newUser)
	if err != nil {
		fmt.Println("Error creating user:", err)
	}
}
