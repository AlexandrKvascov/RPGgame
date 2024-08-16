package walk

type Activity struct {
}

func (a *Activity) HandleInput(input string) (string, string) {

	var name string
	var desc string
	switch string(input) {
	case "n":
		name = "Northern location"
		desc = "You are in the north."
		return name, desc
	case "s":
		name = "Southern location"
		desc = "You are in the south."
		return name, desc
	case "e":
		name = "Eastern location"
		desc = "You are in the east."
		return name, desc
	case "w":
		name = "Western location"
		desc = "You are in the west."
		return name, desc
	default:
		return "", ""

	}
}
