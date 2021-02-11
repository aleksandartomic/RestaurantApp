using Microsoft.EntityFrameworkCore;
using RestourantAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestourantAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Food> Foods { get; set; }
    }
}
