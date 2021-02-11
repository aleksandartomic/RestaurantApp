using RestourantAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestourantAPI.Data
{
    public interface IFoodRepository
    {
        Task<IEnumerable<Food>> GetFood(string category);
    }
}
