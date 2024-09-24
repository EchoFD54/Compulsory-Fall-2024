using DataAccess.Models;

public interface IAppRepository{
    //Orders
    public Order CreateOrder(Order order);
    public List<Order> GetAllOrders();
    public Order GetOrderById(int orderId);
    public void UpdateOrderStatus(int orderId, string status);

    //Papers
    public Paper Createpaper(Paper paper);
    public List<Paper> GetAllPapers();
    public void DiscontinuePaper(int paperId);
    public void RestockPaper(int paperId, int quantity);

    //Customers
    public Customer CreateCustomer(Customer customer);





    
}