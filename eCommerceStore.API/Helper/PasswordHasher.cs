using System.Security.Cryptography;
using System.Text;

namespace eCommerceStore.API.Helper;

public static class PasswordHasher
{
    public static string HashPassword(string password)
    {
        using SHA256 sha256 = SHA256.Create();
        byte[] hasedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        string hashedPassword = BitConverter.ToString(hasedBytes).Replace("-", "").ToLower();
        return hashedPassword;
    }
}