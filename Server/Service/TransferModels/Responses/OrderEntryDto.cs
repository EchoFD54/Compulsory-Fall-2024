using DataAccess.Models;

public class OrderEntryDto{
    public OrderEntryDto FromEntity(OrderEntry orderEntry){
        return new OrderEntryDto{
            Id = orderEntry.Id,
            Quantity = orderEntry.Quantity,
            ProductId = orderEntry.ProductId,
            OrderId = orderEntry.OrderId,
            ProductName = orderEntry.Product?.Name,
            ProductPrice = orderEntry.Product?.Price ?? 0
        };
        

    }

    public int Id { get; set; }
    public int Quantity { get; set; }
    public int? ProductId { get; set; }
    public string? ProductName {get; set;} = null!;
    public double ProductPrice{get;set;}
    public int? OrderId { get; set; }
}
