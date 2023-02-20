using eCommerceStore.API.Dto;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eCommerceStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoresController : ControllerBase
    {
        private readonly IStoreRepository _storeRepository;
        private readonly IConfiguration _configuration;

        public StoresController(IStoreRepository storeRepository, IConfiguration configuration)
        {
            _storeRepository = storeRepository;
            _configuration = configuration;
        }

        [HttpGet]
        [Authorize(Roles = "user, admin, super-admin")]
        public async Task<IEnumerable<Store>> GetStoresAsync()
        {
            return await _storeRepository.GetAllAsync();
        }

        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetStoreAsync")]
        [Authorize(Roles = "user, admin, super-admin")]
        public async Task<IActionResult> GetStoreAsync(int id)
        {
            var store = await _storeRepository.GetAsync(id);

            if (store == null)
            {
                return NotFound();
            }

            return Ok(store);
        }
        
        [HttpGet("{id:int}/product")]
        [ActionName("GetStoreProductsAsync")]
        [Authorize(Roles = "user, admin, super-admin")]
        public async Task<IActionResult> GetStoreProductsAsync(int id)
        {
            if (!_storeRepository.StoreExists(id))
            {
                return NotFound();
            }

            var products = await _storeRepository.GetStoreProductsAsync(id);

            return Ok(products);
        }
        
        [HttpPost("{id:int}/product")]
        [ActionName("AddProductToStoreAsync")]
        [Authorize(Roles = "admin, super-admin")]
        public async Task<IActionResult> AddProductToStoreAsync(int id, [FromBody] ProductCreateDto productDto)
        {
            if (!_storeRepository.StoreExists(id))
            {
                return NotFound();
            }

            // if (!ModelState.IsValid)
            // {
            //     return BadRequest(ModelState);
            // }

            var addedProduct = await _storeRepository.AddProductToStoreAsync(id, productDto);

            return CreatedAtAction("GetStoreProductsAsync", new { id = addedProduct.Id }, addedProduct);
        }

        [HttpDelete("{storeId:int}/product/{id:int}")]
        [ActionName("DeleteProductFromStoreAsync")]
        [Authorize(Roles = "admin, super-admin")]
        public async Task<IActionResult> DeleteProductFromStoreAsync(int storeId, int id)
        {
            if (!_storeRepository.StoreExists(storeId))
            {
                return NotFound();
            }

            var deletedProduct = await _storeRepository.DeleteProductFromStoreAsync(storeId, id);

            if (deletedProduct == null)
            {
                return NotFound();
            }

            return NoContent();
        }


       

    }
}
