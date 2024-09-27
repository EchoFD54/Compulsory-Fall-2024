using DataAccess.Models;

public class OrderDto{
    public OrderDto FromEntity(Order order){  
        return new OrderDto{
            Id = order.Id,
            OrderDate = order.OrderDate,
            DeliveryDate = order.DeliveryDate,
            Status = order.Status,
            TotalAmount = order.TotalAmount,
            CustomerId = order.CustomerId,
            Customer = order.Customer,
            OrderEntries = order.OrderEntries
        };
    }

    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public DateOnly? DeliveryDate { get; set; }
    public string Status { get; set; } = null!;
    public double TotalAmount { get; set; }
    public int? CustomerId { get; set; }
    public virtual Customer? Customer { get; set; }
    public virtual ICollection<OrderEntry> OrderEntries { get; set; } = new List<OrderEntry>();
}