using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace eCommerceStore.API.Helper;

public class TokenService
{
    public static string CreateAccessToken(int id, string accesskey)
    {
        List<Claim> claims = new List<Claim>()
        {
            new Claim(ClaimTypes.NameIdentifier, id.ToString()),
        };
        
        SymmetricSecurityKey? key = new(Encoding.UTF8.GetBytes(accesskey));
        SigningCredentials? creds = new(key, SecurityAlgorithms.HmacSha256);
        JwtSecurityToken? token = new(claims: claims, notBefore: DateTime.Now, 
            expires: DateTime.Now.AddSeconds(30), signingCredentials: creds);
        
        string? jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }
    
    public static string CreateRefreshToken(int id, string refreshkey)
    {
        List<Claim> claims = new List<Claim>()
        {
            new Claim(ClaimTypes.NameIdentifier, id.ToString()),
        };

        SymmetricSecurityKey? key = new(Encoding.UTF8.GetBytes(refreshkey));
        SigningCredentials? creds = new(key, SecurityAlgorithms.HmacSha256);
        JwtSecurityToken? token = new(claims: claims, notBefore: DateTime.Now, 
            expires: DateTime.Now.AddDays(7), signingCredentials: creds);
        
        string? jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }
}