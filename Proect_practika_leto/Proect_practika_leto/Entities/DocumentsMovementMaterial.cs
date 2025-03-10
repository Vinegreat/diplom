using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Proect_practika_leto.Entities
{
    public class DocumentsMovementMaterial
    {
        [Key]
        public int Code { get; set; }

        public DateOnly DateDocument { get; set; }

        public DateOnly DateDocumentCreated {  get; set; }

        public TypeMovementMaterial TypeMovementsMaterial { get; set; }

        [ForeignKey(nameof(TypeMovementMaterial))]
        public int TypeMovementMaterialCode { get; set; }

        public Material Material { get; set; }

        [ForeignKey(nameof(Material))]
        public int MaterialCode { get; set; }

        public int QuantityMaterial { get; set; }

        public WareHouse WareHouseSender { get; set; }

        [ForeignKey(nameof(WareHouse))]
        public int WareHouseSenderCode { get; set; }

        public WareHouse WareHouseRecipient { get; set; }

        [ForeignKey(nameof(WareHouse))]
        public int WareHouseRecipientCode { get; set; }

        public ProductionOrder Order { get; set; }

        [ForeignKey(nameof(ProductionOrder))]
        public int ProductionCode { get; set; }

        public Contractor Contractor { get; set; }

        [ForeignKey(nameof(Contractor))]
        public int ContractorCode { get; set; }

        public Staff Staff { get; set; }

        [ForeignKey(nameof(Staff))]
        public int StaffCode { get; set; }
    }
}
