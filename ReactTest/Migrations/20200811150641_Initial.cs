using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactTest.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    TransactionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionStatus = table.Column<int>(nullable: false),
                    TransactionType = table.Column<int>(nullable: false),
                    ClientName = table.Column<string>(nullable: true),
                    Amount = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.TransactionId);
                });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "TransactionId", "Amount", "ClientName", "TransactionStatus", "TransactionType" },
                values: new object[] { 1, 100f, "aa", 0, 0 });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "TransactionId", "Amount", "ClientName", "TransactionStatus", "TransactionType" },
                values: new object[] { 2, 200f, "aa", 1, 1 });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "TransactionId", "Amount", "ClientName", "TransactionStatus", "TransactionType" },
                values: new object[] { 3, 300f, "aa", 0, 0 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");
        }
    }
}
