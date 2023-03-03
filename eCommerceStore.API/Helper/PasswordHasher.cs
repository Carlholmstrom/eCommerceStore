using BCrypt.Net;

namespace eCommerceStore.API.Helper
{
    public static class PasswordHasher
    {
        private const int WorkFactor = 10;

        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, WorkFactor);
        }

        public static bool VerifyPassword(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }
}
