using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RestourantAPI.Data;
using RestourantAPI.Dtos;
using RestourantAPI.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RestourantAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repository, IMapper mapper, IConfiguration config)
        {
            _repository = repository;
            _mapper = mapper;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();

            if (await _repository.UserExist(userForRegisterDto.UserName))
            {
                return BadRequest("Username already exist");
            }

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForRegisterDto>(createdUser);

            return Ok(userToReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserforLoginDto userforLoginDto)
        {
            var userFromRepo = await _repository.Login(userforLoginDto.UserName.ToLower(), userforLoginDto.Password);

            if (userFromRepo == null)
            {
                return Unauthorized();
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userforLoginDto.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                    .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserforLoginDto>(userFromRepo);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }
    }
}
