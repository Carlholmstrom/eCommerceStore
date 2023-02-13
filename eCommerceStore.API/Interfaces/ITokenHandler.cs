using eCommerceStore.API.Models;

namespace eCommerceStore.API.Interfaces;

public interface ITokenHandler
{
    Task<string>CreateTokenAsync(User user);
}