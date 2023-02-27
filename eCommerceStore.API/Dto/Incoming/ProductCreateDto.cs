using System.ComponentModel.DataAnnotations;

namespace eCommerceStore.API.Dto.Incoming;

public class ProductCreateDto
{
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
}