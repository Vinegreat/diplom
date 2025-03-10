using Microsoft.AspNetCore.Mvc;
using Proect_practika_leto.DTO.ProductionOperations;
using Proect_practika_leto.Services;
using System.Threading.Tasks;

namespace Proect_practika_leto.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductionOperationsController(ProductionOperationService productionOperationService) : ControllerBase
    {
        // Получение всех операций производства
        [HttpGet]
        public async Task<JsonResult> GetAll()
        {
            var productionOperation = await productionOperationService.GetAll();
            return new JsonResult(productionOperation);
        }

        // Добавление новой операции производства
        [HttpPost]
        public async Task<JsonResult> Add(ProductionOperationAddDTO productionOperationAddDTO)
        {
            var result = await productionOperationService.AddNew(productionOperationAddDTO);
            return new JsonResult(result);
        }

        // Редактирование существующей операции производства
        [HttpPost]
        public async Task<IActionResult> Edit(ProductionOperationEditDTO productionOperationEditDTO)
        {
            await productionOperationService.Update(productionOperationEditDTO);
            return Ok(productionOperationEditDTO);
        }
    }
}