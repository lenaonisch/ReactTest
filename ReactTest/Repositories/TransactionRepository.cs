using ReactTest.Data;
using ReactTest.Data.Entities;

namespace ReactTest.Repositories
{
    public class TransactionRepository : EFRepositoryAsync<Transaction>
    {
        private readonly DataContext _context;

        public TransactionRepository(DataContext context) :
            base(context)
        {
            _context = context;
        }

    }
}