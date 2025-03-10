using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proect_practika_leto.DTO.ProductionOrders;
using Proect_practika_leto.Entities;
using Proect_practika_leto.Services;

namespace Proect_practika_leto.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrdersController(ProductionOrderService productionOrderService) : ControllerBase
    {
        [HttpGet]
        public async Task<JsonResult> GetAll() {
            return new(await productionOrderService.GetAll()); 
        }
        [HttpPost]
        public async Task<JsonResult> Add(OrderAddDTO orderAddDTO)
        {
            return new(await productionOrderService.AddNew(orderAddDTO));
        }
        [HttpPost]
        public async Task<IActionResult> Edit(OrderEditDTO orderEditDTO)
        {
             await productionOrderService.Update(orderEditDTO);
            
            return Ok(orderEditDTO);
        }
    }
}
