namespace ReactTest.Data.Entities
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public TransactionStatus TransactionStatus { get; set; }
        public TransactionType TransactionType { get; set; }
        public string ClientName { get; set; }
        public float Amount { get; set; }
    }
}
