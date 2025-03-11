using Microsoft.AspNetCore.Mvc;
using Proect_practika_leto.Entities;
using Proect_practika_leto.Migrations;
using Proect_practika_leto.Services;

namespace Proect_practika_leto.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DataLoaderController(DbPractickaContext dbcontextenemy):ControllerBase
    {
        // Определение метода, который будет обрабатывать POST-запросы по маршруту "api/DataLoader/loadunits"
        [HttpPost]
        public async Task loadunits(List<WareHouse> units) 
        { 
            await dbcontextenemy.WareHouses.AddRangeAsync(units);

            await dbcontextenemy.SaveChangesAsync();
        } 
    }
}
