﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ReactTest.Data;

namespace ReactTest.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200811150641_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ReactTest.Data.Entities.Transaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<string>("ClientName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TransactionStatus")
                        .HasColumnType("int");

                    b.Property<int>("TransactionType")
                        .HasColumnType("int");

                    b.HasKey("TransactionId");

                    b.ToTable("Transactions");

                    b.HasData(
                        new
                        {
                            TransactionId = 1,
                            Amount = 100f,
                            ClientName = "aa",
                            TransactionStatus = 0,
                            TransactionType = 0
                        },
                        new
                        {
                            TransactionId = 2,
                            Amount = 200f,
                            ClientName = "aa",
                            TransactionStatus = 1,
                            TransactionType = 1
                        },
                        new
                        {
                            TransactionId = 3,
                            Amount = 300f,
                            ClientName = "aa",
                            TransactionStatus = 0,
                            TransactionType = 0
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
