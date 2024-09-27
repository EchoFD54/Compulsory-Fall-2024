using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.Extensions.Logging;

public interface IAppService{
    public PaperDto CreatePaper(CreatepaperDto createpaperDto);
    public List<Paper> GetAllPapers();
    public PaperDto DiscontinuePaper(int paperId);
    public PaperDto RestockPaper(int paperId, int newStock);

    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto);
    public List<Customer> GetAllCustomers();
    public CustomerDto GetCustomerByEmail(string email);

    public OrderDto CreateOrder(CreateOrderDto createOrderDto);
    public List<Order> GetAllOrders();
    public List<OrderDto> GetOrdersByCustomerId(int customerId);


}

public class AppService(
    ILogger<AppService> logger, 
    IAppRepository appRepository) : IAppService
{
    //Paper
    public PaperDto CreatePaper(CreatepaperDto createpaperDto){
        var paper = createpaperDto.ToPaper();
        Paper newPaper = appRepository.Createpaper(paper);
        return new PaperDto().FromEntity(newPaper);
    }

    public List<Paper> GetAllPapers(){
        return appRepository.GetAllPapers().ToList();
    }

    public PaperDto DiscontinuePaper(int paperId){
        var paper = appRepository.GetPaperById(paperId);
        if (paper == null) {
            throw new Exception($"Paper with ID {paperId} not found.");
        }
        paper.Discontinued = true;
        appRepository.Updatepaper(paper);
        return new PaperDto().FromEntity(paper);
    }

    public PaperDto RestockPaper(int paperId, int newStock) {
        var paper = appRepository.GetPaperById(paperId);
        if (paper == null) {
            throw new Exception($"Paper with ID {paperId} not found.");
        }
        paper.Stock += newStock;
        appRepository.Updatepaper(paper);
        return new PaperDto().FromEntity(paper);
    }

    //Customer
    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto){
        var customer = createCustomerDto.ToCustomer();
        Customer newCustomer = appRepository.CreateCustomer(customer);
        return new CustomerDto().FromEntity(newCustomer);
    }

    public List<Customer> GetAllCustomers(){
        return appRepository.GetAllCustomers().ToList();
    }

    public CustomerDto GetCustomerByEmail(string email){
        var customer = appRepository.GetCustomerByEmail(email);
        if(customer == null){
            throw new Exception("User doenst exist");
        }

        return new CustomerDto().FromEntity(customer);
    }

    //Order
    public OrderDto CreateOrder(CreateOrderDto createOrderDto){
        var customer = appRepository.GetCustomerById(createOrderDto.CustomerId);
        if(customer == null){
            throw new Exception("Customer not found");
        }

        foreach(var orderEntryDto in createOrderDto.OrderEntries){
            var product = appRepository.GetPaperById(orderEntryDto.ProductId);
            if(product == null){
                throw new Exception($"Product with ID {orderEntryDto.ProductId} not found.");
            }

            product.Stock -= orderEntryDto.Quantity;
            appRepository.Updatepaper(product);
        }
        var order = createOrderDto.ToOrder();
        order.Customer = customer;
        Order newOrder = appRepository.CreateOrder(order);
        return new OrderDto().FromEntity(newOrder);
    }

    public List<Order> GetAllOrders(){
        return appRepository.GetAllOrders().ToList();
    }

    public List<OrderDto> GetOrdersByCustomerId(int customerId){
    var orders = appRepository.GetOrdersByCustomerId(customerId);
    return orders.Select(order => new OrderDto().FromEntity(order)).ToList();
    }

    //Property
    public PropertyDto CreateProperty(CreatePropertyDto createPropertyDto){
        var property = createPropertyDto.ToProperty();
        Property newProperty = appRepository.CreateProperty(property);
        return new PropertyDto().FromEntity(newProperty);

    }
}