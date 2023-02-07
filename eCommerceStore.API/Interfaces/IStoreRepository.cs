using eCommerceStore.API.Models;

namespace eCommerceStore.API.Interfaces;

public interface IStoreRepository
{
    ICollection<Store> GetStores();
    Store GetStore(int storeId);
    bool StoreExists(int storeId);
    bool CreateStore (Store store);
    bool UpdateStore(Store store);
    bool DeleteStore(Store store);
    bool Save();
}