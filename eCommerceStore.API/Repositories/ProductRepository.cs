using eCommerceStore.API.Data;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;

namespace eCommerceStore.API.Repositories;

public class ProductRepository : IProductsRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public ICollection<Product> GetProducts()
    {
        return _context.Products.ToList();
    }

    public Product GetProduct(int productId)
    {
        return _context.Products.Where(x => x.Id == productId).FirstOrDefault();
    }

    public bool ProductExists(int productId)
    {
        return _context.Products.Any(x => x.Id == productId);
    }

    public bool CreateProduct(Product product)
    {
        _context.Add(product);
        return Save();
    }

    public bool UpdateProduct(Product product)
    {
        _context.Update(product);
        return Save();
    }

    public bool DeleteProduct(Product product)
    {
        _context.Remove(product);
        return Save();
    }

    public bool Save()
    {
        var saved = _context.SaveChanges();
        return saved > 0 ? true : false;
    }
}