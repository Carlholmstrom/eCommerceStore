using System.Security.Cryptography;
using System.Text;

namespace eCommerceStore.API.Helper;

public static class PasswordHasher
{
    private const int SaltLength = 16;

    public static string HashPassword(string password)
    {
        // Generate a random salt
        byte[] salt = new byte[SaltLength];
        using RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
        rng.GetBytes(salt);

        // Concatenate the salt and the password
        byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
        byte[] saltedPasswordBytes = new byte[salt.Length + passwordBytes.Length];
        Array.Copy(salt, 0, saltedPasswordBytes, 0, salt.Length);
        Array.Copy(passwordBytes, 0, saltedPasswordBytes, salt.Length, passwordBytes.Length);

        // Hash the salted password
        using SHA256 sha256 = SHA256.Create();
        byte[] hashedBytes = sha256.ComputeHash(saltedPasswordBytes);
        
        // Combine the salt and the hashed password
        byte[] saltedHashedBytes = new byte[salt.Length + hashedBytes.Length];
        Array.Copy(salt, 0, saltedHashedBytes, 0, salt.Length);
        Array.Copy(hashedBytes, 0, saltedHashedBytes, salt.Length, hashedBytes.Length);

        // Convert the salted and hashed password to a string
        string hashedPassword = Convert.ToBase64String(saltedHashedBytes);
        return hashedPassword;
    }
}
