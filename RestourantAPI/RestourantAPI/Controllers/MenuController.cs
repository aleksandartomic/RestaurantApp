using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestourantAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestourantAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IFoodRepository _repository;
        public MenuController(IFoodRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("{category}", Name = "GetFood")]
        public async Task<IActionResult> GetFood(string category)
        {
            var food = await _repository.GetFood(category);

            if (food == null)
            {
                return Unauthorized();
            }

            return Ok(food);
        }
    }
}
