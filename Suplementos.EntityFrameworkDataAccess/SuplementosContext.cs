using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Configuration;

namespace Suplementos.EntityFrameworkDataAccess
{
    class SuplementosContextFactory : IDbContextFactory<>
    {
        public SuplementosContext Create()
        {
            return new SuplementosContext(ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString);
        }
    }
}
