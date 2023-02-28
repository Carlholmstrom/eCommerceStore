using AutoMapper;
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
        private readonly IMapper _mapper;

        public StoresController(IStoreRepository storeRepository, IConfiguration configuration, IMapper mapper)
        {
            _storeRepository = storeRepository;
            _configuration = configuration;
            _mapper = mapper;
        }

       [HttpGet]
       [Authorize(Roles = "admin, super-admin")]
       public async Task<IEnumerable<StoreDto>> GetStoresAsync()
       {
           var stores = await _storeRepository.GetAllAsync();
           return _mapper.Map<IEnumerable<StoreDto>>(stores);
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

           var returnedStore = _mapper.Map<StoreDto>(store);

           return Ok(returnedStore);
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
     
         var productList = _mapper.Map<IEnumerable<ProductListDto>>(products);
     
         return Ok(productList);
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
        
        [HttpPost]
        [Authorize(Roles = "super-admin")]
        public async Task<IActionResult> AddStoreAsync([FromBody] StoreCreateDto storeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
       
            var store = _mapper.Map<Store>(storeDto);
       
            var addedStore = await _storeRepository.AddAsync(store);
       
            var storeResponseDto = _mapper.Map<StoreDto>(addedStore);
       
            return CreatedAtAction("GetStoreAsync", new { id = addedStore.Id }, storeResponseDto);
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

    }
}
