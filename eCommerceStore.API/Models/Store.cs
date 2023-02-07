using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace eCommerceStore.API.Models;

public class Store
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public virtual ICollection<Product> Products { get; set; }
    public virtual ICollection<User> Users { get; set; }
}






   

