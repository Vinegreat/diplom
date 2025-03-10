using System.ComponentModel.DataAnnotations;

namespace Proect_practika_leto.DTO.TechnologicalMaps
{
    public class TechnologicalMapEditDTO
    {
        [Required]
        public int Code { get; set; }  // Добавлен ключевой идентификатор

        [Required]
        public int EquipmentCode { get; set; }

        [Required]
        public int PreparedMaterialCode { get; set; }

        [Required]
        public int QuantityPreparedMaterial { get; set; }

        [Required]
        public int RawMaterialCode { get; set; }

        [Required]
        public int QuantityRawMaterial { get; set; }
    }
}