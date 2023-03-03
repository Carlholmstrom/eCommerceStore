using AutoMapper;
using eCommerceStore.API.Dto.Outgoing;
using eCommerceStore.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eCommerceStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsRepository _productsRepository;
        private readonly IMapper _mapper;

        public ProductsController(IProductsRepository productsRepository, IMapper mapper)
        {
            _productsRepository = productsRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        [Authorize(Roles = "user, admin, super-admin")]
        public async Task<IEnumerable<ProductListDto>> GetAllAsync()
        {
            var products = await _productsRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<ProductListDto>>(products);
        }
        
        [HttpGet("{id:int}")]
        [ActionName("GetAsync")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var product = await _productsRepository.GetAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            var returnedProduct = _mapper.Map<ProductListDto>(product);

            return Ok(returnedProduct);
        }
       
        [HttpPut("{id:int}/quantity")]
        [Authorize(Roles = "admin, super-admin")]
        public async Task<IActionResult> UpdateQuantityAsync(int id, [FromBody] int newQuantity)
        {
            var product = await _productsRepository.UpdateQuantityAsync(id, newQuantity);

            if (product == null)
            {
                return NotFound();
            }

            var productResponseDto = _mapper.Map<UpdatedProductDto>(product);

            return Ok(productResponseDto);
        }
    }
}
