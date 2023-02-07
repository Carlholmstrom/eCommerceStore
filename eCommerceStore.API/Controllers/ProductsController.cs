using AutoMapper;
using eCommerceStore.API.Data;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;
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

    // GET: api/Users
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(IEnumerable<Product>))]
    public IActionResult GetProducts()
    {
        var products = _productsRepository.GetProducts();
            
        if (!ModelState.IsValid)
            return BadRequest();

        return Ok(products);
    }

    [HttpGet("{productId}")]
    [ProducesResponseType(200, Type = typeof(Product))]
    [ProducesResponseType(400)]
    public IActionResult GetStore(int productId)
    {
        if (!_productsRepository.ProductExists(productId))
            return NotFound();

        var product = _productsRepository.GetProduct(productId);

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(product);
    }

    // PUT: api/Products/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // [HttpPut("{id}")]
    // public async Task<IActionResult> PutProduct(int id, Product product)
    // {
    //     if (id != product.Id) return BadRequest();
    //
    //     _context.Entry(product).State = EntityState.Modified;
    //
    //     try
    //     {
    //         await _context.SaveChangesAsync();
    //     }
    //     catch (DbUpdateConcurrencyException)
    //     {
    //         if (!ProductExists(id))
    //             return NotFound();
    //         throw;
    //     }
    //
    //     return NoContent();
    // }
    //
    // // POST: api/Products
    // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // [HttpPost]
    // public async Task<ActionResult<Product>> PostProduct(Product product)
    // {
    //     if (_context.Products == null) return Problem("Entity set 'AppDbContext.Products'  is null.");
    //     _context.Products.Add(product);
    //     await _context.SaveChangesAsync();
    //
    //     return CreatedAtAction("GetProduct", new { id = product.Id }, product);
    // }
    //
    // // DELETE: api/Products/5
    // [HttpDelete("{id}")]
    // public async Task<IActionResult> DeleteProduct(int id)
    // {
    //     if (_context.Products == null) return NotFound();
    //     var product = await _context.Products.FindAsync(id);
    //     if (product == null) return NotFound();
    //
    //     _context.Products.Remove(product);
    //     await _context.SaveChangesAsync();
    //
    //     return NoContent();
    // }
    //
    // private bool ProductExists(int id)
    // {
    //     return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
    // }
}