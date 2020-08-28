using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReactTest.Data.Entities;
using ReactTest.Repositories;

namespace ReactTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionRepository _transactionsRepository;
        private readonly ILogger<TransactionsController> _logger;

        public TransactionsController(ILogger<TransactionsController> logger, TransactionRepository transactionsRepository)
        {
            _logger = logger;
            _transactionsRepository = transactionsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Transaction>> Get()
        {
            var transactions = await _transactionsRepository.GetAllAsync();
            return transactions;
        }

        [HttpGet("statuses")]
        public ActionResult<string[]> Statuses()
        {
            var values = Enum.GetNames(typeof(TransactionStatus));
            return Ok(values);
        }

        [HttpGet("types")]
        public ActionResult<string[]> Types()
        {
            var values = Enum.GetNames(typeof(TransactionType));
            return Ok(values);
        }
    }
}
