using System.ComponentModel.DataAnnotations;

namespace Proect_practika_leto.DTO.ProductionOperations
{
    public class DocumentsMovementMaterialAddDTO
    {
        public DateOnly DateDocument { get; set; }
        public DateOnly DateDocumentCreated { get; set; }
        public int TypeMovementMaterialCode { get; set; }
        public int MaterialCode { get; set; }
        public int QuantityMaterial { get; set; }
        public int WareHouseSenderCode { get; set; }
        public int WareHouseRecipientCode { get; set; }
        public int ProductionCode { get; set; }
        public int ContractorCode { get; set; }
        public int StaffCode { get; set; }
    }
}
