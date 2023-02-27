using eCommerceStore.API.Dto;
using eCommerceStore.API.Dto.Incoming;
using eCommerceStore.API.Dto.Outgoing;
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
        [Authorize(Roles = "admin, super-admin")]
        public async Task<IEnumerable<Store>> GetStoresAsync()
        {
            return await _storeRepository.GetAllAsync();
        }

        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetStoreAsync")]
        [Authorize(Roles = "admin, super-admin")]
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
        [Authorize(Roles = "admin, super-admin")]
        public async Task<IActionResult> GetStoreProductsAsync(int id)
        {
            if (!_storeRepository.StoreExists(id))
            {
                return NotFound();
            }

            var products = await _storeRepository.GetStoreProductsAsync(id);

            return Ok(products);
        }
        
        [HttpPost("{storeId:int}/product")]
        [ActionName("AddProductToStoreAsync")]
        [Authorize(Roles = "admin, super-admin")]
        public async Task<IActionResult> AddProductToStoreAsync(int storeId, [FromBody] ProductCreateDto productDto)
        {
            if (!_storeRepository.StoreExists(storeId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addedProduct = await _storeRepository.AddProductToStoreAsync(storeId, productDto);

            return CreatedAtAction("GetProductAsync", "Products", new { id = addedProduct.Id }, addedProduct);
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
        
        [HttpDelete("{storeId:int}")]
        [ActionName("DeleteStoreAsync")]
        [Authorize(Roles = "super-admin")]
        public async Task<IActionResult> DeleteProductFromStoreAsync(int storeId)
        {
            if (!_storeRepository.StoreExists(storeId))
            {
                return NotFound();
            }

            var deletedProduct = await _storeRepository.DeleteAsync(storeId);

            if (deletedProduct == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        
        [HttpPost]
        [Authorize(Roles = "super-admin")]
        public async Task<IActionResult> AddStoreAsync([FromBody] StoreCreateDto storeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var store = new Store
            {
                Name = storeDto.Name,
            };

            var addedStore = await _storeRepository.AddAsync(store);

            var storeResponseDto = new StoreDto
            {
                Name = addedStore.Name
            };

            return CreatedAtAction("GetStoreAsync", new { id = addedStore.Id }, storeResponseDto);
        }

       

    }
}
