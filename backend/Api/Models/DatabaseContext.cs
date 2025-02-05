using Microsoft.EntityFrameworkCore;

namespace Api.Model;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<ToDoTask> ToDoTasks { get; set; }
    public DbSet<Column> Columns { get; set; }
    public DbSet<ToDoList> ToDoLists { get; set; }
}