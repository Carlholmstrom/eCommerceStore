using System.Security.Cryptography;
using System.Text;

namespace eCommerceStore.API.Helper;

public static class PasswordHasher
{
    private const int SaltLength = 16;

    public static string HashPassword(string password)
    {
        byte[] salt = new byte[SaltLength];
        using RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
        rng.GetBytes(salt);

        byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
        byte[] saltedPasswordBytes = new byte[salt.Length + passwordBytes.Length];
        Array.Copy(salt, 0, saltedPasswordBytes, 0, salt.Length);
        Array.Copy(passwordBytes, 0, saltedPasswordBytes, salt.Length, passwordBytes.Length);

        using SHA256 sha256 = SHA256.Create();
        byte[] hashedBytes = sha256.ComputeHash(saltedPasswordBytes);
        
        byte[] saltedHashedBytes = new byte[salt.Length + hashedBytes.Length];
        Array.Copy(salt, 0, saltedHashedBytes, 0, salt.Length);
        Array.Copy(hashedBytes, 0, saltedHashedBytes, salt.Length, hashedBytes.Length);

        string hashedPassword = Convert.ToBase64String(saltedHashedBytes);
        return hashedPassword;
    }
}
