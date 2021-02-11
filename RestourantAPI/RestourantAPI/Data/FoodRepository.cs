using Microsoft.EntityFrameworkCore;
using RestourantAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestourantAPI.Data
{
    public class FoodRepository : IFoodRepository
    {
        private readonly DataContext _context;
        public FoodRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Food>> GetFood(string category)
        {
            var food = await _context.Foods.Where(c => c.Category == category).ToListAsync();

            return food;
        }
    }
}
