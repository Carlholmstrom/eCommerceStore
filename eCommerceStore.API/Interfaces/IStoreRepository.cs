using eCommerceStore.API.Dto;
using eCommerceStore.API.Models;

namespace eCommerceStore.API.Interfaces;

public interface IStoreRepository
{
    Task<IEnumerable<Store>> GetAllAsync();

    Task<Store> GetAsync(int id);
    Task<IEnumerable<Product>> GetStoreProductsAsync(int storeId);
    Task<Product> AddProductToStoreAsync(int storeId, ProductCreateDto productDto);
    Task<Product> DeleteProductFromStoreAsync(int storeId, int productId);


    Task<Store> AddAsync(Store store);

    Task<Store> DeleteAsync(int id);

    Task<Store> UpdateAsync(int id, Store store);
    bool StoreExists(int id);
}