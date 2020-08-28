using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ReactTest.Data;

namespace ReactTest.Repositories
{
    public class EFRepositoryAsync<T> where T : class
    {
        private readonly DataContext _context;
        protected readonly DbSet<T> _dbSet;

        public EFRepositoryAsync(DataContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<IList<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync(); 
        }

        public async Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().Where(predicate).ToListAsync();
        }

        public void Remove(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public void Update(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
        }

        public async Task<T> GetByIdAsync(Guid Id)
        {
            return await _context.Set<T>().FindAsync(Id);
        }

        public async Task<T> AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);

            return entity;
        }

        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}