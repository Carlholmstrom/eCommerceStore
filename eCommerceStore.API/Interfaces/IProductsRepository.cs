using eCommerceStore.API.Models;

namespace eCommerceStore.API.Interfaces;

public interface IProductsRepository
{
    ICollection<Product> GetProducts();
    Product GetProduct(int productId);
    bool ProductExists(int productId);
    bool CreateProduct (Product product);
    bool UpdateProduct(Product product);
    bool DeleteProduct(Product product);
    bool Save();
}