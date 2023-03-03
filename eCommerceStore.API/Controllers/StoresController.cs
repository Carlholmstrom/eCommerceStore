using AutoMapper;
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
        private readonly IMapper _mapper;

        public StoresController(IStoreRepository storeRepository, IMapper mapper)
        {
            _storeRepository = storeRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin, super-admin")]
        public async Task<IEnumerable<StoreDto>> GetAllAsync()
        {
            var stores = await _storeRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<StoreDto>>(stores);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var store = await _storeRepository.GetAsync(id);

            if (store == null)
            {
                return NotFound();
            }

            var returnedStore = _mapper.Map<StoreDto>(store);

            return Ok(returnedStore);
        }

        [HttpGet("{id:int}/product")]
        [Authorize(Roles = "admin, super-admin")]
        public async Task<IActionResult> GetProductsAsync(int id)
        {
            if (!_storeRepository.StoreExists(id))
            {
                return NotFound();
            }

            var products = await _storeRepository.GetStoreProductsAsync(id);

            var productList = _mapper.Map<IEnumerable<ProductListDto>>(products);

            return Ok(productList);
        }

        [HttpPost("{storeId:int}/product")]
        [Authorize(Roles = "admin, super-admin")]
        public async Task<IActionResult> AddProductAsync(int storeId, [FromBody] ProductCreateDto productDto)
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

            return CreatedAtAction(nameof(GetAsync), "Products", new { id = addedProduct.Id }, addedProduct);
        }

        [HttpPost]
        [Authorize(Roles = "super-admin")]
        public async Task<IActionResult> AddAsync([FromBody] StoreCreateDto storeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var store = _mapper.Map<Store>(storeDto);

            var addedStore = await _storeRepository.AddAsync(store);

            var storeResponseDto = _mapper.Map<StoreDto>(addedStore);

            return CreatedAtAction("Get", new { id = addedStore.Id }, storeResponseDto);
        }

        [HttpDelete("{storeId:int}/product/{id:int}")]
        [Authorize(Roles = "admin, super-admin")]
        public async Task<IActionResult> DeleteProductAsync(int storeId, int id)
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
        [Authorize(Roles = "super-admin")]
        public async Task<IActionResult> DeleteAsync(int storeId)
        {
            if (!_storeRepository.StoreExists(storeId))
            {
                return NotFound();
            }

            var deletedStore = await _storeRepository.DeleteAsync(storeId);

            if (deletedStore == null)
            {
                return NotFound();
            }

            return NoContent();

        }
    }
}
