using System.ComponentModel.DataAnnotations;

namespace Proect_practika_leto.Entities
{
    public class Contractor
    {
        [Key]
        public int Code { get; set; }
        
        public string Name { get; set; }

        public string INN { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string ContactFace { get; set; }
    }
}
