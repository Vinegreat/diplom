// DTO/RawMaterialArrival/RawMaterialArrivalAddDTO.cs
using System.ComponentModel.DataAnnotations;

public class RawMaterialArrivalAddDTO
{
    [Required]
    public DateOnly Date { get; set; }

    [Required]
    public int MaterialCode { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    public int WarehouseCode { get; set; }
}