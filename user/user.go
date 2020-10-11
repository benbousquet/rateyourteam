package user

import (
	"github.com/benbousquet/rateyourteam/database"
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
)

// User model
type User struct {
	gorm.Model
	Name     string `json:"name"`
	Uplike   int    `json:"uplike"`
	Downlike int    `json:"downlike"`
}

// GetUsers returns all users
func GetUsers(c *fiber.Ctx) {
	var users []User
	database.DBConn.Find(&users)
	c.JSON(users)
}

// GetUser returns user with parameter id
func GetUser(c *fiber.Ctx) {
	var user User
	id := c.Params("id")
	database.DBConn.First(&user, "name = ?", id)
	if user.Name == "" {
		c.Status(500).Send("Cannot find user with the ID of ", id)
		return
	}
	c.JSON(user)
}

// UplikeUser adds one to a users uplikes
func UplikeUser(c *fiber.Ctx) {
	var user User
	id := c.Params("id")
	database.DBConn.First(&user, "name = ?", id)

	database.DBConn.Model(&user).Update("Uplike", (user.Uplike + 1))
	c.JSON(user)

}

// DownlikeUser adds one to a users downlikes
func DownlikeUser(c *fiber.Ctx) {
	var user User
	id := c.Params("id")
	database.DBConn.First(&user, "name = ?", id)

	database.DBConn.Model(&user).Update("Downlike", (user.Downlike + 1))
	c.JSON(user)
}

// NewUser creates and returns new user
func NewUser(c *fiber.Ctx) {
	// create new user
	user := new(User)
	// put post req body onto user struct
	if err := c.BodyParser(user); err != nil {
		c.Status(503).Send(err)
		return
	}
	// put into db
	database.DBConn.Create(&user)
	c.JSON(user)
}
