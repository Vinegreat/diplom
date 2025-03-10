using System.ComponentModel.DataAnnotations;

namespace Proect_practika_leto.DTO.ProductionOrders
{
    public class OrderEditDTO
    {
        [Required]
        public int СontractorCode { get; set; }

        [Required]
        public int MaterialCode { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public DateTime PlannedCompletionDate { get; set; }

        [Required]
        public int StaffCode { get; set; }

        [Required]
        public int OrderNumber { get; set; }

        
        public DateTime? ActualDateCompletion { get; set; }
    }
}
