using AutoMapper;
using Proect_practika_leto.DTO.ProductionOperations;
using Proect_practika_leto.Entities;
using Proect_practika_leto.Services;
using Microsoft.EntityFrameworkCore;


public class DocumentsMovementMaterialService(DbPractickaContext dbcontext, IMapper mapper)
{
    public async Task<List<DocumentsMovementMaterial>> GetAll()
    {
        return await dbcontext.DocumentsMovementMaterials
            .Include(x => x.Material)
            .Include(x => x.TypeMovementsMaterial)
            .Include(x => x.WareHouseSender)
            .Include(x => x.WareHouseRecipient)
            .Include(x => x.Order)
            .Include(x => x.Contractor)
            .Include(x => x.Staff)
            .ToListAsync();
    }

    public async Task<int> AddNew(DocumentsMovementMaterialAddDTO dto)
    {
        var entity = mapper.Map<DocumentsMovementMaterial>(dto);
        await dbcontext.DocumentsMovementMaterials.AddAsync(entity);
        await dbcontext.SaveChangesAsync();
        return entity.Code;
    }

    public async Task Update(DocumentsMovementMaterialEditDTO dto)
    {
        var entity = await dbcontext.DocumentsMovementMaterials.FirstOrDefaultAsync(x => x.Code == dto.Code);
        if (entity == null) return;

        mapper.Map(dto, entity);
        dbcontext.DocumentsMovementMaterials.Update(entity);
        await dbcontext.SaveChangesAsync();
    }

    public async Task<DocumentsMovementMaterial?> GetAsync(int code)
    {
        return await dbcontext.DocumentsMovementMaterials.FirstOrDefaultAsync(x => x.Code == code);
    }
}
