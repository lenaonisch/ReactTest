using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ReactTest.Data.Entities;

namespace ReactTest.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Transaction> Transactions { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Transaction>().HasData(
                new Transaction() { TransactionId = 1, TransactionStatus = TransactionStatus.Pending, TransactionType = TransactionType.Withdrawal, Amount = 100f, ClientName = "aa" },
                new Transaction() { TransactionId = 2, TransactionStatus = TransactionStatus.Completed, TransactionType = TransactionType.Refill, Amount = 200f, ClientName = "aa" },
                new Transaction() { TransactionId = 3, TransactionStatus = TransactionStatus.Pending, TransactionType = TransactionType.Withdrawal, Amount = 300f, ClientName = "aa" }
                );
        }
    }
}