using System.ComponentModel.DataAnnotations;

namespace Proect_practika_leto.DTO.ProductionOrders
{
    public class OrderAddDTO
    {
        [Required]
        public int ContractorCode { get; set; }

        [Required]
        public int MaterialCode { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public DateTime PlannedCompletionDate { get; set; }

        [Required]
        public int StaffCode { get; set; }

        public DateTime? ActualDateCompletion { get; set; }
    }
}
