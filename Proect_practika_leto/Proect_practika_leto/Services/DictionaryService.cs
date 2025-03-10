using Microsoft.EntityFrameworkCore;
using Proect_practika_leto.Entities;

namespace Proect_practika_leto.Services
{
    public class DictionaryService (DbPractickaContext dbPractickaContext) 
    {
        public async Task<List<Material>> GetMaterialsAsync()
        {
            return await dbPractickaContext.Materials
                .Include(x => x.MeasurementUnit)
                .ToListAsync();
        }
    }
}
