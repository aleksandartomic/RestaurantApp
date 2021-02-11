using AutoMapper;
using RestourantAPI.Dtos;
using RestourantAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestourantAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>().ReverseMap();
            CreateMap<UserforLoginDto, User>().ReverseMap();
        }
    }
}
