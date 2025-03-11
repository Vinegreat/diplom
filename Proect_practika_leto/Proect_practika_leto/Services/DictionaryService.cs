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
        public async Task<List<Contractor>> GetContractorsAsync()
        {
            return await dbPractickaContext.Contractors
                .ToListAsync();
        }

        public async Task<List<Staff>> GetStaffAsync()
        {
            return await dbPractickaContext.Staff
                .ToListAsync();
        }

        public async Task<List<Equipment>> GetEquipmentAsync()
        {
            return await dbPractickaContext.Equipment
                .ToListAsync();
        }

        public async Task<List<WareHouse>> GetWareHouseAsync()
        {
            return await dbPractickaContext.WareHouses
                .ToListAsync();
        }

        public async Task<List<ProductionOrder>> GetProductionOrderAsync()
        {
            return await dbPractickaContext.ProductionOrders
                .ToListAsync();
        }
    }
}
