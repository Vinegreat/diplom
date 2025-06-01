using Microsoft.EntityFrameworkCore;
using Proect_practika_leto.Entities;
using System.Diagnostics.Contracts;

namespace Proect_practika_leto.Services
{
    public class DbPractickaContext: DbContext
    {
        public DbPractickaContext(DbContextOptions opt): base(opt) { }

        public DbSet<Material> Materials { get; set; }

        public DbSet<MeasurementUnit> MeasurementUnits { get; set; }

        public DbSet<Contractor> Contractors  { get; set; }

        public DbSet<Staff> Staff { get; set; }

        public DbSet<TypeMovementMaterial> TypeMovementMaterials { get; set; }

        public DbSet<WareHouse> WareHouses { get; set; }

        public DbSet<Equipment> Equipment { get; set; }

        public DbSet<ProductionOrder> ProductionOrders { get; set; }

        public DbSet<TechnologicalMap> TechnologicalMaps { get; set; }

        public DbSet<DocumentsMovementMaterial> DocumentsMovementMaterials { get; set; }

        public DbSet<ProductionOperation> ProductionOperations { get; set; }

        public DbSet<RawMaterialArrival> RawMaterialArrivals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contractor>()
                .HasIndex(x => new { x.INN });
            base.OnModelCreating(modelBuilder);
        }
    }
}
