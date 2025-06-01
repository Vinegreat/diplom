// Controllers/RawMaterialArrivalController.cs
using Microsoft.AspNetCore.Mvc;
using Proect_practika_leto.DTO.RawMaterialArrival;

[ApiController]
[Route("api/[controller]")]
public class RawMaterialArrivalController : ControllerBase
{
    private readonly RawMaterialArrivalService _service;

    public RawMaterialArrivalController(RawMaterialArrivalService service)
    {
        _service = service;
    }

    [HttpGet("GetAll")]
    public async Task<IActionResult> GetAll() =>
        Ok(await _service.GetAllAsync());

    [HttpPost("Add")]
    public async Task<IActionResult> Add(RawMaterialArrivalAddDTO dto)
    {
        var id = await _service.AddAsync(dto);
        return Ok(new { id });
    }

    [HttpPost("Edit")]
    public async Task<IActionResult> Edit(RawMaterialArrivalEditDTO dto)
    {
        await _service.UpdateAsync(dto);
        return Ok();
    }

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return Ok();
    }
}
