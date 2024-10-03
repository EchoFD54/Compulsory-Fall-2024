namespace tests;

using Moq;
using Xunit;
using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Bogus;
using PgCtx;

public class AppRepositoryTests{

    //test setup
    private readonly PgCtxSetup<AppDbContext> setup = new();
    public static Paper GetPaper(){
        return new Faker<Paper>()
        .RuleFor(p => p.Name, f => f.Name.FullName())
        .RuleFor(p => p.Discontinued, f => true)
        .RuleFor(p => p.Stock, f => f.Random.Int(1,50))
        .RuleFor(p => p.Price, f => f.Random.Int(1,50));
    }

    public static Customer GetCustomer(){
        return new Faker<Customer>()
        .RuleFor(c => c.Name, f => f.Name.FullName())
        .RuleFor(c => c.Address, f => f.Address.FullAddress())
        .RuleFor(c => c.Phone, f => f.Phone.PhoneNumber());
        //get an error wehn testing email
        //.RuleFor(c => c.Email, f => f.ToString());
        
    }

    public static Order GetOrder(){
        return new Faker<Order>()
        //get error when testing order date
        //.RuleFor(o => o.OrderDate, f => f.DateTimeReference)
        .RuleFor(o => o.DeliveryDate, f => f.Date.FutureDateOnly())
        .RuleFor(o => o.Status, f => f.ToString())
        .RuleFor(o => o.TotalAmount, f => f.Random.Double(1, 50));
    }


    //tests
    [Fact]
    public void GetAllPapers_ReturnAllPapers(){
        setup.DbContextInstance.Database.EnsureCreated();
        var papers = new List<Paper>{
            GetPaper(),
            GetPaper()
    };

    setup.DbContextInstance.Papers.AddRange(papers);
    setup.DbContextInstance.SaveChanges();

    var result = new AppRepository(setup.DbContextInstance).GetAllPapers();

    Assert.Equivalent(papers, result);
    }

    [Fact]
    public void GetAllCustomers_ReturnAllCustomers()
    {
        setup.DbContextInstance.Database.EnsureCreated();
        var cutomers = new List<Customer>{
            GetCustomer(),
            GetCustomer()
        };

        setup.DbContextInstance.Customers.AddRange(cutomers);
        setup.DbContextInstance.SaveChanges();

        var result = new AppRepository(setup.DbContextInstance).GetAllCustomers();

        Assert.Equivalent(cutomers, result);
    }

    [Fact]
    public void GetAllOrders_ReturnAllOrders()
    {
        setup.DbContextInstance.Database.EnsureCreated();
        var orders = new List<Order>{
            GetOrder(),
            GetOrder()
        };

        setup.DbContextInstance.Orders.AddRange(orders);
        setup.DbContextInstance.SaveChanges();

        var result = new AppRepository(setup.DbContextInstance).GetAllOrders();

        Assert.Equivalent(orders, result);
    }


    
}