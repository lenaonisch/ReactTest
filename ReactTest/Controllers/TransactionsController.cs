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
        public async Task<FileStreamResult> FileAsync(/*TransactionFilter filter*/)
        {
            var dir = Directory.GetCurrentDirectory();
            string fileName = DateTime.Now.ToString("MMddyyyyHHmm") + ".csv";
            string filePath = dir + "\\ClientApp\\public\\resources\\" + fileName;

            //using ()
            //{

            using (var memoryStream = new MemoryStream())
            { 
                //using (var writer = new StreamWriter(memoryStream))
                //{
                var writer = new StreamWriter(memoryStream);
                var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);
            
                //var transactions = (await _transactionsRepository.GetWhere(t => t.SutisfyFilter(filter)));
                var transactions = await _transactionsRepository.GetAllAsync();

                csv.WriteRecords(transactions);
                csv.Flush();
                memoryStream.Position = 0;
                return new FileStreamResult(memoryStream, "text/csv");

                //HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                //result.Content = new StreamContent(memoryStream);
                //result.Content.Headers.ContentType = new MediaTypeHeaderValue("text/csv");
                //result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment") { FileName = "Export.csv" };

                //return result;

                // return File(memoryStream, "text/csv", fileName);
                // }
                //writer.Flush();
            }
            
            //var mimeType = "text/csv";
            //FileStreamResult fileStreamResult = null;
            //using (var stream = System.IO.File.Open(filePath, FileMode.Open))
            //{
            //    fileStreamResult = new FileStreamResult(stream, mimeType)
            //    {
            //        FileDownloadName = fileName
            //    };
            //}
            //return fileStreamResult;
        }
    }
}
