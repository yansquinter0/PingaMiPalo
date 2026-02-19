using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PingaMiPalo.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    Stock = table.Column<int>(type: "integer", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Juguetes para adultos", "Juguetes" },
                    { 2, "Ropa íntima sensual", "Lencería" },
                    { 3, "Lubricantes y aceites", "Lubricantes" },
                    { 4, "Accesorios diversos", "Accesorios" },
                    { 5, "Productos de bienestar íntimo", "Wellness" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "ImageUrl", "PasswordHash", "Role", "UpdatedAt", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "admin@pingamipalo.com", "", "$2a$11$z8OV.22LgdWOG9CyQOXC6OjEkwBDRhtv3xUQZ3NT4llGdOpUIiWv2", "ADMIN", new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "admin" },
                    { 2, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "invitado@pingamipalo.com", "", "$2a$11$frruq4nEyeifJ2bZqN42z.alrnoYEIiJZMHtzyFRTHKitTMzs0qTq", "Invitado", new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "invitado" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "CreatedAt", "Description", "ImageUrl", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Vibrador de silicona médica, resistente al agua", "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_640.jpg", "Vibrador Clásico", 45.99m, 25 },
                    { 2, 3, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Lubricante a base de agua, hipoalergénico", "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_640.jpg", "Lubricante Premium", 19.99m, 50 },
                    { 3, 1, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Anillo con vibración, recargable por USB", "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg", "Anillo Vibrador", 35.50m, 15 },
                    { 4, 5, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Masajeador de múltiples velocidades, silencioso", "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_640.jpg", "Masajeador Personal", 55.00m, 20 },
                    { 5, 4, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Kit completo para principiantes", "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg", "Kit de Inicio", 89.99m, 10 },
                    { 6, 3, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Aceite aromático para masajes sensuales", "https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_640.jpg", "Aceite de Masaje", 24.99m, 30 },
                    { 7, 1, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Vibrador premium con control remoto", "https://cdn.pixabay.com/photo/2016/10/20/18/35/sunrise-1756274_640.jpg", "Vibrador de Lujo", 125.00m, 8 },
                    { 8, 4, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Esposas suaves y cómodas", "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg", "Esposas de Seda", 29.99m, 18 },
                    { 9, 3, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Gel con efecto calor/frío", "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_640.jpg", "Gel Estimulante", 22.50m, 40 },
                    { 10, 1, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Bolas de ejercicio Kegel de silicona", "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_640.jpg", "Bolas Chinas", 38.00m, 22 },
                    { 11, 3, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Velas aromáticas que se convierten en aceite", "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg", "Velas de Masaje", 18.99m, 35 },
                    { 12, 1, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Plug de silicona suave, tamaño pequeño", "https://cdn.pixabay.com/photo/2016/11/08/05/26/woman-1807533_640.jpg", "Plug Anal Principiante", 32.00m, 12 },
                    { 13, 1, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Consolador de silicona con textura realista", "https://cdn.pixabay.com/photo/2016/11/29/03/53/beach-1867285_640.jpg", "Consolador Realista", 65.00m, 14 },
                    { 14, 4, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Antifaz suave para juegos sensuales", "https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_640.jpg", "Antifaz de Seda", 15.99m, 28 },
                    { 15, 1, new DateTime(2026, 2, 13, 15, 1, 15, 0, DateTimeKind.Utc), "Estimulador con tecnología de ondas de presión", "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_640.jpg", "Succionador de Clítoris", 95.00m, 9 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
