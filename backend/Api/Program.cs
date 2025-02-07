using Microsoft.EntityFrameworkCore;
using Api.Model;

var builder = WebApplication.CreateBuilder(args);

// Configure the database context with SQL Server.
builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure CORS to allow all origins, methods, and headers.
builder.Services.AddCors(options =>
{
    // ! AllowAll is for development only. Update before deployment !
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

// Add essential services.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Apply database migrations at startup.
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

    try
    {
        dbContext.Database.Migrate();
        Console.WriteLine("Connected to the database successfully.");
    }
    catch (Exception ex)
    {
        Console.WriteLine("Failed to connect to the database.");
        throw;
    }
}

// Enable Swagger UI in development mode.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
app.Run();