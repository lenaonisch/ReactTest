using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CsvHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReactTest.Data;
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

        [HttpGet()]
        [Route("export")]
        public async Task<string> FileAsync(/*TransactionFilter filter*/)
        {
            //using (var memoryStream = new MemoryStream())
            //{
            var dir = Directory.GetCurrentDirectory();
            string filePath = dir + "\\ClientApp\\public\\resources\\" + DateTime.Now.ToString("MMddyyyyHHmm") + ".csv";
                using (var writer = new StreamWriter(filePath))
                {
                    using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                    {
                        //var transactions = (await _transactionsRepository.GetWhere(t => t.SutisfyFilter(filter)));
                        var transactions = await _transactionsRepository.GetAllAsync();

                        csv.WriteRecords(transactions);

                        return filePath;//File(fileName, "text/csv");
                    }
                }
            //}
        }
    }
}
