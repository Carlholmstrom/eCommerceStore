using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerceStore.API.Models;

public class User
{
    public int Id { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Role { get; set; }
    public int StoreId { get; set; }
    [NotMapped]
    public string StoreName { get; set; }
    [NotMapped]
    public List<string> Roles { get; set; }
    public virtual Store Store { get; set; }

    public List<User_Role> UserRoles { get; set; }
}



