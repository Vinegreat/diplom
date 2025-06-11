// Services/RawMaterialArrivalService.cs
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Proect_practika_leto.DTO.RawMaterialArrival;
using Proect_practika_leto.Services;

public class RawMaterialArrivalService(DbPractickaContext context, IMapper mapper)
{
    public async Task<List<RawMaterialArrival>> GetAllAsync()
    {
        return await context.RawMaterialArrivals
            .Include(x => x.Material)
            .ThenInclude(x => x.MeasurementUnit)
            .Include(x => x.WareHouse)
            .ToListAsync();
    }

    public async Task<RawMaterialArrival?> GetAsync(int id)
    {
        return await context.RawMaterialArrivals.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<int> AddAsync(RawMaterialArrivalAddDTO dto)
    {
        var entity = mapper.Map<RawMaterialArrival>(dto);
        await context.RawMaterialArrivals.AddAsync(entity);
        await context.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(RawMaterialArrivalEditDTO dto)
    {
        var entity = await GetAsync(dto.Id);
        if (entity == null) return;

        mapper.Map(dto, entity);
        context.RawMaterialArrivals.Update(entity);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await GetAsync(id);
        if (entity == null) return;

        context.RawMaterialArrivals.Remove(entity);
        await context.SaveChangesAsync();
    }
}
