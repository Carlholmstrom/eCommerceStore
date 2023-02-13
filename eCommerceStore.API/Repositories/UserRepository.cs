using eCommerceStore.API.Data;
using eCommerceStore.API.Dto;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace eCommerceStore.API.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User> AuthenticateAsync(string email, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(
            x => x.Email.ToLower() == email.ToLower() && x.Password == password);

        if (user == null)
        {
            return null;
        }

        var userRoles = await _context.UsersRoles.Where(x => x.UserId == user.Id).ToListAsync();

        if (userRoles.Any())
        {
            user.Roles = new List<string>();
            foreach (var userRole in userRoles)
            {
                var role = await _context.Roles.FirstOrDefaultAsync(x => x.Id == userRole.RoleId);
                if (role != null)
                {
                    user.Roles.Add(role.Name);
                }
            }
        }

        user.Password = null;
        return user;
    }

    public async Task<IEnumerable<UserDto>> GetAllUsersWithStoreNameAsync()
    {
        return await _context.Users
            .Include(x => x.Store)
            .Select(x => new UserDto()
            {
                Email = x.Email,
                Role = x.Role,
                StoreName = x.Store.Name
            })
            .ToListAsync();
    }

    public async Task<List<User>> GetAllAsync()
    {
        return await _context.Users.ToListAsync();
    }


    public Task<User> GetAsync(int id)
    {
        throw new NotImplementedException();
    }


    // public async Task<User> GetAsync(int id)
    // {
    //     return await _context.Users
    //         .FirstOrDefaultAsync(x => x.Id == id);
    // }

    public async Task<User> AddAsync(User user)
    {
        await _context.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> DeleteAsync(int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

        if (user == null)
        {
            return null;
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateAsync(int id, User user)
    {
        throw new NotImplementedException();
    }

    public bool UserExists(int id)
    {
        return _context.Users.Any(x => x.Id == id);
    }
}