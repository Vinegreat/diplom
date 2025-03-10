using System.ComponentModel.DataAnnotations;

namespace Proect_practika_leto.DTO.ProductionOperations
{
    public class ProductionOperationEditDTO
    {
        [Required]
        public int Number { get; set; } // Идентификатор операции, который нужен для обновления

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