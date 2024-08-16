package migrations

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func migrate(db *mongo.Database) error {
	// Create a new collection if it doesn't exist
	if _, err := db.Collection("players").Indexes().CreateOne(context.Background(), mongo.IndexModel{
		Keys: bson.M{"name": 1},
	}); err != nil {
		return err
	}

	// Add a new field to the players collection
	if _, err := db.Collection("players").UpdateMany(context.Background(), bson.M{}, bson.M{"$set": bson.M{"newField": "defaultValue"}}); err != nil {
		return err
	}

	return nil
}
