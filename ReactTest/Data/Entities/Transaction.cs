using System;
using System.Diagnostics.CodeAnalysis;

namespace ReactTest.Data.Entities
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public TransactionStatus TransactionStatus { get; set; }
        public TransactionType TransactionType { get; set; }
        public string ClientName { get; set; }
        public float Amount { get; set; }

        public bool SutisfyFilter(TransactionFilter filter)
        {
            if (filter.TransactionStatus != null && filter.TransactionStatus != TransactionStatus)
            {
                return false;
            }
            if (filter.TransactionType != null && filter.TransactionType != TransactionType)
            {
                return false;
            }
            return true;
        }
    }
}
