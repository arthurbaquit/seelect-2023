package main

import (
	"log"
	"os"

	"github.com/arthurbaquit/seelect-2023/adapters/db"
	"github.com/arthurbaquit/seelect-2023/adapters/web/server"
	"github.com/arthurbaquit/seelect-2023/app"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
	port := os.Getenv("DB_PORT")
	url := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	dbname := os.Getenv("DB_NAME")
	sslmode := os.Getenv("DB_SSLMODE")

	str := "host=" + url + " port=" + port + " user=" + user + " dbname=" + dbname + " password=" + password + " sslmode=" + sslmode
	database, err := gorm.Open(postgres.Open(str), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	productDb := db.NewProductDB(database)
	productService := app.ProductService{ProductPersistence: productDb}
	server := server.NewWebServer(productService)
	server.Serve()
}
