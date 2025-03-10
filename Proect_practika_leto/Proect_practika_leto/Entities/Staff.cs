using System.ComponentModel.DataAnnotations;

namespace Proect_practika_leto.Entities
{
    public class Staff
    {
        [Key]
        public int Code { get; set; }

        public string FullName { get; set; }
    }
}
