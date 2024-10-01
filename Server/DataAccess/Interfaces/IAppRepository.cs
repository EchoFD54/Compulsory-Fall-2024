using DataAccess.Models;

public interface IAppRepository{
    //Orders
    public Order CreateOrder(Order order);
    public List<Order> GetAllOrders();
    public Order GetOrderById(int orderId);
    public void UpdateOrderStatus(int orderId, string status);
    public List<Order> GetOrdersByCustomerId(int customerId);

    //Papers
    public Paper Createpaper(Paper paper);
    public List<Paper> GetAllPapers();
    public Paper? GetPaperById(int? paperId);
    public void Updatepaper(Paper paper);
    public void DiscontinuePaper(int paperId);
    public void RestockPaper(int paperId, int quantity);

    //Customers
    public Customer CreateCustomer(Customer customer);
    public List<Customer> GetAllCustomers();
    public Customer? GetCustomerById(int? customerId);
    public Customer? GetCustomerByEmail(string email);

    //Properties
    public Property CreateProperty(Property property);
    public List<Property> GetAllProperties();
    public Property? GetPropertyById(int? propertyId);
    public Property AddPropertyToPaper(int paperId, string propertyName, int propertyId);
    
    }