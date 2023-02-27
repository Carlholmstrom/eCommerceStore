using eCommerceStore.API.Data;
using eCommerceStore.API.Dto;
using eCommerceStore.API.Dto.Incoming;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace eCommerceStore.API.Repositories;

public class StoreRepository : IStoreRepository
{
    private readonly AppDbContext _context;

    public StoreRepository(AppDbContext context)
    {
        _context = context;
    }


    public async Task<IEnumerable<Store>> GetAllAsync()
    {
        return await _context.Stores.ToListAsync();
    }

    public async Task<Store> GetAsync(int id)
    {
        return await _context.Stores.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<Product>> GetStoreProductsAsync(int storeId)
    {
        return await _context.Products.Where(x => x.StoreId == storeId).ToListAsync();
    }

    public async Task<Product> AddProductToStoreAsync(int storeId, ProductCreateDto productDto)
    {
        var product = new Product
        {
            Title = productDto.Title,
            Description = productDto.Description,
            ImageUrl = productDto.ImageUrl,
            Price = productDto.Price,
            Quantity = productDto.Quantity,
            Category = productDto.Category,
            StoreId = storeId
        };

        await _context.AddAsync(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product> DeleteProductFromStoreAsync(int storeId, int productId)
    {
        var product = await _context.Products.FirstOrDefaultAsync(x => x.StoreId == storeId && x.Id == productId);

        if (product == null)
        {
            return null;
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return product;
    }



    public async Task<Store> AddAsync(Store store)
    {
        await _context.AddAsync(store);
        await _context.SaveChangesAsync();
        return store;
    }

    public async Task<Store> DeleteAsync(int id)
    {
        var store = await _context.Stores.FirstOrDefaultAsync(x => x.Id == id);

        if (store == null)
        {
            return null;
        }

        _context.Stores.Remove(store);
        await _context.SaveChangesAsync();
        return store;

    }

    public async Task<Store> UpdateAsync(int id, Store store)
    {
        var existingStore = await _context.Stores.FirstOrDefaultAsync(x => x.Id == id);

        if (existingStore  == null)
        {
            return null;
        }

        existingStore.Id = store.Id;
        existingStore.Name = store.Name;
        
        await _context.SaveChangesAsync();

        return existingStore;
    }

    public bool StoreExists(int id)
    {
            return _context.Stores.Any(x => x.Id == id);
    }
}