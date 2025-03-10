using System.ComponentModel.DataAnnotations;

namespace Proect_practika_leto.Entities
{
    public class Equipment
    {
        [Key]
        public int Code { get; set; }

        public string Name { get; set; }
    }
}
