using Microsoft.EntityFrameworkCore;

namespace Api.Model;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; } = null!;
}