namespace eCommerceStore.API.Dto.Outgoing;

public class UserDto
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
    public int? StoreId { get; set; }
}


