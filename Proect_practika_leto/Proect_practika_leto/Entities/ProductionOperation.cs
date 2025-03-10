using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Proect_practika_leto.Entities
{
    public class ProductionOperation
    {
        [Key]
        public int Number {  get; set; }

        public ProductionOrder Order { get; set; }

        [ForeignKey(nameof(Order))]
        public int OrderCode { get; set; }

        public Material PreparedMaterial { get; set; }

        [ForeignKey(nameof(PreparedMaterial))]
        public int PreparedMaterialCode { get; set; }

        public int AmountPreparedProduction { get; set; }

        public Equipment Equipment { get; set; }

        [ForeignKey(nameof(Equipment))]
        public int EquipmentCode { get; set; }

        public WareHouse WareHouseRawMaterial { get; set; }

        [ForeignKey(nameof(WareHouseRawMaterial))]
        public int WareHouseRawMaterialCode { get; set; }

        public WareHouse WareHousePreparedMaterial { get; set; }

        [ForeignKey(nameof(WareHousePreparedMaterial))]
        public int WareHousePreparedMaterialCode { get; set; }
    }
}
