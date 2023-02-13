using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eCommerceStore.API.Data;
using eCommerceStore.API.Dto;
using eCommerceStore.API.Helper;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace eCommerceStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IStoreRepository _storeRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;



        public UsersController(AppDbContext context, IUserRepository userRepository, IStoreRepository storeRepository, IConfiguration configuration, IMapper mapper)
        {
            _context = context;
            _userRepository = userRepository;
            _storeRepository = storeRepository;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "user, admin, super-admin")]
        public async Task<List<User>> GetUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }
        
        [HttpGet]
        [ActionName("GetAllUsersWithStoreNameAsync")]
        [Route("api/UsersAndStores")]
        [Authorize(Roles = "user, admin, super-admin")]
        public async Task<IEnumerable<UserDto>> GetAllUsersWithStoreNameAsync()
        {
            
            return await _userRepository.GetAllUsersWithStoreNameAsync();
        }

        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetUserAsync")]
        [Authorize(Roles = "user, admin, super-admin")]
        public async Task<IActionResult> GetUserAsync(int id)
        {
            var user = await _userRepository.GetAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        
        
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateUser([FromQuery] int storeId, [FromBody] RegisterDto userCreate)
        {
            if (userCreate == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            userCreate.Password = PasswordHasher.HashPassword(userCreate.Password);
            var userMap = _mapper.Map<User>(userCreate);

            userMap.Store = await _storeRepository.GetAsync(storeId);

            await _userRepository.AddAsync(userMap);
            
           return CreatedAtAction(nameof(GetUserAsync), new { id = userCreate.Id }, userCreate);
        }
        
        // [HttpPost("login")]
        // public IActionResult Login(LoginDto dto)
        // {
        //     var user = _context.Users.Where(x => x.Email == dto.Email).FirstOrDefault();
        //
        //     if (user == null)
        //         return Unauthorized("Invalid credentials");
        //
        //     if (PasswordHasher.HashPassword(dto.Password) != user.Password)
        //         return Unauthorized("Invalid password");
        //
        //     string accessToken = TokenService.CreateAccessToken(
        //         user.Id, _configuration.GetSection("JWT:AccessKey").Value);
        //     string refreshToken = TokenService.CreateAccessToken(
        //         user.Id, _configuration.GetSection("JWT:RefreshKey").Value);
        //
        //     CookieOptions cookieOptions = new();
        //     cookieOptions.HttpOnly = true;
        //     Response.Cookies.Append("refresh_token", refreshToken, cookieOptions);
        //
        //     return Ok(new
        //     {
        //         token = accessToken
        //     });
        //
        // }


        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutUser(int id, User user)
        // {
        //     if (id != user.Id)
        //     {
        //         return BadRequest();
        //     }
        //
        //     _context.Entry(user).State = EntityState.Modified;
        //
        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!UserExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }
        //
        //     return NoContent();
        // }
        //
        //
        // // DELETE: api/Users/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteUser(int id)
        // {
        //     if (_context.Users == null)
        //     {
        //         return NotFound();
        //     }
        //     var user = await _context.Users.FindAsync(id);
        //     if (user == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     _context.Users.Remove(user);
        //     await _context.SaveChangesAsync();
        //
        //     return NoContent();
        // }
        //
        // private bool UserExists(int id)
        // {
        //     return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        // }
    }
}
