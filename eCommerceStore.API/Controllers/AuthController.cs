using eCommerceStore.API.Dto.Incoming;
using eCommerceStore.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace eCommerceStore.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenHandler _tokenHandler;

        public AuthController(IUserRepository userRepository, ITokenHandler tokenHandler)
        {
            _userRepository = userRepository;
            _tokenHandler = tokenHandler;
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginDto loginDto)
        {
            var user = await _userRepository.AuthenticateAsync(loginDto.Email, loginDto.Password);

            if (user == null)
            {
                return BadRequest("Email and/or Password is incorrect");
            }

            var token = await _tokenHandler.CreateTokenAsync(user);
            return Ok(token);
        }
    }
}
