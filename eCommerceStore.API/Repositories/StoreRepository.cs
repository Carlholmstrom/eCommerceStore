using eCommerceStore.API.Data;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;

namespace eCommerceStore.API.Repositories;

public class StoreRepository : IStoreRepository
{
    private readonly AppDbContext _context;

    public StoreRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public ICollection<Store> GetStores()
    {
        return _context.Stores.ToList();
    }

    public Store GetStore(int storeId)
    {
        return _context.Stores.Where(x => x.Id == storeId).FirstOrDefault();
    }

    public bool StoreExists(int storeId)
    {
        return _context.Stores.Any(x => x.Id == storeId);
    }

    public bool CreateStore(Store store)
    {
        _context.Add(store);
        return Save();
    }

    public bool UpdateStore(Store store)
    {
        _context.Update(store);
        return Save();
    }

    public bool DeleteStore(Store store)
    {
        _context.Remove(store);
        return Save();
    }

    public bool Save()
    {
        var saved = _context.SaveChanges();
        return saved > 0 ? true : false;
    }
}