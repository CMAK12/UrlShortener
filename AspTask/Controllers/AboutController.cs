using AspTask.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace AspTask.Controllers
{
    public class AboutController : Controller
    {
        private readonly AppDbContext _db;

        public AboutController(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IActionResult> Index()
        {
            var aboutText = await _db.About.SingleOrDefaultAsync();

            if (aboutText == null) 
            {
                var about = new About { Id = 1, Text = "Цей код на ASP.NET створює сервіс скорочення URL-адрес. Коли клієнт надсилає POST-запит до \"/shorten\", він перевіряє надану URL-адресу на валідність і генерує унікальний короткий код. Якщо надано токен аутентифікації, він витягує з нього ім'я створювача. Потім він зберігає початкову URL-адресу, коротку URL-адресу, інформацію про створювача та інші дані в базі даних. CORS налаштований так, щоб дозволяти запити з будь-якого походження, методу або заголовка. Алгоритм скорочення генерує унікальний код за допомогою заздалегідь визначеного набору символів, забезпечуючи унікальність за допомогою перевірки існуючих кодів в базі даних. " };
                await _db.About.AddAsync(about);
                await _db.SaveChangesAsync();
            }
            else ViewBag.AboutText = aboutText.Text;

            return View();
        }

        [HttpGet]
        [Route("change_text")]
        public async Task<IActionResult> ChangeAboutText()
        {
            var aboutText = await _db.About.SingleOrDefaultAsync();

            if (aboutText == null) return NotFound();

            return View();
        }

        [HttpPost]
        [Route("change_text")]
        public async Task<IActionResult> ChangeAboutText(About newText)
        {
            if (!User.IsInRole("admin")) return RedirectToAction("Index");

            var existingText = await _db.About.SingleOrDefaultAsync();

            if (existingText != null) existingText.Text = newText.Text;
            else _db.About.AddAsync(newText);

            await _db.SaveChangesAsync();

            return RedirectToAction("Index");
        }
    }
}
