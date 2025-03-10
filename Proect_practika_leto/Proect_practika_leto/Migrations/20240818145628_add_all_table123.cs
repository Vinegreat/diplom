using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Proect_practika_leto.Migrations
{
    /// <inheritdoc />
    public partial class add_all_table123 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductionOrders",
                columns: table => new
                {
                    Number = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ContractorCode = table.Column<int>(type: "INTEGER", nullable: false),
                    MaterialCode = table.Column<int>(type: "INTEGER", nullable: false),
                    Quantity = table.Column<string>(type: "TEXT", nullable: false),
                    PlannedCompletionDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ActualDateCompletion = table.Column<DateTime>(type: "TEXT", nullable: false),
                    StaffCode = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductionOrders", x => x.Number);
                    table.ForeignKey(
                        name: "FK_ProductionOrders_Contractors_ContractorCode",
                        column: x => x.ContractorCode,
                        principalTable: "Contractors",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductionOrders_Materials_MaterialCode",
                        column: x => x.MaterialCode,
                        principalTable: "Materials",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductionOrders_Staff_StaffCode",
                        column: x => x.StaffCode,
                        principalTable: "Staff",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TechnologicalMaps",
                columns: table => new
                {
                    Code = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    EquipmentCode = table.Column<int>(type: "INTEGER", nullable: false),
                    PreparedMaterialCode = table.Column<int>(type: "INTEGER", nullable: false),
                    QuantityPreparedMaterial = table.Column<string>(type: "TEXT", nullable: false),
                    RawMaterialCode = table.Column<int>(type: "INTEGER", nullable: false),
                    QuantityRawMaterial = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TechnologicalMaps", x => x.Code);
                    table.ForeignKey(
                        name: "FK_TechnologicalMaps_Equipment_EquipmentCode",
                        column: x => x.EquipmentCode,
                        principalTable: "Equipment",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TechnologicalMaps_Materials_PreparedMaterialCode",
                        column: x => x.PreparedMaterialCode,
                        principalTable: "Materials",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TechnologicalMaps_Materials_RawMaterialCode",
                        column: x => x.RawMaterialCode,
                        principalTable: "Materials",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DocumentsMovementMaterials",
                columns: table => new
                {
                    Code = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DateDocument = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    DateDocumentCreated = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    TypeMovementMaterialCode = table.Column<int>(type: "INTEGER", nullable: false),
                    MaterialCode = table.Column<int>(type: "INTEGER", nullable: false),
                    QuantityMaterial = table.Column<int>(type: "INTEGER", nullable: false),
                    WareHouseSenderCode = table.Column<int>(type: "INTEGER", nullable: false),
                    WareHouseRecipientCode = table.Column<int>(type: "INTEGER", nullable: false),
                    OrderNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    ProductionCode = table.Column<int>(type: "INTEGER", nullable: false),
                    ContractorCode = table.Column<int>(type: "INTEGER", nullable: false),
                    StaffCode = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentsMovementMaterials", x => x.Code);
                    table.ForeignKey(
                        name: "FK_DocumentsMovementMaterials_Contractors_ContractorCode",
                        column: x => x.ContractorCode,
                        principalTable: "Contractors",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DocumentsMovementMaterials_Materials_MaterialCode",
                        column: x => x.MaterialCode,
                        principalTable: "Materials",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DocumentsMovementMaterials_ProductionOrders_OrderNumber",
                        column: x => x.OrderNumber,
                        principalTable: "ProductionOrders",
                        principalColumn: "Number",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DocumentsMovementMaterials_Staff_StaffCode",
                        column: x => x.StaffCode,
                        principalTable: "Staff",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DocumentsMovementMaterials_TypeMovementMaterials_TypeMovementMaterialCode",
                        column: x => x.TypeMovementMaterialCode,
                        principalTable: "TypeMovementMaterials",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DocumentsMovementMaterials_WareHouses_WareHouseRecipientCode",
                        column: x => x.WareHouseRecipientCode,
                        principalTable: "WareHouses",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DocumentsMovementMaterials_WareHouses_WareHouseSenderCode",
                        column: x => x.WareHouseSenderCode,
                        principalTable: "WareHouses",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductionOperations",
                columns: table => new
                {
                    Number = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    ProductionCode = table.Column<int>(type: "INTEGER", nullable: false),
                    PreparedMaterialCode = table.Column<int>(type: "INTEGER", nullable: false),
                    AmountPreparedProduction = table.Column<int>(type: "INTEGER", nullable: false),
                    EquipmentCode = table.Column<int>(type: "INTEGER", nullable: false),
                    WareHouseRawMaterialCode = table.Column<int>(type: "INTEGER", nullable: false),
                    WareHousePreparedMaterialCode = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductionOperations", x => x.Number);
                    table.ForeignKey(
                        name: "FK_ProductionOperations_Equipment_EquipmentCode",
                        column: x => x.EquipmentCode,
                        principalTable: "Equipment",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductionOperations_Materials_PreparedMaterialCode",
                        column: x => x.PreparedMaterialCode,
                        principalTable: "Materials",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductionOperations_ProductionOrders_OrderNumber",
                        column: x => x.OrderNumber,
                        principalTable: "ProductionOrders",
                        principalColumn: "Number",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductionOperations_WareHouses_WareHousePreparedMaterialCode",
                        column: x => x.WareHousePreparedMaterialCode,
                        principalTable: "WareHouses",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductionOperations_WareHouses_WareHouseRawMaterialCode",
                        column: x => x.WareHouseRawMaterialCode,
                        principalTable: "WareHouses",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DocumentsMovementMaterials_ContractorCode",
                table: "DocumentsMovementMaterials",
                column: "ContractorCode");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentsMovementMaterials_MaterialCode",
                table: "DocumentsMovementMaterials",
                column: "MaterialCode");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentsMovementMaterials_OrderNumber",
                table: "DocumentsMovementMaterials",
                column: "OrderNumber");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentsMovementMaterials_StaffCode",
                table: "DocumentsMovementMaterials",
                column: "StaffCode");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentsMovementMaterials_TypeMovementMaterialCode",
                table: "DocumentsMovementMaterials",
                column: "TypeMovementMaterialCode");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentsMovementMaterials_WareHouseRecipientCode",
                table: "DocumentsMovementMaterials",
                column: "WareHouseRecipientCode");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentsMovementMaterials_WareHouseSenderCode",
                table: "DocumentsMovementMaterials",
                column: "WareHouseSenderCode");

            migrationBuilder.CreateIndex(
                name: "IX_ProductionOperations_EquipmentCode",
                table: "ProductionOperations",
                column: "EquipmentCode");

            migrationBuilder.CreateIndex(
                name: "IX_ProductionOperations_OrderNumber",
                table: "ProductionOperations",
                column: "OrderNumber");

            migrationBuilder.CreateIndex(
                name: "IX_ProductionOperations_PreparedMaterialCode",
                table: "ProductionOperations",
                column: "PreparedMaterialCode");

            migrationBuilder.CreateIndex(
                name: "IX_ProductionOperations_WareHousePreparedMaterialCode",
                table: "ProductionOperations",
                column: "WareHousePreparedMaterialCode");

            migrationBuilder.CreateIndex(
                name: "IX_ProductionOperations_WareHouseRawMaterialCode",
                table: "ProductionOperations",
                column: "WareHouseRawMaterialCode");

            migrationBuilder.CreateIndex(
                name: "IX_ProductionOrders_ContractorCode",
                table: "ProductionOrders",
                column: "ContractorCode");

            migrationBuilder.CreateIndex(
                name: "IX_ProductionOrders_MaterialCode",
                table: "ProductionOrders",
                column: "MaterialCode");

            migrationBuilder.CreateIndex(
                name: "IX_ProductionOrders_StaffCode",
                table: "ProductionOrders",
                column: "StaffCode");

            migrationBuilder.CreateIndex(
                name: "IX_TechnologicalMaps_EquipmentCode",
                table: "TechnologicalMaps",
                column: "EquipmentCode");

            migrationBuilder.CreateIndex(
                name: "IX_TechnologicalMaps_PreparedMaterialCode",
                table: "TechnologicalMaps",
                column: "PreparedMaterialCode");

            migrationBuilder.CreateIndex(
                name: "IX_TechnologicalMaps_RawMaterialCode",
                table: "TechnologicalMaps",
                column: "RawMaterialCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DocumentsMovementMaterials");

            migrationBuilder.DropTable(
                name: "ProductionOperations");

            migrationBuilder.DropTable(
                name: "TechnologicalMaps");

            migrationBuilder.DropTable(
                name: "ProductionOrders");
        }
    }
}
