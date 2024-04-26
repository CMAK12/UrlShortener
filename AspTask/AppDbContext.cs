using Microsoft.EntityFrameworkCore;
using AspTask.Models;

namespace AspTask
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        { 
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<ShortedUrl> ShortedUrls { get; set; }
        public DbSet<About> About { get; set; }
    }
}
