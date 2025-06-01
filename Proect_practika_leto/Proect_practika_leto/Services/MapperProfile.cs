using AutoMapper;
using Proect_practika_leto.DTO.ProductionOrders;
using Proect_practika_leto.DTO.TechnologicalMaps;
using Proect_practika_leto.DTO.ProductionOperations; // Добавлено для ProductionOperation
using Proect_practika_leto.Entities;

namespace Proect_practika_leto.Services
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            // Маппинг для ProductionOrder
            CreateMap<OrderAddDTO, ProductionOrder>();

            CreateMap<OrderEditDTO, ProductionOrder>()
                .ForMember(x => x.Number, opt => opt.MapFrom(xx => xx.OrderNumber));

            // Маппинг для TechnologicalMap
            CreateMap<TechnologicalMapAddDTO, TechnologicalMap>();

            CreateMap<TechnologicalMapEditDTO, TechnologicalMap>();

            // Маппинг для ProductionOperation
            CreateMap<ProductionOperationAddDTO, ProductionOperation>();

            CreateMap<ProductionOperationEditDTO, ProductionOperation>()
                .ForMember(x => x.Number, opt => opt.MapFrom(xx => xx.Number));
            //Маппинг для DocumentMovementMaterial
            CreateMap<DocumentsMovementMaterialAddDTO, DocumentsMovementMaterial>();

            CreateMap<DocumentsMovementMaterialEditDTO, DocumentsMovementMaterial>()
                .ForMember(dest => dest.Code, opt => opt.Ignore()); // если обновляется вручную

            CreateMap<RawMaterialArrivalAddDTO, RawMaterialArrival>();

        }
    }
}