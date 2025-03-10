using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Proect_practika_leto.Entities
{
    public class ProductionOrder
    {
        [Key]
        public int Number { get; set; }

        public DateTime Date { get; set; }

        public Contractor Contractor { get; set; }

        [ForeignKey(nameof(Contractor))]
        public int СontractorCode { get; set; }

        public Material Material { get; set; }

        [ForeignKey(nameof(Material))]
        public int MaterialCode { get; set; }

        public int Quantity { get; set; }

        public DateTime PlannedCompletionDate { get; set; }

        public DateTime ActualDateCompletion  { get; set; }

        public Staff Staff { get; set; }
        [ForeignKey(nameof(Staff))]
        public int StaffCode { get;  set; }
    }
}
