using System.ComponentModel.DataAnnotations;

namespace Proect_practika_leto.DTO.RawMaterialArrival
{
    public class RawMaterialArrivalEditDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public DateOnly Date { get; set; }

        [Required]
        public int MaterialCode { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public int WarehouseCode { get; set; }
    }
}
