﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Proect_practika_leto.Services;

#nullable disable

namespace Proect_practika_leto.Migrations
{
    [DbContext(typeof(DbPractickaContext))]
    [Migration("20240823151343_2")]
    partial class _2
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.8");

            modelBuilder.Entity("Proect_practika_leto.Entities.DocumentsMovementMaterial", b =>
                {
                    b.Property<int>("Code")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly>("DateDocument")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateDocumentCreated")
                        .HasColumnType("TEXT");

                    b.Property<int>("MaterialCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("OrderNumber")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProductionCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("QuantityMaterial")
                        .HasColumnType("INTEGER");

                    b.Property<int>("StaffCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TypeMovementMaterialCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WareHouseRecipientCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WareHouseSenderCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ContractorCode")
                        .HasColumnType("INTEGER");

                    b.HasKey("Code");

                    b.HasIndex("MaterialCode");

                    b.HasIndex("OrderNumber");

                    b.HasIndex("StaffCode");

                    b.HasIndex("TypeMovementMaterialCode");

                    b.HasIndex("WareHouseRecipientCode");

                    b.HasIndex("WareHouseSenderCode");

                    b.HasIndex("ContractorCode");

                    b.ToTable("DocumentsMovementMaterials");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.Equipment", b =>
                {
                    b.Property<int>("Code")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Code");

                    b.ToTable("Equipment");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.Material", b =>
                {
                    b.Property<int>("Code")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("MeasurementUnitCode")
                        .HasColumnType("INTEGER");

                    b.Property<string>("NameMaterial")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Code");

                    b.HasIndex("MeasurementUnitCode");

                    b.ToTable("Materials");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.MeasurementUnit", b =>
                {
                    b.Property<int>("Code")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Code");

                    b.ToTable("MeasurementUnits");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.ProductionOperation", b =>
                {
                    b.Property<int>("Number")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AmountPreparedProduction")
                        .HasColumnType("INTEGER");

                    b.Property<int>("EquipmentCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("OrderCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PreparedMaterialCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WareHousePreparedMaterialCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WareHouseRawMaterialCode")
                        .HasColumnType("INTEGER");

                    b.HasKey("Number");

                    b.HasIndex("EquipmentCode");

                    b.HasIndex("OrderCode");

                    b.HasIndex("PreparedMaterialCode");

                    b.HasIndex("WareHousePreparedMaterialCode");

                    b.HasIndex("WareHouseRawMaterialCode");

                    b.ToTable("ProductionOperations");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.ProductionOrder", b =>
                {
                    b.Property<int>("Number")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("ActualDateCompletion")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<int>("MaterialCode")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("PlannedCompletionDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");

                    b.Property<int>("StaffCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ContractorCode")
                        .HasColumnType("INTEGER");

                    b.HasKey("Number");

                    b.HasIndex("MaterialCode");

                    b.HasIndex("StaffCode");

                    b.HasIndex("ContractorCode");

                    b.ToTable("ProductionOrders");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.Staff", b =>
                {
                    b.Property<int>("Code")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Code");

                    b.ToTable("Staff");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.TechnologicalMap", b =>
                {
                    b.Property<int>("Code")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("EquipmentCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PreparedMaterialCode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("QuantityPreparedMaterial")
                        .HasColumnType("INTEGER");

                    b.Property<int>("QuantityRawMaterial")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RawMaterialCode")
                        .HasColumnType("INTEGER");

                    b.HasKey("Code");

                    b.HasIndex("EquipmentCode");

                    b.HasIndex("PreparedMaterialCode");

                    b.HasIndex("RawMaterialCode");

                    b.ToTable("TechnologicalMaps");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.TypeMovementMaterial", b =>
                {
                    b.Property<int>("Code")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Code");

                    b.ToTable("TypeMovementMaterials");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.WareHouse", b =>
                {
                    b.Property<int>("Code")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Code");

                    b.ToTable("WareHouses");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.Сontractor", b =>
                {
                    b.Property<int>("Code")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ContactFace")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("INN")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Code");

                    b.HasIndex("INN");

                    b.ToTable("Contractors");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.DocumentsMovementMaterial", b =>
                {
                    b.HasOne("Proect_practika_leto.Entities.Material", "Material")
                        .WithMany()
                        .HasForeignKey("MaterialCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.ProductionOrder", "Order")
                        .WithMany()
                        .HasForeignKey("OrderNumber")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.Staff", "Staff")
                        .WithMany()
                        .HasForeignKey("StaffCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.TypeMovementMaterial", "TypeMovementsMaterial")
                        .WithMany()
                        .HasForeignKey("TypeMovementMaterialCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.WareHouse", "WareHouseRecipient")
                        .WithMany()
                        .HasForeignKey("WareHouseRecipientCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.WareHouse", "WareHouseSender")
                        .WithMany()
                        .HasForeignKey("WareHouseSenderCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.Сontractor", "Сontractor")
                        .WithMany()
                        .HasForeignKey("ContractorCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Material");

                    b.Navigation("Order");

                    b.Navigation("Staff");

                    b.Navigation("TypeMovementsMaterial");

                    b.Navigation("WareHouseRecipient");

                    b.Navigation("WareHouseSender");

                    b.Navigation("Сontractor");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.Material", b =>
                {
                    b.HasOne("Proect_practika_leto.Entities.MeasurementUnit", "MeasurementUnit")
                        .WithMany()
                        .HasForeignKey("MeasurementUnitCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MeasurementUnit");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.ProductionOperation", b =>
                {
                    b.HasOne("Proect_practika_leto.Entities.Equipment", "Equipment")
                        .WithMany()
                        .HasForeignKey("EquipmentCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.ProductionOrder", "Order")
                        .WithMany()
                        .HasForeignKey("OrderCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.Material", "PreparedMaterial")
                        .WithMany()
                        .HasForeignKey("PreparedMaterialCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.WareHouse", "WareHousePreparedMaterial")
                        .WithMany()
                        .HasForeignKey("WareHousePreparedMaterialCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.WareHouse", "WareHouseRawMaterial")
                        .WithMany()
                        .HasForeignKey("WareHouseRawMaterialCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Equipment");

                    b.Navigation("Order");

                    b.Navigation("PreparedMaterial");

                    b.Navigation("WareHousePreparedMaterial");

                    b.Navigation("WareHouseRawMaterial");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.ProductionOrder", b =>
                {
                    b.HasOne("Proect_practika_leto.Entities.Material", "Material")
                        .WithMany()
                        .HasForeignKey("MaterialCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.Staff", "Staff")
                        .WithMany()
                        .HasForeignKey("StaffCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.Сontractor", "Сontractor")
                        .WithMany()
                        .HasForeignKey("ContractorCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Material");

                    b.Navigation("Staff");

                    b.Navigation("Сontractor");
                });

            modelBuilder.Entity("Proect_practika_leto.Entities.TechnologicalMap", b =>
                {
                    b.HasOne("Proect_practika_leto.Entities.Equipment", "Equipment")
                        .WithMany()
                        .HasForeignKey("EquipmentCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.Material", "PreparedMaterial")
                        .WithMany()
                        .HasForeignKey("PreparedMaterialCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proect_practika_leto.Entities.Material", "RawMaterial")
                        .WithMany()
                        .HasForeignKey("RawMaterialCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Equipment");

                    b.Navigation("PreparedMaterial");

                    b.Navigation("RawMaterial");
                });
#pragma warning restore 612, 618
        }
    }
}
