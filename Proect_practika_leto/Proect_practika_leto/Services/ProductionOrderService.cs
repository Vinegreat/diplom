using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Proect_practika_leto.DTO.ProductionOrders;
using Proect_practika_leto.Entities;

namespace Proect_practika_leto.Services
{
    public class ProductionOrderService(DbPractickaContext dbcontext,IMapper mapper)
    {
        public async Task<List<ProductionOrder>> GetAll() { 
            return await dbcontext.ProductionOrders.Include(x=>x.Material).Include(x=>x.Contractor).Include(x=>x.Staff).ToListAsync();
        }
        public async Task<int> AddNew(OrderAddDTO orderAddDTO )
        {
            var order = mapper.Map<ProductionOrder>( orderAddDTO );
            order.Date = DateTime.Now;
            await dbcontext.ProductionOrders.AddAsync( order );
            await dbcontext.SaveChangesAsync();
            return order.Number;
        }
        public async Task Update(OrderEditDTO orderEditDTO) 
        {
            var order = await GetProductionOrderAsync(orderEditDTO.OrderNumber);
            if (order == null) return; 
            mapper.Map(orderEditDTO, order);
            dbcontext.ProductionOrders.Update( order );
            await dbcontext.SaveChangesAsync();
        }
        public async Task<ProductionOrder?>GetProductionOrderAsync(int numberid) 
        {
            return await dbcontext.ProductionOrders.FirstOrDefaultAsync(x=>x.Number==numberid);
        }
    }
}
