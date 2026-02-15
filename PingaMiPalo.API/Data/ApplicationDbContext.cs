using Microsoft.EntityFrameworkCore;
using PingaMiPalo.API.Models;

namespace PingaMiPalo.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurar relaciones
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId);

        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.UserId);

        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Order)
            .WithMany(o => o.OrderItems)
            .HasForeignKey(oi => oi.OrderId);

        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Product)
            .WithMany(p => p.OrderItems)
            .HasForeignKey(oi => oi.ProductId);

        // Seed data - Usuarios
        var seedDate = new DateTime(2026, 2, 13, 15, 1, 15, DateTimeKind.Utc);
        
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Username = "admin",
                Email = "admin@pingamipalo.com",
                PasswordHash = "$2a$11$z8OV.22LgdWOG9CyQOXC6OjEkwBDRhtv3xUQZ3NT4llGdOpUIiWv2", // Admin123!
                Role = "ADMIN",
                CreatedAt = seedDate,
                UpdatedAt = seedDate
            },
            new User
            {
                Id = 2,
                Username = "invitado",
                Email = "invitado@pingamipalo.com",
                PasswordHash = "$2a$11$frruq4nEyeifJ2bZqN42z.alrnoYEIiJZMHtzyFRTHKitTMzs0qTq", // Invitado123!
                Role = "Invitado",
                CreatedAt = seedDate,
                UpdatedAt = seedDate
            }
        );

        // Seed data - Categorías
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Juguetes", Description = "Juguetes para adultos" },
            new Category { Id = 2, Name = "Lencería", Description = "Ropa íntima sensual" },
            new Category { Id = 3, Name = "Lubricantes", Description = "Lubricantes y aceites" },
            new Category { Id = 4, Name = "Accesorios", Description = "Accesorios diversos" },
            new Category { Id = 5, Name = "Wellness", Description = "Productos de bienestar íntimo" }
        );

        // Seed data - Productos (15 productos con imágenes de Pixabay)
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Vibrador Clásico", Description = "Vibrador de silicona médica, resistente al agua", Price = 45.99m, ImageUrl = "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_640.jpg", Stock = 25, CategoryId = 1, CreatedAt = seedDate },
            new Product { Id = 2, Name = "Lubricante Premium", Description = "Lubricante a base de agua, hipoalergénico", Price = 19.99m, ImageUrl = "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_640.jpg", Stock = 50, CategoryId = 3, CreatedAt = seedDate },
            new Product { Id = 3, Name = "Anillo Vibrador", Description = "Anillo con vibración, recargable por USB", Price = 35.50m, ImageUrl = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg", Stock = 15, CategoryId = 1, CreatedAt = seedDate },
            new Product { Id = 4, Name = "Masajeador Personal", Description = "Masajeador de múltiples velocidades, silencioso", Price = 55.00m, ImageUrl = "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_640.jpg", Stock = 20, CategoryId = 5, CreatedAt = seedDate },
            new Product { Id = 5, Name = "Kit de Inicio", Description = "Kit completo para principiantes", Price = 89.99m, ImageUrl = "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg", Stock = 10, CategoryId = 4, CreatedAt = seedDate },
            new Product { Id = 6, Name = "Aceite de Masaje", Description = "Aceite aromático para masajes sensuales", Price = 24.99m, ImageUrl = "https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_640.jpg", Stock = 30, CategoryId = 3, CreatedAt = seedDate },
            new Product { Id = 7, Name = "Vibrador de Lujo", Description = "Vibrador premium con control remoto", Price = 125.00m, ImageUrl = "https://cdn.pixabay.com/photo/2016/10/20/18/35/sunrise-1756274_640.jpg", Stock = 8, CategoryId = 1, CreatedAt = seedDate },
            new Product { Id = 8, Name = "Esposas de Seda", Description = "Esposas suaves y cómodas", Price = 29.99m, ImageUrl = "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg", Stock = 18, CategoryId = 4, CreatedAt = seedDate },
            new Product { Id = 9, Name = "Gel Estimulante", Description = "Gel con efecto calor/frío", Price = 22.50m, ImageUrl = "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_640.jpg", Stock = 40, CategoryId = 3, CreatedAt = seedDate },
            new Product { Id = 10, Name = "Bolas Chinas", Description = "Bolas de ejercicio Kegel de silicona", Price = 38.00m, ImageUrl = "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_640.jpg", Stock = 22, CategoryId = 1, CreatedAt = seedDate },
            new Product { Id = 11, Name = "Velas de Masaje", Description = "Velas aromáticas que se convierten en aceite", Price = 18.99m, ImageUrl = "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg", Stock = 35, CategoryId = 3, CreatedAt = seedDate },
            new Product { Id = 12, Name = "Plug Anal Principiante", Description = "Plug de silicona suave, tamaño pequeño", Price = 32.00m, ImageUrl = "https://cdn.pixabay.com/photo/2016/11/08/05/26/woman-1807533_640.jpg", Stock = 12, CategoryId = 1, CreatedAt = seedDate },
            new Product { Id = 13, Name = "Consolador Realista", Description = "Consolador de silicona con textura realista", Price = 65.00m, ImageUrl = "https://cdn.pixabay.com/photo/2016/11/29/03/53/beach-1867285_640.jpg", Stock = 14, CategoryId = 1, CreatedAt = seedDate },
            new Product { Id = 14, Name = "Antifaz de Seda", Description = "Antifaz suave para juegos sensuales", Price = 15.99m, ImageUrl = "https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_640.jpg", Stock = 28, CategoryId = 4, CreatedAt = seedDate },
            new Product { Id = 15, Name = "Succionador de Clítoris", Description = "Estimulador con tecnología de ondas de presión", Price = 95.00m, ImageUrl = "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_640.jpg", Stock = 9, CategoryId = 1, CreatedAt = seedDate }
        );
    }
}
