using AutoMapper;
using eCommerceStore.API.Dto;
using eCommerceStore.API.Models;

namespace eCommerceStore.API.Helper;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<User, RegisterDto>();
        CreateMap<RegisterDto, User>();
    }
}