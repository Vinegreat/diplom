using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Proect_practika_leto.Migrations
{
    /// <inheritdoc />
    public partial class _2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductionOperations_ProductionOrders_ProductionCode",
                table: "ProductionOperations");

            migrationBuilder.RenameColumn(
                name: "ProductionCode",
                table: "ProductionOperations",
                newName: "OrderCode");

            migrationBuilder.RenameIndex(
                name: "IX_ProductionOperations_ProductionCode",
                table: "ProductionOperations",
                newName: "IX_ProductionOperations_OrderCode");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductionOperations_ProductionOrders_OrderCode",
                table: "ProductionOperations",
                column: "OrderCode",
                principalTable: "ProductionOrders",
                principalColumn: "Number",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductionOperations_ProductionOrders_OrderCode",
                table: "ProductionOperations");

            migrationBuilder.RenameColumn(
                name: "OrderCode",
                table: "ProductionOperations",
                newName: "ProductionCode");

            migrationBuilder.RenameIndex(
                name: "IX_ProductionOperations_OrderCode",
                table: "ProductionOperations",
                newName: "IX_ProductionOperations_ProductionCode");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductionOperations_ProductionOrders_ProductionCode",
                table: "ProductionOperations",
                column: "ProductionCode",
                principalTable: "ProductionOrders",
                principalColumn: "Number",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
