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
    }
}
