using Microsoft.EntityFrameworkCore;
using Api.Model;

var builder = WebApplication.CreateBuilder(args);

// Connect to BD
builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add necessary services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Check the bd connexion when starting
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
    
    try
    {
        dbContext.Database.Migrate(); 
        Console.WriteLine("Connexion to the bd :)");
    }
    catch (Exception ex)
    {
        Console.WriteLine("Connexion to the bd not ok :(");
        throw;
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();