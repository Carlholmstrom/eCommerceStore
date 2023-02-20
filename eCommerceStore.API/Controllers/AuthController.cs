using eCommerceStore.API.Dto;
using eCommerceStore.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace eCommerceStore.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : Controller
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenHandler _tokenHandler;

    public AuthController(IUserRepository userRepository, ITokenHandler tokenHandler)
    {
        _userRepository = userRepository;
        _tokenHandler = tokenHandler;
    }
    
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> LoginAsync(LoginDto loginDto)
    {
        if (loginDto == null)
        {
            return BadRequest("Please provide valid credentials");
        }
        var user = await _userRepository.AuthenticateAsync(
            loginDto.Email, loginDto.Password);

        if (user != null)
        {
            var token =  await _tokenHandler.CreateTokenAsync(user);
            return Ok(token);
        }

        return BadRequest("Email and/or Password is incorrect");
    }
}