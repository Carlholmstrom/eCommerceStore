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
    }
}
