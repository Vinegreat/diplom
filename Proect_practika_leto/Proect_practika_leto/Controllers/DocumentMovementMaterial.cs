using Microsoft.AspNetCore.Mvc;
using Proect_practika_leto.DTO.ProductionOperations;
using Proect_practika_leto.Entities;

namespace Proect_practika_leto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsMovementMaterialController : ControllerBase
    {
        private readonly DocumentsMovementMaterialService _service;

        public DocumentsMovementMaterialController(DocumentsMovementMaterialService service)
        {
            _service = service;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<DocumentsMovementMaterial>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<DocumentsMovementMaterial>> Get(int code)
        {
            var item = await _service.GetAsync(code);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost("Add")]
        public async Task<ActionResult<int>> Add([FromBody] DocumentsMovementMaterialAddDTO dto)
        {
            var code = await _service.AddNew(dto);
            return Ok(code);
        }

        [HttpPost("Edit")]
        public async Task<IActionResult> Edit([FromBody] DocumentsMovementMaterialEditDTO dto)
        {
            await _service.Update(dto);
            return NoContent();
        }
    }
}
