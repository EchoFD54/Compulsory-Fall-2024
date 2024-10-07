using DataAccess.Models;
using Moq;
using Xunit;
using Service.Services;

public class AppServiceTest
{
    private readonly Mock<IAppRepository> _appRepositoryMock;
    
    private readonly AppService _appService;

    public AppServiceTest(){
        _appRepositoryMock = new Mock<IAppRepository>();
        _appService = new AppService(_appRepositoryMock.Object);
    }

    [Fact]
    public void CreateCustomerTest(){
        var createCustomerDto = new CreateCustomerDto
        {
            Name = "Jose",
            Address = "Piedecuesta",
            Email = "eljose@gmail.com",
            Phone = "3162456987"
        };
  
        var customer = new Customer
        {
            Id = 1,
            Name = "Jose",
            Address = "Piedecuesta",
            Email = "eljose@gmail.com",
            Phone = "3162456987"
        };
         
        _appRepositoryMock
            .Setup(repo => repo.CreateCustomer(It.IsAny<Customer>()))
            .Returns(customer);

        
        var result = _appService.CreateCustomer(createCustomerDto);

        Assert.Equal(1, result.Id);
        Assert.Equal("Jose", result.Name);
        Assert.Equal("Piedecuesta", result.Address);
        Assert.Equal("eljose@gmail.com", result.Email);
        Assert.Equal("3162456987", result.Phone);

        _appRepositoryMock.Verify(repo => repo.CreateCustomer(It.IsAny<Customer>()), Times.Once);
    }
}