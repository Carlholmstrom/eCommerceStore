using eCommerceStore.API.Data;
using eCommerceStore.API.Dto;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace eCommerceStore.API.Repositories;

public class ProductRepository : IProductsRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await _context.Products.ToListAsync();
    }

    public async Task<Product> GetAsync(int id)
    {
        return await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Product> UpdateQuantityAsync(int id, int newQuantity)
    {
        var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

        if (product == null)
        {
            return null;
        }

        product.Quantity = newQuantity;
        await _context.SaveChangesAsync();

        return product;
    }


    public async Task<Product> AddAsync(Product product)
    {
        await _context.AddAsync(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product> DeleteAsync(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

        if (product == null)
        {
            return null;
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return product;

    }

    public bool ProductExists(int id)
    {
        return _context.Products.Any(x => x.Id == id);
    }
}