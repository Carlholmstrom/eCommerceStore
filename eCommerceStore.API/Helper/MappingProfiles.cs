using AutoMapper;
using eCommerceStore.API.Dto;
using eCommerceStore.API.Models;

namespace eCommerceStore.API.Helper;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<RegisterDto, User>();
        CreateMap<User, UserDto>();
        CreateMap<UserDto, User>();
    }
}