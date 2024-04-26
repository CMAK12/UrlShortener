using AspTask.Models;
using AspTask.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace AspTask.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShortenerUrlController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly ShorteningService _shortService;

        public ShortenerUrlController(AppDbContext db, ShorteningService shortService)
        {
            _db = db;
            _shortService = shortService;
        }

        [HttpGet("get")]
        public async Task<List<ShortedUrl>> Get()
        {
            return await _db.ShortedUrls.ToListAsync();
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult<ShortedUrl>> Get(Guid id)
        {
            var url = await _db.ShortedUrls.FindAsync(id);

            if (url == null) return NotFound();

            return new ObjectResult(url);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var url = await _db.ShortedUrls.FindAsync(id);

            if (url == null) return NotFound();

            _db.ShortedUrls.Remove(url);
            await _db.SaveChangesAsync();

            return Ok();
        }


        [HttpPost("shorten")]
        public async Task<IActionResult> ShortenAsync(ShortenUrlRequest request)
        {
            if (!Uri.TryCreate(request.Url, UriKind.Absolute, out _)) return BadRequest("The specified URL is invalid.");

            var code = await _shortService.GenerateUniqueCodeAsync();
            string creator = "guest";

            if (!string.IsNullOrEmpty(request.Token))
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(request.Token) as JwtSecurityToken;

                creator = jwtToken.Claims.FirstOrDefault(x => x.Type == "name")?.Value;
            }

            var shortedUrl = new ShortedUrl
            {
                Id = Guid.NewGuid(),
                LongUrl = request.Url, 
                ShortUrl = $"{Request.Scheme}://{Request.Host}/{code}",
                Code = code,
                CreatedDate = DateTime.Now.ToUniversalTime(),
                CreatedBy = creator,
            };

            await _db.ShortedUrls.AddAsync(shortedUrl);
            await _db.SaveChangesAsync();

            return Ok(shortedUrl.ShortUrl);
        }

        [HttpGet("navigator/{code}")]
        public async Task<ActionResult<string>> NavigateToOriginalUrl(string code)
        {
            var shortedUrl = await _db.ShortedUrls.FirstOrDefaultAsync(s => s.Code == code);

            if (shortedUrl == null) return NotFound();

            return shortedUrl.LongUrl;
        }
    }
}
