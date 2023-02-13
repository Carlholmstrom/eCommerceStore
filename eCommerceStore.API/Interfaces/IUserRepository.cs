using eCommerceStore.API.Dto;
using eCommerceStore.API.Models;

namespace eCommerceStore.API.Interfaces;

public interface IUserRepository
{
    Task<User> AuthenticateAsync(string email, string password);
    Task<IEnumerable<UserDto>> GetAllUsersWithStoreNameAsync();
    Task<List<User>> GetAllAsync();

    Task<User> GetAsync(int id);

    Task<User> AddAsync(User user);

    Task<User> DeleteAsync(int id);

    Task<User> UpdateAsync(int id, User user);

    bool UserExists(int id);
}