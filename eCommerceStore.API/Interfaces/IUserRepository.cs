using eCommerceStore.API.Dto;
using eCommerceStore.API.Dto.Outgoing;
using eCommerceStore.API.Models;

namespace eCommerceStore.API.Interfaces;

public interface IUserRepository
{
    Task<User> AuthenticateAsync(string email, string password);
    Task<List<User>> GetAllAsync();
    Task<User> GetUserByEmail(string email);

    Task<User> GetAsync(int id);

    Task<User> AddAsync(User user);

    Task<User> DeleteAsync(int id);

    bool UserExists(int id);
}