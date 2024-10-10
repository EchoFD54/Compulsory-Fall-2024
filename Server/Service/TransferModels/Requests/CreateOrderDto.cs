using System.ComponentModel.DataAnnotations;
using DataAccess.Models;

public class CreateOrderDto{
    public DateTime OrderDate { get; set; }

    public DateOnly? DeliveryDate { get; set; }

    public string Status { get; set; } = null!;

    
    public double TotalAmount { get; set; }

    public int? CustomerId { get; set; }

    public virtual Customer? Customer { get; set; }

   
    public virtual ICollection<OrderEntry> OrderEntries { get; set; } = new List<OrderEntry>();

    public Order ToOrder(){
        return new Order{
            OrderDate = OrderDate,
            DeliveryDate = DeliveryDate,
            Status = "Pending",
            TotalAmount = TotalAmount,
            CustomerId = CustomerId,
            Customer = Customer,
            OrderEntries = OrderEntries
        };
    }
}