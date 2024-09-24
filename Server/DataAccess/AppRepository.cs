using DataAccess.DataAccess;
using DataAccess.Models;

public class AppRepository(AppDbContext context) : IAppRepository{



    public Customer CreateCustomer(Customer customer)
    {
        context.Customers.Add(customer);
        context.SaveChanges();
        return customer;
    }

    public Order CreateOrder(Order order)
    {
        context.Orders.Add(order);
        context.SaveChanges();
        return order;
    }

    public Paper Createpaper(Paper paper)
    {
        context.Papers.Add(paper);
        context.SaveChanges();
        return paper;
    }

    public void DiscontinuePaper(int paperId)
    {
        throw new NotImplementedException();
    }

    public List<Order> GetAllOrders()
    {
        return [.. context.Orders];
    }

    public List<Paper> GetAllPapers()
    {
        return [.. context.Papers];
    }

    public Order GetOrderById(int orderId)
    {
        throw new NotImplementedException();
    }

    public void RestockPaper(int paperId, int quantity)
    {
        throw new NotImplementedException();
    }

    public void UpdateOrderStatus(int orderId, string status)
    {
        throw new NotImplementedException();
    }
}