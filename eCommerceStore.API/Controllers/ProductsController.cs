using AutoMapper;
using eCommerceStore.API.Data;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eCommerceStore.API.Controllers;

[Route("api/[controller]")]
[ApiController]
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
    [ProducesResponseType(200, Type = typeof(IEnumerable<Product>))]
    public async Task<IActionResult> GetAllProductsAsync()
    {
        var products = await _productsRepository.GetAllAsync();
            
        if (!ModelState.IsValid)
            return BadRequest();

        return Ok(products);
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

        return Ok(product);
    }

   
}