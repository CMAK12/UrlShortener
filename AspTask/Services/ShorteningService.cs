using Microsoft.EntityFrameworkCore;

namespace AspTask.Services
{
    public class ShorteningService
    {
        private const int NumberOfChartsInShortLink = 7;
        private const string Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        private readonly AppDbContext _db;

        public ShorteningService(AppDbContext db)
        {
            _db = db;
        }

        private readonly Random _random = new Random();

        public async Task<string> GenerateUniqueCodeAsync()
        {
            while (true)
            {
                var codeChars = new char[NumberOfChartsInShortLink];

                for (int i = 0; i < codeChars.Length; i++)
                {
                    int randomIndex = _random.Next(Alphabet.Length - 1);
                    codeChars[i] = Alphabet[randomIndex];
                }

                var code = new string(codeChars);

                if (!await _db.ShortedUrls.AnyAsync(s => s.Code == code)) // Explicitly capture 'code' variable here
                {
                    return code;
                }
            }
        }
    }
}
