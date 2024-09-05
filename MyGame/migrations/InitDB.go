package migrations

import (
	"go.mongodb.org/mongo-driver/mongo"
)

func InitDB(db *mongo.Database) (mongo.Collection, mongo.Collection) {

	collection := db.Collection("players")

	userCollect := db.Collection("User")
	return *userCollect, *collection
}
