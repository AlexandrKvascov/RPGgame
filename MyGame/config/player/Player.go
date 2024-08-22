package player

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type Player struct {
	Id       int
	Name     string
	Health   int
	Strenght int
	Lvl      int
	Hp       int
	Exp      int
}

func (p *Player) NewName() string {
	var input string
	fmt.Println("Enter your name: ")
	fmt.Scanln(&input)
	fmt.Println("Welcome  " + input)
	return input

}
func (p *Player) DbPlayer(db *sql.DB, id int) ([]Player, error) {
	var table []Player
	query := "SELECT id, name, health, strenght, lvl, hp FROM players WHERE id = $1"
	rows, err := db.Query(query, id+1)
	if err != nil {
		return nil, err
	}
	defer rows.Close() // don't forget to close the rows

	for rows.Next() {
		var player Player
		err := rows.Scan(&player.Id, &player.Name, &player.Health, &player.Strenght, &player.Lvl, &player.Hp)
		if err != nil {
			return nil, err
		}
		table = append(table, player)
	}
	fmt.Println(table)
	return table, nil
}
