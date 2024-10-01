using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

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

    public List<Customer> GetAllCustomers()
    {
        return[.. context.Customers];
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

    public Paper? GetPaperById(int? paperId)
    {
         return context.Papers.Include(p => p.Properties).FirstOrDefault(p => p.Id == paperId);
    }

    public void Updatepaper(Paper paper)
    {
       var existingPaper = context.Papers.Find(paper.Id);
       if(existingPaper == null){
        throw new Exception($"Paper with ID {paper.Id} not found.");
       }

       existingPaper.Name = paper.Name;
       existingPaper.Discontinued = paper.Discontinued;
       existingPaper.Stock = paper.Stock;
       existingPaper.Price = paper.Price;
       existingPaper.Properties = paper.Properties;

       context.Papers.Update(existingPaper);
       context.SaveChanges();
    }

    public Customer? GetCustomerById(int? customerId)
    {
       return context.Customers.Include(c => c.Orders).FirstOrDefault(c => c.Id == customerId);
    }

    public Property CreateProperty(Property property)
    {
       context.Properties.Add(property);
       context.SaveChanges();
       return property;
    }

    public List<Property> GetAllProperties()
    {
        return [.. context.Properties];
    }

    public Property? GetPropertyById(int? propertyId)
    {
        return context.Properties.Include(p => p.Papers).FirstOrDefault(p => p.Id == propertyId);
    }

    public Customer? GetCustomerByEmail(string email)
    {
        return context.Customers.SingleOrDefault(c => c.Email == email);
    }

    public List<Order> GetOrdersByCustomerId(int customerId)
    {
         return context.Orders.Include(o => o.OrderEntries).ThenInclude(oe => oe.Product).Where(o => o.CustomerId == customerId).ToList();
    }

    public Property AddPropertyToPaper(int paperId, string propertyName, int propertyId)
    {
        var paper = GetPaperById(paperId); // Ensure the paper exists
    if (paper == null) throw new Exception("Paper not found.");

    var newProperty = new Property
    {
        PropertyName = propertyName,
    };

    context.Properties.Add(newProperty);
    context.SaveChanges();
    return newProperty;
    }
}