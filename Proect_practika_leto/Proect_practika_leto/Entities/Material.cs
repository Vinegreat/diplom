using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Proect_practika_leto.Entities
{
    public class Material
    {
        [Key]
        public int Code { get; set; }

        public string NameMaterial { get; set; }

        public  MeasurementUnit MeasurementUnit { get; set; }
        
        [ForeignKey(nameof(MeasurementUnit))]
        public int MeasurementUnitCode { get; set; }
    }
}
