using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eCommerceStore.API.Data;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;

namespace eCommerceStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoresController : ControllerBase
    {
        private readonly IStoreRepository _storeRepository;
        private readonly IMapper _mapper;

        public StoresController(IStoreRepository storeRepository, IMapper mapper)
        {
            _storeRepository = storeRepository;
            _mapper = mapper;
        }

        // GET: api/Users
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Store>))]
        public IActionResult GetStores()
        {
            var stores =  _storeRepository.GetStores();
            
            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(stores);
        }

        [HttpGet("{storeId}")]
        [ProducesResponseType(200, Type = typeof(Store))]
        [ProducesResponseType(400)]
        public IActionResult GetStore(int storeId)
        {
            if (!_storeRepository.StoreExists(storeId))
                return NotFound();

            var store = _storeRepository.GetStore(storeId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(store);
        }
        // PUT: api/Stores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutStore(int id, Store store)
        // {
        //     if (id != store.Id)
        //     {
        //         return BadRequest();
        //     }
        //
        //     _context.Entry(store).State = EntityState.Modified;
        //
        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!StoreExists(id))
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
        // // POST: api/Stores
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPost]
        // public async Task<ActionResult<Store>> PostStore(Store store)
        // {
        //   if (_context.Stores == null)
        //   {
        //       return Problem("Entity set 'AppDbContext.Stores'  is null.");
        //   }
        //     _context.Stores.Add(store);
        //     await _context.SaveChangesAsync();
        //
        //     return CreatedAtAction("GetStore", new { id = store.Id }, store);
        // }
        //
        // // DELETE: api/Stores/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteStore(int id)
        // {
        //     if (_context.Stores == null)
        //     {
        //         return NotFound();
        //     }
        //     var store = await _context.Stores.FindAsync(id);
        //     if (store == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     _context.Stores.Remove(store);
        //     await _context.SaveChangesAsync();
        //
        //     return NoContent();
        // }
        //
        // private bool StoreExists(int id)
        // {
        //     return (_context.Stores?.Any(e => e.Id == id)).GetValueOrDefault();
        // }
    }
}
