using Microsoft.EntityFrameworkCore;

namespace Api.Model;

// DatabaseContext is the EF Core class used to interact with the database.
public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
    
    // Defines the database tables and their corresponding entity types.
    public DbSet<User> Users { get; set; }
    public DbSet<ToDoTask> ToDoTasks { get; set; }
    public DbSet<Column> Columns { get; set; }
    public DbSet<ToDoList> ToDoLists { get; set; }
}