using System.ComponentModel.DataAnnotations;

namespace eCommerceStore.API.Dto;

public class RegisterDto
{
    //public int Id { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; } = default!;
    [Required]
    public string Password { get; set; } = default!;
    [Required]
    public string Role { get; set; } = default!;

    public int StoreId { get; set; }
}
