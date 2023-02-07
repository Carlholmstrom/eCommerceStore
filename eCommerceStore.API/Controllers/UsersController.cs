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

namespace eCommerceStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IStoreRepository _storeRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IStoreRepository storeRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _storeRepository = storeRepository;
            _mapper = mapper;
        }

        // GET: api/Users
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        public IActionResult GetUsers()
        {
            var users =  _userRepository.GetUsers();
            
            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(users);
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetReview(int userId)
        {
            if (!_userRepository.UserExists(userId))
                return NotFound();
            
            var user = _userRepository.GetUser(userId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }
        
        
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateUser([FromQuery] int storeId, [FromBody] RegisterDto userCreate)
        {
            if (userCreate == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            userCreate.Password = PasswordHasher.HashPassword(userCreate.Password);
            var userMap = _mapper.Map<User>(userCreate);

            userMap.Store = _storeRepository.GetStore(storeId);

            if (!_userRepository.CreateUser(userMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created"); 

        }

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
