using AutoMapper;
using eCommerceStore.API.Data;
using eCommerceStore.API.Dto;
using eCommerceStore.API.Dto.Outgoing;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eCommerceStore.API.Controllers;

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
    public async Task<IEnumerable<ProductListDto>> GetAllProductsAsync()
    {
        var products = await _productsRepository.GetAllAsync();

        return _mapper.Map<IEnumerable<ProductListDto>>(products);
    }
    
    [HttpGet]
    [Route("{id:int}")]
    [ActionName("GetProductAsync")]
    public async Task<IActionResult> GetProductAsync(int id)
    {
        var product = await _productsRepository.GetAsync(id);

        if (product == null)
        {
            return NotFound();
        }
        var returnedProduct = _mapper.Map<ProductListDto>(product);

        return Ok(returnedProduct);
    }
   [HttpPut]
   [Route("{id:int}/quantity")]
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