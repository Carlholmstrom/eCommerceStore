using System.ComponentModel.DataAnnotations;

namespace eCommerceStore.API.Dto.Incoming;

public class RegisterDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = default!;
    [Required]
    public string Password { get; set; } = default!;
    [Required]
    public string Role { get; set; } = default!;

    public int StoreId { get; set; }
}
