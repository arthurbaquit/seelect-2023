package db

import (
	"errors"

	app "github.com/arthurbaquit/seelect-2023/app"
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type ProductDB struct {
	db *gorm.DB
}

func NewProductDB(db *gorm.DB) *ProductDB {
	return &ProductDB{db}
}

func (pdb *ProductDB) Get(id string) (app.ProductInterface, error) {
	var product app.Product
	err := pdb.db.Where("id = ?", id).First(&product).Error
	if err != nil {
		return nil, err
	}
	return &product, err
}

func (pdb *ProductDB) create(product app.ProductInterface) error {

	newProduct := app.Product{
		Id:          uuid.Must(uuid.NewV4()).String(),
		Status:      product.GetStatus(),
		Name:        product.GetName(),
		Price:       product.GetPrice(),
		Description: product.GetDescription(),
	}
	return pdb.db.Save(&newProduct).Error
}

func (pdb *ProductDB) update(product app.ProductInterface) error {
	return pdb.db.Save(&product).Error
}

func (pdb *ProductDB) Save(product app.ProductInterface) (app.ProductInterface, error) {
	_, err := pdb.Get(product.GetId())
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			err = pdb.create(product)
			if err != nil {
				return nil, err
			}
			return product, err
		}
		return nil, err
	}
	err = pdb.update(product)
	if err != nil {
		return nil, err
	}

	return product, nil
}

func (pdb *ProductDB) GetAll() ([]app.ProductInterface, error) {
	var products []app.Product
	err := pdb.db.Find(&products).Error
	if err != nil {
		return nil, err
	}
	var productInterfaces []app.ProductInterface
	for i, _ := range products {
		productInterfaces = append(productInterfaces, &products[i])
	}
	return productInterfaces, nil
}

// type ProductReaderInterface interface {
// 	Get(id string) (ProductInterface, error)
// }

// type ProductWriterInterface interface {
// 	Save(product ProductInterface) (ProductInterface, error)
// }
