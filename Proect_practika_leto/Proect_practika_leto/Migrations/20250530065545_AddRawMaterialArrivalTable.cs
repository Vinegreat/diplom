using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Proect_practika_leto.Migrations
{
    /// <inheritdoc />
    public partial class AddRawMaterialArrivalTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RawMaterialArrivals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    MaterialCode = table.Column<int>(type: "INTEGER", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    WarehouseCode = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RawMaterialArrivals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RawMaterialArrivals_Materials_MaterialCode",
                        column: x => x.MaterialCode,
                        principalTable: "Materials",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RawMaterialArrivals_WareHouses_WarehouseCode",
                        column: x => x.WarehouseCode,
                        principalTable: "WareHouses",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RawMaterialArrivals_MaterialCode",
                table: "RawMaterialArrivals",
                column: "MaterialCode");

            migrationBuilder.CreateIndex(
                name: "IX_RawMaterialArrivals_WarehouseCode",
                table: "RawMaterialArrivals",
                column: "WarehouseCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RawMaterialArrivals");
        }
    }
}
