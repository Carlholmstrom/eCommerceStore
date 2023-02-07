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
    public virtual Store Store { get; set; }
}



// public class User
// {
//     public int Id { get; set; }
//     [Required]
//     [EmailAddress]
//     public string Email { get; set; }
//     [Required]
//     public string Password { get; set; }
//     [Required]
//     [NotMapped]
//     public List<string> Role { get; set; }
//     public int StoreId { get; set; }
//     public virtual Store Store { get; set; }
// }

