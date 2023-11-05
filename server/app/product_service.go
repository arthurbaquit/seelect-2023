package app

type ProductService struct {
	ProductPersistence ProductPersistenceInterface
}

func (s ProductService) Get(id string) (ProductInterface, error) {
	product, err := s.ProductPersistence.Get(id)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (s ProductService) CreateProduct(name, description string, price int64) (ProductInterface, error) {
	product := newProduct()
	product.Name = name
	product.Price = price
	product.Description = description
	if ok, err := product.IsValid(); !ok {
		return nil, err
	}
	result, err := s.ProductPersistence.Save(product)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (s ProductService) EnableProduct(product ProductInterface) (ProductInterface, error) {
	if err := product.Enable(); err != nil {
		return nil, err
	}
	result, err := s.ProductPersistence.Save(product)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (s ProductService) DisableProduct(product ProductInterface) (ProductInterface, error) {
	if err := product.Disable(); err != nil {
		return nil, err
	}
	result, err := s.ProductPersistence.Save(product)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (s ProductService) GetAll() ([]ProductInterface, error) {
	products, err := s.ProductPersistence.GetAll()
	if err != nil {
		return nil, err
	}
	return products, nil
}
