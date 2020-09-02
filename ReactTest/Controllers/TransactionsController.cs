using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using CsvHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using System.Net.Http.Headers;
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
        public async Task<IActionResult> FileAsync(/*TransactionFilter filter*/)
        {
            using (var memoryStream = new MemoryStream())
            {
                //var dir = Directory.GetCurrentDirectory();
                string fileName = DateTime.Now.ToString("MMddyyyyHHmm") + ".csv";
                //string filePath = dir + "\\ClientApp\\public\\resources\\" + fileName;
                using (var writer = new StreamWriter(memoryStream))
                {
                    using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                    {
                        //var transactions = (await _transactionsRepository.GetWhere(t => t.SutisfyFilter(filter)));
                        var transactions = await _transactionsRepository.GetAllAsync();

                        csv.WriteRecords(transactions);
                        csv.Flush();

                        //return new FileStreamResult(memoryStream, "text/csv");
                        return File(memoryStream, "text/csv", fileName);
                        //HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                        //result.Content = new StreamContent(memoryStream);
                        //result.Content.Headers.ContentType = new MediaTypeHeaderValue("text/csv");
                        //result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment") { FileName = "Export.csv" };
                        
                        //return result;
                    }
                }
            }
        }
    }
}
