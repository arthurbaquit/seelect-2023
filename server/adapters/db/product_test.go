package db

import (
	"fmt"
	"log"
	"testing"

	app "github.com/arthurbaquit/seelect-2023/app"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/require"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

const dbSource = "file::memory:"

func setup() *gorm.DB {
	db, err := gorm.Open(sqlite.Open(dbSource), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}
	createTableProduct(db)
	createMockProducts(db)
	fmt.Println("setup")
	return db
}

func createTableProduct(Db *gorm.DB) {
	table := `CREATE TABLE products (
	id TEXT PRIMARY KEY,
	name TEXT,
	price INTEGER,
	status TEXT,
	description TEXT
)`
	err := Db.Exec(table).Error
	if err != nil {
		log.Fatal(err)
		// panic(err)
	}
}

func createMockProducts(Db *gorm.DB) {
	insert := `INSERT INTO products (id, name, price, status, description) VALUES ("123", "test", 0, "disabled", "short description")`
	err := Db.Exec(insert).Error
	if err != nil {
		log.Fatal(err)
		// panic(err)
	}
}

func TestProductDb_Get(t *testing.T) {
	DB := setup()
	productDb := NewProductDB(DB)
	product, err := productDb.Get("123")
	require.Equal(t, nil, err)
	require.NotNil(t, product)
	require.Equal(t, "123", product.GetId())
	require.Equal(t, "test", product.GetName())
	require.Equal(t, int64(0), product.GetPrice())
	require.Equal(t, "disabled", product.GetStatus())
	require.Equal(t, "short description", product.GetDescription())
}

func TestProductDb_Save(t *testing.T) {
	DB := setup()
	productDb := NewProductDB(DB)
	fmt.Println(productDb)
	product, err := productDb.Save(&app.Product{
		Id:          "1234",
		Name:        "testing create",
		Price:       10,
		Status:      "enabled",
		Description: "testing description",
	})
	require.Equal(t, nil, err)
	require.NotNil(t, product)
	require.Equal(t, "1234", product.GetId())
	require.Equal(t, "testing create", product.GetName())
	require.Equal(t, int64(10), product.GetPrice())
	require.Equal(t, "enabled", product.GetStatus())
	require.Equal(t, "testing description", product.GetDescription())

	product, err = productDb.Save(&app.Product{
		Id:          "1234",
		Name:        "testing update",
		Price:       100,
		Status:      "disabled",
		Description: "testing description update",
	})
	require.Equal(t, nil, err)
	require.NotNil(t, product)
	require.Equal(t, "1234", product.GetId())
	require.Equal(t, "testing update", product.GetName())
	require.Equal(t, int64(100), product.GetPrice())
	require.Equal(t, "disabled", product.GetStatus())
	require.Equal(t, "testing description update", product.GetDescription())
}

func TestProductDb_GetAll(t *testing.T) {
	DB := setup()
	productDb := NewProductDB(DB)
	products, err := productDb.GetAll()
	require.Equal(t, nil, err)
	require.NotNil(t, products)
	require.Equal(t, 1, len(products))
}
