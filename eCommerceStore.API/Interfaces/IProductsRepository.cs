using eCommerceStore.API.Dto;
using eCommerceStore.API.Models;

namespace eCommerceStore.API.Interfaces;

public interface IProductsRepository
{
    Task<IEnumerable<Product>> GetAllAsync();

    //Task<IEnumerable<Product>> GetAllAsync(int page, int pageSize);
    Task<Product> GetAsync(int id);
    Task<Product> UpdateQuantityAsync(int id, int newQuantity);

    Task<Product> AddAsync(Product product);

    Task<Product> DeleteAsync(int id);


    bool ProductExists(int id);
}