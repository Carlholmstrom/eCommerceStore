using System.ComponentModel.DataAnnotations;

namespace eCommerceStore.API.Dto;

public class ProductCreateDto
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
}