package main

import (
	"fmt"

	"github.com/benbousquet/rateyourteam/database"
	"github.com/benbousquet/rateyourteam/user"
	"github.com/gofiber/cors"
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
)

func initDatabase() {
	var err error
	database.DBConn, err = gorm.Open("postgres", "host=localhost port=5432 user=postgres dbname=rateyourteam password=postgres sslmode=disable")
	if err != nil {
		panic(err)
	}
	fmt.Println("Database connected")

	database.DBConn.AutoMigrate(&user.User{})
}

func setup(app *fiber.App) {
	api := app.Group("/api/v1")

	// GET /users returns all tasks
	api.Get("/users", user.GetUsers)

	// GET /user/:id returns single task with id
	api.Get("/user/:id", user.GetUser)

	// POST /user add a user
	api.Get("/uplike/:id", user.UplikeUser)

	// POST /user downlike a user
	api.Get("/downlike/:id", user.DownlikeUser)

	// POST /user add a user
	api.Post("/user", user.NewUser)
}

func main() {
	app := fiber.New()

	app.Use(cors.New())

	initDatabase()
	defer database.DBConn.Close()

	setup(app)

	app.Listen(":3001")
}
