using DataAccess.Models;

public class OrderEntryDto{
    public OrderEntryDto FromEntity(OrderEntry orderEntry){
        return new OrderEntryDto{
            Id = orderEntry.Id,
            Quantity = orderEntry.Quantity,
            ProductId = orderEntry.ProductId,
            OrderId = orderEntry.OrderId,
            Order = orderEntry.Order,
            Product = orderEntry.Product
        };
        

    }

     public int Id { get; set; }

    public int Quantity { get; set; }

    public int? ProductId { get; set; }

    public int? OrderId { get; set; }

    public virtual Order? Order { get; set; }

    public virtual Paper? Product { get; set; }
}
