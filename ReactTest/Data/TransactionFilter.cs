using ReactTest.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactTest.Data
{
    public class TransactionFilter
    {
        public TransactionStatus? TransactionStatus { get; set; }
        public TransactionType? TransactionType { get; set; }
    }
}
