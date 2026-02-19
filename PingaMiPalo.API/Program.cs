using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PingaMiPalo.API.Data;
using Npgsql;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --- DYNAMIC PORT CONFIGURATION ---
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --- ROBUST DATABASE CONFIGURATION ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=pingamipalo.db";
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

if (!string.IsNullOrEmpty(databaseUrl))
{
    try 
    {
        // Support postgres:// and postgresql:// schemes
        if (databaseUrl.StartsWith("postgres://")) {
            databaseUrl = "postgresql://" + databaseUrl.Substring(11);
        }
        
        var databaseUri = new Uri(databaseUrl);
        var userInfo = databaseUri.UserInfo?.Split(':');
        
        var builderPg = new Npgsql.NpgsqlConnectionStringBuilder
        {
            Host = databaseUri.Host,
            Port = databaseUri.Port > 0 ? databaseUri.Port : 5432,
            Database = databaseUri.LocalPath.TrimStart('/'),
            SslMode = Npgsql.SslMode.Require,
            TrustServerCertificate = true,
            Pooling = true
        };

        if (userInfo != null && userInfo.Length >= 2)
        {
            builderPg.Username = Uri.UnescapeDataString(userInfo[0]);
            builderPg.Password = Uri.UnescapeDataString(userInfo[1]);
        }
        
        connectionString = builderPg.ToString();
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));
    }
    catch (Exception ex)
    {
        Console.WriteLine($"WARNING: Failed to parse DATABASE_URL: {ex.Message}");
        // Fallback to default if parsing fails
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlite(connectionString));
    }
}
else
{
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlite(connectionString));
}

// Configure JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? "a_very_long_and_secure_default_key_for_stability_1234567890";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// --- SAFE DATABASE MIGRATIONS ---
// Attempt to migrate but don't crash the server if it fails (allows CORS to still work)
try 
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        dbContext.Database.Migrate();
        Console.WriteLine("Database migrations applied successfully.");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"ERROR applying migrations: {ex.Message}");
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "PingaMiPalo API v1");
        c.RoutePrefix = string.Empty;
    });
}

// CORS MUST BE FIRST
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
