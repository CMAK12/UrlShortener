using AspTask.Auth.Common;
using AspTask.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography.Xml;

namespace AspTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IOptions<AuthOptions> _options;

        public AuthController(AppDbContext db, IOptions<AuthOptions> authOptions)
        {
            _db = db;
            _options = authOptions;
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody]Login request)
        {
            var adminUser = new User
            {
                Id = 1,
                Username = "admin",
                Password = "admin",
                Role = UserRole.Admin
            };
            var stanndartUser = new User
        {
            Id = 2,
            Username = "user",
            Password = "user",
            Role = UserRole.User
        };

            if (!_db.Users.Any(x => x.Id == adminUser.Id) && !_db.Users.Any(x => x.Id == stanndartUser.Id))
            {
                _db.Users.Add(adminUser);
                _db.Users.Add(stanndartUser);
                _db.SaveChanges();
            }

            var user = AuthenticateUser(request.Username, request.Password);

            if (user != null) 
            {
                var token = GenerateJWT(user);

                return Ok(new { access_token = token });
            }

            return Unauthorized();
        }

        private User AuthenticateUser(string username, string password)
        {
            return _db.Users.SingleOrDefault(u => u.Username == username && u.Password == password);
        }

        private string GenerateJWT(User user)
        {
            var authParams = _options.Value;

            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Name, user.Username),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.Role, UserRole.User)
            };

            var token = new JwtSecurityToken(
                authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
