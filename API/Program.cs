using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Writers;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt=>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnectionString"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using var Scope  = app.Services.CreateScope();
var services = Scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
   // var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception Ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(Ex, "An error occur during database migration");
}

app.Run();
