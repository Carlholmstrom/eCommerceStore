using AutoMapper;
using eCommerceStore.API.Dto;
using eCommerceStore.API.Dto.Incoming;
using eCommerceStore.API.Dto.Outgoing;
using eCommerceStore.API.Models;

namespace eCommerceStore.API.Helper;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<RegisterDto, User>();
        CreateMap<User, UserDto>();
        CreateMap<Store, StoreDto>();
        CreateMap<Product, ProductListDto>();
        CreateMap<StoreCreateDto, Store>();
        CreateMap<Product, UpdatedProductDto>()
            .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
            .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity));
        
 
    }
}