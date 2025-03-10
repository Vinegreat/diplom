using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Proect_practika_leto.DTO.TechnologicalMaps;
using Proect_practika_leto.Entities;


namespace Proect_practika_leto.Services
{
    public class TechnologicalMapService
    {
        private readonly DbPractickaContext _dbcontext;
        private readonly IMapper _mapper;

        // Конструктор, принимающий контекст базы данных и AutoMapper
        public TechnologicalMapService(DbPractickaContext dbcontext, IMapper mapper)
        {
            _dbcontext = dbcontext;
            _mapper = mapper;
        }

        // Метод для получения всех технологических карт
        public async Task<List<TechnologicalMap>> GetAll()
        {
            return await _dbcontext.TechnologicalMaps
                .Include(x=>x.RawMaterial)
                .Include(x=>x.Equipment)
                .Include(x=>x.PreparedMaterial)
                .ToListAsync();
        }

        // Метод для добавления новой технологической карты
        public async Task<int> AddNew(TechnologicalMapAddDTO technologicalMapAddDTO)
        {
            var technologicalMap = _mapper.Map<TechnologicalMap>(technologicalMapAddDTO);
            await _dbcontext.TechnologicalMaps.AddAsync(technologicalMap);
            await _dbcontext.SaveChangesAsync();
            return technologicalMap.Code;  // Возвращаем код добавленной технологической карты
        }

        // Метод для обновления существующей технологической карты
        public async Task Update(TechnologicalMapEditDTO technologicalMapEditDTO)
        {
            var technologicalMap = await GetTechnologicalMapAsync(technologicalMapEditDTO.Code);
            if (technologicalMap == null) return;  // Если карта не найдена, просто выходим

            _mapper.Map(technologicalMapEditDTO, technologicalMap);
            _dbcontext.TechnologicalMaps.Update(technologicalMap);
            await _dbcontext.SaveChangesAsync();
        }

        // Метод для получения технологической карты по ее коду
        public async Task<TechnologicalMap?> GetTechnologicalMapAsync(int code)
        {
            return await _dbcontext.TechnologicalMaps.FirstOrDefaultAsync(x => x.Code == code);
        }
    }
}