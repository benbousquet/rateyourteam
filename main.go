package main

import (
	"fmt"
	"os"

	"github.com/benbousquet/rateyourteam/database"
	"github.com/benbousquet/rateyourteam/user"
	"github.com/gofiber/cors"
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
)

func initDatabase() {
	var err error
	godotenv.Load()
	dbInfo := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable", os.Getenv("db_host"), os.Getenv("db_port"), os.Getenv("db_user"), os.Getenv("db_name"), os.Getenv("db_pass"))
	database.DBConn, err = gorm.Open("postgres", dbInfo)
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

	app.Static("/", "./client/build")
}

func main() {
	app := fiber.New()

	app.Use(cors.New())

	initDatabase()
	defer database.DBConn.Close()

	setup(app)

	app.Listen(":80")
}
