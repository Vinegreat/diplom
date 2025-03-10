using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Proect_practika_leto.DTO.ProductionOperations;
using Proect_practika_leto.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Proect_practika_leto.Services
{
    public class ProductionOperationService(DbPractickaContext dbcontext, IMapper mapper)
    {
        // Получение всех операций производства
        public async Task<List<ProductionOperation>> GetAll()
        {
            return await dbcontext.ProductionOperations.ToListAsync();
        }

        // Добавление новой операции производства
        public async Task<int> AddNew(ProductionOperationAddDTO productionOperationAddDTO)
        {
            var operation = mapper.Map<ProductionOperation>(productionOperationAddDTO);
            await dbcontext.ProductionOperations.AddAsync(operation);
            await dbcontext.SaveChangesAsync();
            return operation.Number;
        }

        // Обновление существующей операции производства
        public async Task Update(ProductionOperationEditDTO productionOperationEditDTO)
        {
            var operation = await GetProductionOperationAsync(productionOperationEditDTO.Number);
            if (operation == null) return;

            mapper.Map(productionOperationEditDTO, operation);
            dbcontext.ProductionOperations.Update(operation);
            await dbcontext.SaveChangesAsync();
        }

        // Получение операции производства по её номеру
        public async Task<ProductionOperation?> GetProductionOperationAsync(int number)
        {
            return await dbcontext.ProductionOperations.FirstOrDefaultAsync(x => x.Number == number);
        }
    }
}