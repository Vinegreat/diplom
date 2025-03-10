using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Proect_practika_leto.Entities
{
    public class TechnologicalMap
    {
        [Key]
        public int Code { get; set; }

        public Equipment Equipment { get; set; }

        [ForeignKey(nameof(Equipment))]
        public int EquipmentCode { get; set; }

        public Material PreparedMaterial { get; set; }

        [ForeignKey(nameof(Material))]
        public int PreparedMaterialCode { get; set; }

        public int QuantityPreparedMaterial { get; set; }

        public Material RawMaterial { get; set; }

        [ForeignKey(nameof(Material))]
        public int RawMaterialCode { get; set; }

        public int QuantityRawMaterial { get; set; }
    }
}
