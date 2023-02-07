using eCommerceStore.API.Data;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;

namespace eCommerceStore.API.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }
    public ICollection<User> GetUsers()
    {
        return _context.Users.ToList();
    }

    public User GetUser(int userId)
    {
        return _context.Users.Where(x => x.Id == userId).FirstOrDefault();
    }

    public bool UserExists(int userId)
    {
        return _context.Users.Any(x => x.Id == userId);
    }

    public bool CreateUser(User user)
    {
        _context.Add(user);
        return Save();
    }

    public bool UpdateUser(User user)
    {
        _context.Update(user);
        return Save();
    }

    public bool DeleteUser(User user)
    {
        _context.Remove(user);
        return Save();
    }

    public bool Save()
    {
        var saved = _context.SaveChanges();
        return saved > 0 ? true : false;
    }
}