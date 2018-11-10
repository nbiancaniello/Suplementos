using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Suplementos.WebAPI.Models
{
    public class SuplementosContext : DbContext
    {
        public SuplementosContext(DbContextOptions<SuplementosContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
