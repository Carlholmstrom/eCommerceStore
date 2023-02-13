using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eCommerceStore.API.Data;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;

namespace eCommerceStore.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoresController : ControllerBase
    {
        private readonly IStoreRepository _storeRepository;

        public StoresController(IStoreRepository storeRepository)
        {
            _storeRepository = storeRepository;
        }

        // GET: api/Stores
        [HttpGet]
        public async Task<IEnumerable<Store>> GetStoresAsync()
        {
            return await _storeRepository.GetAllAsync();
        }

        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetStoreAsync")]
        public async Task<IActionResult> GetStoreAsync(int id)
        {
            var store = await _storeRepository.GetAsync(id);

            if (store == null)
            {
                return NotFound();
            }

            return Ok(store);
        }

        // PUT: api/Stores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore(int id, Store store)
        {
            if (id != store.Id)
            {
                return BadRequest();
            }

            await _storeRepository.AddAsync(store);

           
                if (!_storeRepository.StoreExists(id))
                {
                    return NotFound();
                }
                

            return NoContent();
        }

        // POST: api/Stores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

    }
}
