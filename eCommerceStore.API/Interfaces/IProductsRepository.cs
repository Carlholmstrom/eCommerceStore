using eCommerceStore.API.Models;

namespace eCommerceStore.API.Interfaces;

public interface IProductsRepository
{
    Task<IEnumerable<Product>> GetAllAsync();

    Task<Product> GetAsync(int id);

    Task<Product> AddAsync(Product product);

    Task<Product> DeleteAsync(int id);

    Task<Product> UpdateAsync(int id, Product product);
}