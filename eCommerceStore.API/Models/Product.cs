using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerceStore.API.Models;


public class Product
{
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    [Required]
    public string Price { get; set; }
    [Required]
    public int Quantity { get; set; }
    public string Category { get; set; }
    public int StoreId { get; set; }
    public virtual Store Store { get; set; }
}



// public class Product
// {
//     public int Id { get; set; }
//     [Required]
//     public string Title { get; set; }
//     [Required]
//     public string Description { get; set; }
//     public string ImageUrl { get; set; }
//     [Required]
//     public int StoreId { get; set; }
//     public virtual Store Store { get; set; }
//     [Required]
//     public decimal Price { get; set; }
//     [Required]
//     public int Quantity { get; set; }
//     public string Category { get; set; }
// }


