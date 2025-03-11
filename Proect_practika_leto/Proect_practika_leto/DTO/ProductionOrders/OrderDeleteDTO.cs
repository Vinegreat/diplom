using Proect_practika_leto.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Proect_practika_leto.DTO.ProductionOrders
{
    public class OrderDeleteDTO
    { 
            [Key]
            public int Number { get; set; }

            public DateTime Date { get; set; }

            public Contractor Contractor { get; set; }

            [ForeignKey(nameof(Contractor))]
            public int ContractorCode { get; set; }

            public Material Material { get; set; }

            [ForeignKey(nameof(Material))]
            public int MaterialCode { get; set; }

            public int Quantity { get; set; }

            public DateTime PlannedCompletionDate { get; set; }

            public DateTime ActualDateCompletion { get; set; }

            public Staff Staff { get; set; }
            [ForeignKey(nameof(Staff))]
            public int StaffCode { get; set; }
        }
    }