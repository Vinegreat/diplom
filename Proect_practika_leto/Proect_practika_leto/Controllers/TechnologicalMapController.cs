using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proect_practika_leto.DTO.TechnologicalMaps;
using Proect_practika_leto.Entities;
using Proect_practika_leto.Services;

namespace Proect_practika_leto.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TechnologicalMapController(TechnologicalMapService technologicalMapService) : ControllerBase
    {
       // Получение всех технологических карт
        [HttpGet]
        public async Task<JsonResult> GetAll()
        {
            var technologicalMaps = await technologicalMapService.GetAll();
            return new JsonResult(technologicalMaps);
        }

        // Добавление новой технологической карты
        [HttpPost]
        public async Task<JsonResult> Add(TechnologicalMapAddDTO technologicalMapAddDTO)
        {
            var result = await technologicalMapService.AddNew(technologicalMapAddDTO);
            return new JsonResult(result);
        }

        // Редактирование существующей технологической карты
        [HttpPost]
        public async Task<IActionResult> Edit(TechnologicalMapEditDTO technologicalMapEditDTO)
        {
            await technologicalMapService.Update(technologicalMapEditDTO);
            return Ok(technologicalMapEditDTO);
        }
    }
}