using System.ComponentModel.DataAnnotations;

namespace Proect_practika_leto.DTO.ProductionOperations
{
    public class ProductionOperationAddDTO
    {
        [Required]
        public int OrderCode { get; set; }

        [Required]
        public int PreparedMaterialCode { get; set; }

        [Required]
        public int AmountPreparedProduction { get; set; }

        [Required]
        public int EquipmentCode { get; set; }

        [Required]
        public int WareHouseRawMaterialCode { get; set; }

        [Required]
        public int WareHousePreparedMaterialCode { get; set; }
    }
}