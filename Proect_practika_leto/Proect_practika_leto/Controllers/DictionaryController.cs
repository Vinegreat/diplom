using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proect_practika_leto.Services;

namespace Proect_practika_leto.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DictionaryController (DictionaryService dictionaryService) : ControllerBase
    {
        [HttpGet]

        public async Task<JsonResult> GetMaterials() 
        {
            return new JsonResult(await dictionaryService.GetMaterialsAsync());
        }

        [HttpGet]

        public async Task<JsonResult> GetContractor()
        {
            return new JsonResult(await dictionaryService.GetContractorsAsync());
        }

        [HttpGet]

        public async Task<JsonResult> GetStaff()
        {
            return new JsonResult(await dictionaryService.GetStaffAsync());
        }

        [HttpGet]

        public async Task<JsonResult> GetEquipment()
        {
            return new JsonResult(await dictionaryService.GetEquipmentAsync());
        }

        [HttpGet]

        public async Task<JsonResult> GetWareHouse()
        {
            return new JsonResult(await dictionaryService.GetWareHouseAsync());
        }
        
        [HttpGet]

        public async Task<JsonResult> GetProductionOrder()
        {
            return new JsonResult(await dictionaryService.GetProductionOrderAsync());
        }
    }
}
