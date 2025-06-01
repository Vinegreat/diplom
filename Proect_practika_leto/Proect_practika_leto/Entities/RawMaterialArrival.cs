// Entities/RawMaterialArrival.cs
using Proect_practika_leto.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class RawMaterialArrival
{
    [Key]
    public int Id { get; set; }

    public DateOnly Date { get; set; }

    [ForeignKey(nameof(Material))]
    public int MaterialCode { get; set; }
    public Material Material { get; set; }

    public int Quantity { get; set; }

    [ForeignKey(nameof(WareHouse))]
    public int WarehouseCode { get; set; }
    public WareHouse WareHouse { get; set; }
}
