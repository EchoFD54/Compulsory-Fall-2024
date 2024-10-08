using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.Extensions.Logging;

namespace Service.Services;
public interface IAppService{
    public PaperDto CreatePaper(CreatepaperDto createpaperDto);
    public List<PaperDto> GetAllPapers();
    public PaperDto DiscontinuePaper(int paperId);
    public PaperDto RestockPaper(int paperId, int newStock);
    public PaperDto GetPaperById(int paperId);

    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto);
    public List<Customer> GetAllCustomers();
    public CustomerDto GetCustomerByEmail(string email);

    public OrderDto CreateOrder(CreateOrderDto createOrderDto);
    public List<OrderDto> GetAllOrders();
    public List<OrderDto> GetOrdersByCustomerId(int customerId);
    public OrderDto ChangeOrderStatus(int orderId, string newStatus);
    public OrderDto ChangeOrderDeliveryDate(int orderId, DateOnly? newDate);

    public PropertyDto CreateProperty (CreatePropertyDto createPropertyDto);
     public List<Property> GetAllProperties();
      public void AssignPropertyToPaper(int paperId, int propertyId);



}

public class AppService(IAppRepository appRepository) : IAppService{
    //Paper
    public PaperDto CreatePaper(CreatepaperDto createpaperDto){
        var paper = createpaperDto.ToPaper();
        Paper newPaper = appRepository.Createpaper(paper);
        return new PaperDto().FromEntity(newPaper);
    }

    public List<PaperDto> GetAllPapers(){
        var papers = appRepository.GetAllPapers();
        return papers.Select(paper => new PaperDto().FromEntity(paper)).ToList();
    }

    public PaperDto DiscontinuePaper(int paperId){
        var paper = appRepository.GetPaperById(paperId);
        if (paper == null) {
            throw new Exception($"Paper with ID {paperId} not found.");
        }
         paper.Discontinued = !paper.Discontinued; 
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

    public PaperDto GetPaperById(int paperId)
    {
        var paper = appRepository.GetPaperById(paperId);
        if(paper == null){
            throw new Exception("Paper doesn't exist");
        }

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

    public void UpdateCustomer(int CustomerId){
        
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

    public List<OrderDto> GetAllOrders(){
        var orders = appRepository.GetAllOrders();
        return orders.Select(order => new OrderDto().FromEntity(order)).ToList();
    }

    public List<OrderDto> GetOrdersByCustomerId(int customerId){
    var orders = appRepository.GetOrdersByCustomerId(customerId);
    return orders.Select(order => new OrderDto().FromEntity(order)).ToList();
    }

    public OrderDto ChangeOrderStatus(int orderId, string newStatus){
         var order = appRepository.GetOrderById(orderId);
        if (order == null) {
            throw new Exception($"Order with ID {orderId} not found.");
        }
        order.Status = newStatus;
        
        appRepository.UpdateOrder(order);
        return new OrderDto().FromEntity(order);
    }

    public OrderDto ChangeOrderDeliveryDate(int orderId, DateOnly? newDate){
        var order = appRepository.GetOrderById(orderId);
        if (order == null) {
            throw new Exception($"Order with ID {orderId} not found.");
        }
        order.DeliveryDate = newDate;
        
        appRepository.UpdateOrder(order);
        return new OrderDto().FromEntity(order);
    }
    

    //Property
    public PropertyDto CreateProperty(CreatePropertyDto createPropertyDto){
        var property = createPropertyDto.ToProperty();
        Property newProperty = appRepository.CreateProperty(property);
        return new PropertyDto().FromEntity(newProperty);
    }

    public List<Property> GetAllProperties(){
        return appRepository.GetAllProperties().ToList();
    }

    public void AssignPropertyToPaper(int paperId, int propertyId){
    Console.WriteLine($"Assigning property {propertyId} to paper {paperId}");
    var paper = appRepository.GetPaperById(paperId);
    if (paper == null)
    {
        throw new Exception($"Invalid paper ID: {paperId}");
    }

    var property = appRepository.GetPropertyById(propertyId);
    if (property == null)
    {
        throw new Exception($"Invalid property ID: {propertyId}");
    }

    appRepository.AddPropertyToPaper(paper.Id, property.Id);
    paper.Properties.Add(property);
}


    
}