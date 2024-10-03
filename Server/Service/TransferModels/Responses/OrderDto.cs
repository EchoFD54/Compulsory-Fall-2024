using DataAccess.Models;

public class OrderDto{
    public OrderDto FromEntity(Order order){  
        return new OrderDto{
            Id = order.Id,
            OrderDate = order.OrderDate,
            DeliveryDate = order.DeliveryDate,
            Status = order.Status,
            CustomerId = order.CustomerId,
            CustomerName = order.Customer?.Name,
            OrderEntries = order.OrderEntries.Select(oe => new OrderEntryDto().FromEntity(oe)).ToList(),
            TotalAmount = order.OrderEntries.Sum(oe => oe.Quantity *(oe.Product?.Price ?? 0))
        };
    }

    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public DateOnly? DeliveryDate { get; set; }
    public string Status { get; set; } = null!;
    public double TotalAmount { get; set; }
    public int? CustomerId { get; set; }
    public string? CustomerName {get;set; }
     public List<OrderEntryDto> OrderEntries { get; set; } = new List<OrderEntryDto>();
}