using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Proect_practika_leto.Migrations
{
    /// <inheritdoc />
    public partial class _123456 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductionOperations_ProductionOrders_OrderNumber",
                table: "ProductionOperations");

            migrationBuilder.DropIndex(
                name: "IX_ProductionOperations_OrderNumber",
                table: "ProductionOperations");

            migrationBuilder.DropColumn(
                name: "OrderNumber",
                table: "ProductionOperations");

            migrationBuilder.CreateIndex(
                name: "IX_ProductionOperations_ProductionCode",
                table: "ProductionOperations",
                column: "ProductionCode");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductionOperations_ProductionOrders_ProductionCode",
                table: "ProductionOperations",
                column: "ProductionCode",
                principalTable: "ProductionOrders",
                principalColumn: "Number",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductionOperations_ProductionOrders_ProductionCode",
                table: "ProductionOperations");

            migrationBuilder.DropIndex(
                name: "IX_ProductionOperations_ProductionCode",
                table: "ProductionOperations");

            migrationBuilder.AddColumn<int>(
                name: "OrderNumber",
                table: "ProductionOperations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProductionOperations_OrderNumber",
                table: "ProductionOperations",
                column: "OrderNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductionOperations_ProductionOrders_OrderNumber",
                table: "ProductionOperations",
                column: "OrderNumber",
                principalTable: "ProductionOrders",
                principalColumn: "Number",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
